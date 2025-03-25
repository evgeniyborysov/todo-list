import styled from "styled-components";
import { LuMoon, LuSun } from "react-icons/lu";
import { InputForm } from "./InputForm";

interface ThemeProps {
	theme: {
		color: string;
	};
}

const StyledHeader = styled.header`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	color: ${(props) => props.theme.color};
	margin: 0 0 15px 0;
	transition: color 0.3s ease;
	text-align: center;
`;

const ThemeButton = styled.button`
	width: 40px;
	height: 40px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	align-self: end;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: background-color 0.2s ease;

	&:focus-visible {
		outline: 2px solid #4b4bff;
		outline-offset: 2px;
	}
`;

const ThemeIcon = styled.div<ThemeProps>`
	color: ${(props) => props.theme.color};
	transition: color 0.3s ease;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		color: #4b4bff;
	}
`;

type HeaderProps = {
	theme: string;
	toggleTheme: () => void;
	addTodoHandler: (title: string) => void;
};

export const Header = ({ theme, toggleTheme, addTodoHandler }: HeaderProps) => {
	const isLightTheme = theme === "light";
	const themeButtonLabel =
		theme === "light" ? "Switch to light theme" : "Switch to dark theme";

	return (
		<StyledHeader>
			<ThemeButton
				onClick={toggleTheme}
				title={themeButtonLabel}
				aria-label={themeButtonLabel}
			>
				<ThemeIcon>
					{isLightTheme ? (
						<LuMoon size={24} aria-hidden="true" />
					) : (
						<LuSun size={24} aria-hidden="true" />
					)}
				</ThemeIcon>
			</ThemeButton>
			<Title>TODO LIST</Title>
			<InputForm getTitle={addTodoHandler} />
		</StyledHeader>
	);
};

Header.displayName = "Header";
