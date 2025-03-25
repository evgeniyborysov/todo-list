import styled from "styled-components";
import {
	clearCompletedTodo,
	useAppDispatch,
	useAppSelector,
} from "./store/store";
import { FilterType } from "./Todolist";

interface ButtonTitleProps {
	readonly $isActive?: boolean;
}

type FooterProps = {
	filter: string;
	changeFilter: (filter: FilterType) => void;
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-top: 20px;
	padding: 10px 20px;
	background-color: ${(props) => props.theme.bgColor};
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button<ButtonTitleProps>`
	font-family: inherit;
	background-color: transparent;
	font-size: 14px;
	color: ${(props) => (props.$isActive ? "#646cff" : "#000000")};
	border: none;
	border-radius: 5px;
	padding: 5px 10px;
	cursor: pointer;
	transition: background-color 0.3s ease, color 0.3s ease;

	&:hover {
		color: #5c5cff;
	}
`;

const FilterButton = styled(Button)`
	margin-left: 0;
`;

const ClearButton = styled(Button)`
	&:hover {
		color: #ff0000;
	}
`;

const Itemsleft = styled.p`
	font-size: 14px;
	color: #000000;
	transition: color 0.3s ease;
`;

const FilterButtonGroup = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
`;

export const Footer = ({ filter, changeFilter }: FooterProps) => {
	const todos = useAppSelector((state) => state.todos);
	const dispatch = useAppDispatch();

	const activeTodosCount = todos.filter((todo) => !todo.completed).length;
	console.log(activeTodosCount);

	const handleClearCompleted = () => {
		dispatch(clearCompletedTodo());
	};

	return (
		<Wrapper>
			{activeTodosCount > 0 && (
				<Itemsleft>
					{activeTodosCount}
					{activeTodosCount === 1 ? " item" : " items"} left
				</Itemsleft>
			)}

			<FilterButtonGroup>
				<FilterButton
					onClick={() => changeFilter("All")}
					$isActive={filter === "All"}
				>
					All
				</FilterButton>
				<FilterButton
					onClick={() => changeFilter("Active")}
					$isActive={filter === "Active"}
				>
					Active
				</FilterButton>
				<FilterButton
					onClick={() => changeFilter("Completed")}
					$isActive={filter === "Completed"}
				>
					Completed
				</FilterButton>
			</FilterButtonGroup>

			<ClearButton onClick={handleClearCompleted}>
				Clear completed
			</ClearButton>
		</Wrapper>
	);
};
