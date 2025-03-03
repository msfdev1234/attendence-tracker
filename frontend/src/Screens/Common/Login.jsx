import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import authenticateUser from "../../services/userData.JS";
import { useState } from "react";
import dummyCourses from "../../services/data";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [currentUser, setCurrentUser] = useState("");

	const navigate = useNavigate();

	const handleLogin = (event) => {
		event.preventDefault();
		const user = authenticateUser(email, password);

		console.log(user);

		localStorage.setItem("user", JSON.stringify(user));

		setCurrentUser(user);
		console.log("Logged in user:", user);
		// Navigate based on user's role
		// navigate(user.role === "admin" ? "/admindashboard" : "/userdashboard");
		if (user.role === "professor") {
			navigate("/professordashboard");
		} else if (user.role === "student") {
			navigate("/userdashboard");
		} else if (user.role === "admin") {
			navigate("/admindashboard");
		}
	};

	return (
		<Container>
			<LoginForm onSubmit={handleLogin}>
				<Logo src="public\images\yu_katz_w_1.png" alt="Your Logo" />
				<Title>Sign In</Title>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Button type="submit">Log In</Button>
				<SignUpLink onClick={() => navigate("/signup")}>
					New user? Sign up now!
				</SignUpLink>
			</LoginForm>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: url("/path_to_background.jpg") no-repeat center center fixed;
	background-size: cover;
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	background: rgba(0, 0, 0, 0.8);
	border-radius: 8px;
`;

const Logo = styled.img`
	width: 160px;
	margin-bottom: 20px;
`;

const Title = styled.h2`
	color: #ffffff;
	margin-bottom: 20px;
`;

const Input = styled.input`
	width: 300px;
	height: 40px;
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 16px;
`;

const Button = styled.button`
	width: 300px;
	padding: 10px;
	color: white;
	background-color: #007bff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	margin-bottom: 10px;

	&:hover {
		background-color: #0056b3;
	}
`;

const SignUpLink = styled.div`
	color: #00bfff;
	cursor: pointer;
	text-decoration: underline;

	&:hover {
		text-decoration: none;
	}
`;

export default Login;
