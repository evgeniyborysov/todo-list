import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { auth } from "./config";

// Регистрация пользователя
export const registerUser = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
};

// Вход пользователя
export const loginUser = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
};

// Выход пользователя
export const logoutUser = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		throw error;
	}
};

// Слушатель состояния аутентификации
export const onAuthStateChange = (callback: (user: User | null) => void) => {
	return onAuthStateChanged(auth, callback);
};
