import { Timestamp } from "firebase/firestore";

export interface TodoFirebase {
	id: string;
	title: string;
	completed: boolean;
	createdAt: Timestamp;
	userId: string;
}

export interface UserData {
	id: string;
	email: string;
	createdAt: Timestamp;
}
