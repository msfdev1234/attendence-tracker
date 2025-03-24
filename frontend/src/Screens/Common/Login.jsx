import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "services/user";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      // Call the login function with email and password
      const userData = await login(email, password);
      alert("Login successful!");
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
    } finally {
      setLoading(false);
    }
    // Navigate based on user's role
    // navigate(user.role === "admin" ? "/admindashboard" : "/userdashboard");
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
