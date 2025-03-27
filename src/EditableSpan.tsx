import { useState } from "react";
import styled from "styled-components";
import { editTodo, useAppDispatch } from "./store/store";
import { TodoType } from "./App";

interface TitleProps {
	readonly $isChecked?: boolean;
}

const TodoTitle = styled.span<TitleProps>`
	text-align: left;
	font-size: 16px;
	text-decoration: ${(props) => (props.$isChecked ? "line-through" : "none")};
	color: ${(props) => (props.$isChecked ? "#a1a1a1" : "#0f0f0f")};
	transition: color 0.3s ease, text-decoration 0.3s ease;
	cursor: pointer;
	&:hover {
		opacity: 0.8;
	}

	@media (max-width: 600px) {
		font-size: 14px;
	}
`;

const EditInput = styled.input`
	width: 100%;
	padding: 8px;
	font-size: 16px;
	border: 2px solid #646cff;
	border-radius: 5px;
	outline: none;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: #5c5cff;
		box-shadow: 0 0 5px rgba(92, 92, 255, 0.5);
	}
`;

type EditableSpanPropsType = {
	todo: TodoType;
	editMode: boolean;
	setEditMode: () => void;
};

export const EditableSpan = ({
	todo,
	editMode,
	setEditMode,
}: EditableSpanPropsType) => {
	const [title, setTitle] = useState(todo.title);
	const dispatch = useAppDispatch();

	const turnOffEditModeHandler = () => {
		if (setEditMode) {
			setEditMode();
		}

		dispatch(editTodo({ id: todo.id, title: title }));
	};
	const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	return (
		<>
			{editMode === false ? (
				<>
					<TodoTitle $isChecked={todo.completed}>
						{todo.title}
					</TodoTitle>
				</>
			) : (
				<EditInput
					autoFocus
					name="edit-input"
					type="text"
					value={title}
					onBlur={turnOffEditModeHandler}
					onChange={onChangeTitleHandler}
				/>
			)}
		</>
	);
};
