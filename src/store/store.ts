import {
	combineReducers,
	configureStore,
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TodoType } from "../App";

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { themeReducer } from "./themeSlice";

type ActionTodoEditType = {
	id: string;
	title: string;
};

const initialState: TodoType[] = [];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		setTodos: (state, action: PayloadAction<TodoType[]>) => {
			return action.payload;
		},
		addTodo: (state, action: PayloadAction<TodoType>) => {
			state.push(action.payload);
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			return state.filter((todo) => todo.id !== action.payload);
		},
		toggleTodo: (state, action: PayloadAction<string>) => {
			return state.map((todo) =>
				todo.id === action.payload
					? { ...todo, completed: !todo.completed }
					: todo
			);
		},
		editTodo: (state, action: PayloadAction<ActionTodoEditType>) => {
			return state.map((todo) =>
				todo.id === action.payload.id
					? { ...todo, title: action.payload.title }
					: todo
			);
		},
		clearCompletedTodo: (state) => {
			return state.filter((todo) => !todo.completed);
		},
	},
});

const todosReducer = todoSlice.reducer;

export const {
	setTodos,
	addTodo,
	deleteTodo,
	toggleTodo,
	editTodo,
	clearCompletedTodo,
} = todoSlice.actions;

// Thunks для работы с Firebase
export const fetchTodos = () => async (dispatch: AppDispatch) => {
	const querySnapshot = await getDocs(collection(db, "todos"));
	const todos = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as TodoType[];
	dispatch(setTodos(todos));
};

export const addTodoAsync =
	(todo: Omit<TodoType, "id">) => async (dispatch: AppDispatch) => {
		const docRef = await addDoc(collection(db, "todos"), todo);
		dispatch(addTodo({ ...todo, id: docRef.id }));
	};

export const deleteTodoAsync =
	(id: string) => async (dispatch: AppDispatch) => {
		await deleteDoc(doc(db, "todos", id));
		dispatch(deleteTodo(id));
	};

export const toggleTodoAsync =
	(id: string, completed: boolean) => async (dispatch: AppDispatch) => {
		await updateDoc(doc(db, "todos", id), { completed: !completed });
		dispatch(toggleTodo(id));
	};

const rootReducer = combineReducers({
	todos: todosReducer,
	theme: themeReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["theme"],
};

const persistedReducer = persistReducer<RootReducer>(
	persistConfig,
	rootReducer
);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export const persistor = persistStore(store);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootReducer = ReturnType<typeof rootReducer>;
