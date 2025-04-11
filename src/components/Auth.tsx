// import { useState } from "react";
// import styled from "styled-components";
// // import { loginUser, registerUser } from "../firebase/auth";

// const AuthContainer = styled.div`
// 	width: 100%;
// 	max-width: 400px;
// 	padding: 20px;
// 	background-color: ${(props) => props.theme.cardBgColor};
// 	border-radius: 10px;
// 	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

// const Form = styled.form`
// 	display: flex;
// 	flex-direction: column;
// 	gap: 15px;
// `;

// const Input = styled.input`
// 	padding: 10px;
// 	border: 1px solid ${(props) => props.theme.borderColor};
// 	border-radius: 5px;
// 	font-size: 16px;
// 	background-color: ${(props) => props.theme.inputBgColor};
// 	color: ${(props) => props.theme.textColor};

// 	&:focus {
// 		outline: none;
// 		border-color: ${(props) => props.theme.primaryColor};
// 		box-shadow: 0 0 0 2px ${(props) => props.theme.primaryColor}33;
// 	}
// `;

// const Button = styled.button`
// 	padding: 10px;
// 	border: none;
// 	border-radius: 5px;
// 	background-color: ${(props) => props.theme.primaryColor};
// 	color: white;
// 	font-size: 16px;
// 	cursor: pointer;
// 	transition: background-color 0.3s;

// 	&:hover {
// 		background-color: ${(props) => props.theme.primaryHoverColor};
// 	}
// `;

// const ToggleButton = styled.button`
// 	background: none;
// 	border: none;
// 	color: ${(props) => props.theme.primaryColor};
// 	cursor: pointer;
// 	text-decoration: underline;
// 	margin-top: 10px;

// 	&:hover {
// 		color: ${(props) => props.theme.primaryHoverColor};
// 	}
// `;

// const ErrorMessage = styled.p`
// 	color: ${(props) => props.theme.errorColor};
// 	margin: 5px 0;
// `;

// export const Auth = () => {
// 	const [isLogin, setIsLogin] = useState(true);
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [error, setError] = useState<string | null>(null);

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setError(null);

// 		try {
// 			if (isLogin) {
// 				await loginUser(email, password);
// 			} else {
// 				await registerUser(email, password);
// 			}
// 		} catch (err) {
// 			setError(err instanceof Error ? err.message : "Произошла ошибка");
// 		}
// 	};

// 	return (
// 		<AuthContainer>
// 			<h2>{isLogin ? "Вход" : "Регистрация"}</h2>
// 			<Form onSubmit={handleSubmit}>
// 				<Input
// 					type="email"
// 					placeholder="Email"
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 					required
// 				/>
// 				<Input
// 					type="password"
// 					placeholder="Пароль"
// 					value={password}
// 					onChange={(e) => setPassword(e.target.value)}
// 					required
// 				/>
// 				{error && <ErrorMessage>{error}</ErrorMessage>}
// 				<Button type="submit">
// 					{isLogin ? "Войти" : "Зарегистрироваться"}
// 				</Button>
// 			</Form>
// 			<ToggleButton onClick={() => setIsLogin(!isLogin)}>
// 				{isLogin
// 					? "Нет аккаунта? Зарегистрируйтесь"
// 					: "Уже есть аккаунт? Войдите"}
// 			</ToggleButton>
// 		</AuthContainer>
// 	);
// };
