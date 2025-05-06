import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/user";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // Navigate based on user's role
      if (userData.userType === "professor") {
        navigate("/professor/dashboard");
      } else if (userData.userType === "student") {
        navigate("/user/dashboard");
      } else if (userData.userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        console.error("Unknown user type:", userData.userType);
      }
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    setLoading(true);
    setError("");
    event.preventDefault();
    try {
      // Call the login function with email and password
      const userData = await login(email, password);
      // Navigate based on user's role
      if (userData.userType === "professor") {
        navigate("/professor/dashboard");
      } else if (userData.userType === "student") {
        navigate("/user/dashboard");
      } else if (userData.userType === "admin") {
        navigate("/admin/dashboard");
      } else {
        console.error("Unknown user type:", userData.userType);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
			// Clear error message after 3 seconds
			setTimeout(() => {
				setError("");
			}, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <Logo src="public\images\yu_katz_w_1.png" alt="Your Logo" />
        <Title>Sign In</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
        <Button type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </Button>
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
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("/images/yu_zoom_1920x1080_background_2.jpg") no-repeat
			center center fixed;
		background-size: cover;
		filter: brightness(0.5) blur(0px);
		z-index: 0;
	}

	> * {
		position: relative;
		z-index: 1;
	}
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

const ErrorMessage = styled.div`
	color: #ff4444;
	margin-bottom: 10px;
	text-align: center;
	font-size: 14px;
	width: 300px;
`;

export default Login;
