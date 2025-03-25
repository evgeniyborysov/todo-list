import { useCallback, useState } from "react";
import styled from "styled-components";

type InputFormProps = {
	getTitle: (title: string) => void;
};

interface StyledButtonProps {
	theme: {
		color: string;
	};
	disabled?: boolean;
}

const Form = styled.form`
	max-width: 500px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	padding: 30px 20px;
	background-color: ${(props) => props.theme.bgColor};
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input.attrs({ type: "text" })`
	width: 100%;
	font-family: inherit;
	padding: 10px 15px;
	border: 2px solid #646cff;
	border-radius: 5px;
	font-size: 16px;
	outline: none;
	transition: border-color 0.3s ease;

	&:focus {
		border-color: #5c5cff;
		box-shadow: 0 0 5px rgba(92, 92, 255, 0.5);
	}
`;

const Button = styled.button<StyledButtonProps>`
	font-family: inherit;
	background-color: ${(props) => (props.disabled ? "#b0b0b0" : "#747af5")};
	color: ${(props) => props.theme.color};
	border: none;
	border-radius: 5px;
	padding: 10px 15px;
	font-size: 16px;
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	transition: all 0.3s ease;
	min-width: 80px;

	&:hover:not(:disabled) {
		background-color: #5c5cff;
		transform: translateY(-2px);
	}

	&:active:not(:disabled) {
		background-color: #4b4bff;
		transform: translateY(0);
	}

	&:focus-visible {
		outline: 2px solid #4b4bff;
		outline-offset: 2px;
	}
`;

export const InputForm = ({ getTitle }: InputFormProps) => {
	const [input, setInput] = useState("");
	const isInputEmpty = input.trim() === "";

	const handleInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInput(e.target.value);
		},
		[]
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const trimmedInput = input.trim();
			if (trimmedInput) {
				getTitle(trimmedInput);
				setInput("");
			}
		},
		[input, getTitle]
	);

	return (
		<Form
			name="todo-form"
			onSubmit={handleSubmit}
			aria-label="Add new todo form"
		>
			<Input
				placeholder="Enter a new todo"
				name="todo-input"
				type="text"
				value={input}
				onChange={handleInput}
				aria-label="Todo title"
				autoComplete="off"
			/>
			<Button type="submit" disabled={isInputEmpty} aria-label="Add todo">
				Add
			</Button>
		</Form>
	);
};

InputForm.displayName = "InputForm";
