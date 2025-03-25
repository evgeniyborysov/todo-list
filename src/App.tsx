import { useMemo, useState } from "react";
import { v1 } from "uuid";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { addTodo, useAppDispatch } from "./store/store";
import { Todolist } from "./Todolist";
import { darkTheme, lightTheme } from "./Theme";
import { Header } from "./Header";

export type TodoType = {
	id: string;
	title: string;
	completed: boolean;
};

type ThemeType = "light" | "dark";

export type TodoListProps = {
	clearCompletedTodo: () => void;
};

const StyledApp = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	min-height: 100vh;
	background-image: linear-gradient(to right, #cfdef3, #e0eafc);
	z-index: 1;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: linear-gradient(to right, #2c5364, #203a43, #0f2027);
		z-index: -1;
		opacity: ${(props) => props.theme.opacity};
		transition: opacity 0.3s ease;
	}
`;

function App() {
	const [theme, setTheme] = useState<ThemeType>("light");

	const toggleTheme = () => {
		// setTheme(theme === "light" ? "dark" : "light");
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	const dispatch = useAppDispatch();

	const addTodoHandler = (title: string) => {
		const newTodo = {
			id: v1(),
			title,
			completed: false,
		};
		dispatch(addTodo(newTodo));
	};

	// const clearCompletedHandler = () => {
	// 	dispatch(clearCompletedTodo());
	// };

	const currentTheme = useMemo(
		() => (theme === "light" ? lightTheme : darkTheme),
		[theme]
	);

	return (
		<ThemeProvider theme={currentTheme}>
			<StyledApp>
				<Header
					theme={theme}
					toggleTheme={toggleTheme}
					addTodoHandler={addTodoHandler}
				/>
				<Todolist />
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;
