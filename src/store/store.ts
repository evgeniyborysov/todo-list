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

type ActionTodoEditType = {
	id: string;
	title: string;
};

const initialState: TodoType[] = [];

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
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

export const { addTodo, deleteTodo, toggleTodo, editTodo, clearCompletedTodo } =
	todoSlice.actions;

const rootReducer = combineReducers({
	todos: todosReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["todos"],
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
