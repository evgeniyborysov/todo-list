import { useMemo, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import {
	fetchTodos,
	addTodoAsync,
	useAppDispatch,
	useAppSelector,
} from "./store/store";
import { Todolist } from "./Todolist";
import { darkTheme, lightTheme } from "./Theme";
import { Header } from "./Header";
import { toggleTheme } from "./store/themeSlice";

export type TodoType = {
	id: string;
	title: string;
	completed: boolean;
};

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
	const theme = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	const currentTheme = useMemo(
		() => (theme === "light" ? lightTheme : darkTheme),
		[theme]
	);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const addTodoHandler = (title: string) => {
		const newTodo = {
			title,
			completed: false,
		};
		dispatch(addTodoAsync(newTodo));
	};

	const toggleThemeHandler = () => {
		dispatch(toggleTheme());
	};

	return (
		<ThemeProvider theme={currentTheme}>
			<StyledApp>
				<Header
					theme={theme}
					toggleTheme={toggleThemeHandler}
					addTodoHandler={addTodoHandler}
				/>
				<Todolist />
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;
