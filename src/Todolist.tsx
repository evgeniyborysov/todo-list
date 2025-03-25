import { TodoType } from "./App";
import styled from "styled-components";
import { useAppSelector } from "./store/store";
import { TodoItem } from "./TodoItem";
import { Footer } from "./Footer";
import { useCallback, useMemo, useState } from "react";

const ListContainer = styled.div`
	max-width: 500px;
	width: 100%;
	margin-top: 10px;
`;

const EmptyState = styled.div`
	text-align: center;
	color: #888;
`;

const List = styled.ul`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
	list-style: none;
	padding: 20px;
	margin: 0;
	background-color: ${(props) => props.theme.bgColor};
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export type FilterType = "All" | "Active" | "Completed";

export const Todolist = () => {
	const [filter, setFilter] = useState<FilterType>("All");
	const todos = useAppSelector((state) => state.todos);

	const filteredTodos = useMemo(() => {
		switch (filter) {
			case "Active":
				return todos.filter((todo) => !todo.completed);
			case "Completed":
				return todos.filter((todo) => todo.completed);
			default:
				return todos;
		}
	}, [todos, filter]);

	const handleFilterChange = useCallback((newFilter: FilterType) => {
		setFilter(newFilter);
	}, []);

	const hasTodos = todos.length > 0;

	return (
		<ListContainer>
			{hasTodos ? (
				<>
					<List role="list" aria-label={`${filter} todos`}>
						{filteredTodos.length > 0 ? (
							filteredTodos.map((todo: TodoType) => (
								<TodoItem key={todo.id} todo={todo} />
							))
						) : (
							<EmptyState>
								No {filter.toLowerCase()} todos found.
							</EmptyState>
						)}
					</List>

					<Footer filter={filter} changeFilter={handleFilterChange} />
				</>
			) : null}
		</ListContainer>
	);
};
