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
	margin-top: 10px;
	padding: 10px 20px;
	background-color: ${(props) => props.theme.bgColor};
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	@media (max-width: 600px) {
		padding: 10px 12px;
		gap: 5px;
	}

	@media (max-width: 375px) {
		flex-direction: column;
	}
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
		transform: scale(1.05);
	}

	&:active {
		transform: scale(0.98);
	}

	@media (max-width: 600px) {
		padding: 5px 10px;
	}

	@media (max-width: 480px) {
		padding: 8px;
	}
`;

const FilterButton = styled(Button)`
	margin-left: 0;
`;

const ClearButton = styled(Button)`
	&:hover {
		color: #ff0000;
	}

	@media (max-width: 480px) {
		order: 2;
	}
`;

const Itemsleft = styled.p`
	font-size: 14px;
	color: #000000;
	transition: color 0.3s ease;

	@media (max-width: 480px) {
		text-align: center;
		width: 100%;
	}
`;

const FilterButtonGroup = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
	gap: 10px;

	@media (max-width: 768px) {
		gap: 6px;
	}

	@media (max-width: 600px) {
		gap: 4px;
	}
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
				{(["All", "Active", "Completed"] as FilterType[]).map(
					(filterType) => (
						<FilterButton
							key={filterType}
							onClick={() => changeFilter(filterType)}
							$isActive={filter === filterType}
						>
							{filterType}
						</FilterButton>
					)
				)}
			</FilterButtonGroup>

			<ClearButton onClick={handleClearCompleted}>
				Clear completed
			</ClearButton>
		</Wrapper>
	);
};
