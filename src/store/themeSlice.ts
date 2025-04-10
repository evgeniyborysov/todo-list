import { createSlice } from "@reduxjs/toolkit";

// type ThemeType = "light" | "dark";
const initialState = "light";

const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		toggleTheme: (state) => {
			return state === "light" ? "dark" : "light";
		},
	},
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
