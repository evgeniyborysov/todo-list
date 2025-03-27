import styled from "styled-components";
import { LuTrash2, LuPen, LuPenOff } from "react-icons/lu";
import { EditableSpan } from "./EditableSpan";
import { TodoType } from "./App";
import { useAppDispatch, deleteTodo, toggleTodo } from "./store/store";
import { useState, memo } from "react";

const ListItem = styled.li`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 10px;
	background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s ease;

	&:hover {
		background-color: rgb(194, 194, 238);
	}
`;

const Label = styled.label`
	display: grid;
	grid-template-columns: 25px 1fr;
	flex-grow: 1;
	align-items: center;
	gap: 10px;
	cursor: pointer;
`;

const Input = styled.input`
	margin: 0;
	appearance: none;
	width: 25px;
	height: 25px;
	border: 2px solid #646cff;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease, border-color 0.3s ease;

	&:checked {
		background-color: #646cff;
		border-color: #646cff;

		&::before {
			content: "✔";
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 16px;
		}
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

const ButtonControl = styled.button<{ variant?: "delete" }>`
	background-color: transparent;
	border: none;
	cursor: pointer;
	margin-left: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	size: 30px;
	transition: color 0.3s ease;

	&:hover svg {
		stroke: ${(props) =>
			props.variant === "delete" ? "#ff0000" : "#4b50c9"};
	}
`;

type TodoItemsProps = {
	todo: TodoType;
};

export const TodoItem = memo(({ todo }: TodoItemsProps) => {
	const [editMode, setEditMode] = useState(false);
	const dispatch = useAppDispatch();

	const handleDeleteTodo = () => {
		dispatch(deleteTodo(todo.id));
	};

	const handleToggleTodo = () => {
		dispatch(toggleTodo(todo.id));
	};

	const handleToggleEditMode = () => {
		setEditMode((prevMode) => !prevMode);
	};

	return (
		<ListItem>
			<Label>
				<Input
					name="todo-checkbox"
					type="checkbox"
					checked={todo.completed}
					onChange={handleToggleTodo}
					aria-label={`Mark "${todo.title}" as ${
						todo.completed ? "incomplete" : "complete"
					}`}
				/>
				<EditableSpan
					todo={todo}
					editMode={editMode}
					setEditMode={handleToggleEditMode}
				/>
			</Label>
			<Wrapper>
				<ButtonControl
					onClick={handleToggleEditMode}
					aria-label={editMode ? "Cancel editing" : "Edit todo"}
					title={editMode ? "Cancel editing" : "Edit todo"}
				>
					{editMode ? (
						<LuPenOff color="#646cff" size={21} />
					) : (
						<LuPen color="#646cff" size={21} />
					)}
				</ButtonControl>

				<ButtonControl
					onClick={handleDeleteTodo}
					variant="delete"
					aria-label="Delete todo"
					title="Delete todo"
				>
					<LuTrash2 color="#646cff" size={21} />
				</ButtonControl>
			</Wrapper>
		</ListItem>
	);
});

TodoItem.displayName = "TodoItem";
