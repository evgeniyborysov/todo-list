export type Theme = {
	color: string;
	bgColor: string;
	opacity: number;
};

export const lightTheme: Theme = {
	color: "#ffffff",
	bgColor: "#f9f9f9",
	opacity: 1,
};

export const darkTheme: Theme = {
	color: "#000000",
	bgColor: "#ebf0f7",
	opacity: 0,
};
