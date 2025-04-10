import {
	collection,
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	getDocs,
	query,
	where,
	Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { TodoFirebase } from "../types/firebase";

// Получение todos пользователя
export const getUserTodos = async (userId: string) => {
	const todosRef = collection(db, "todos");
	const q = query(todosRef, where("userId", "==", userId));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	})) as TodoFirebase[];
};

// Добавление todo
export const addTodo = async (userId: string, title: string) => {
	const todosRef = collection(db, "todos");
	const newTodo = {
		title,
		completed: false,
		createdAt: Timestamp.now(),
		userId,
	};

	const docRef = await addDoc(todosRef, newTodo);
	return {
		...newTodo,
		id: docRef.id, // Firestore автоматически генерирует уникальный ID
	} as TodoFirebase;
};

// Удаление todo
export const deleteTodo = async (todoId: string) => {
	const todoRef = doc(db, "todos", todoId);
	await deleteDoc(todoRef);
};

// Обновление статуса todo
export const toggleTodoStatus = async (todoId: string, completed: boolean) => {
	const todoRef = doc(db, "todos", todoId);
	await updateDoc(todoRef, { completed });
};

// Изменение заголовка todo
export const updateTodoTitle = async (todoId: string, title: string) => {
	const todoRef = doc(db, "todos", todoId);
	await updateDoc(todoRef, { title });
};
