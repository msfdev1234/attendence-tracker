import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { signup } from "services/user";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "student",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Call the signup function with email, password, and userType
      await signup(formData.email, formData.password, formData.userType);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit}>
        <Logo src="public/images/yu_katz_w_1.png" alt="Your Logo" />
        <Title>Sign Up</Title>

        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="professor">Professor</option>
          <option value="admin">Admin</option>
        </Select>

        <Button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <LoginLink onClick={() => navigate("/login")}>
          Already have an account? Log in
        </LoginLink>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SignupForm>
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

const SignupForm = styled.form`
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

const Select = styled.select`
  width: 320px;
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

const LoginLink = styled.div`
  color: #00bfff;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;

  &:hover {
    text-decoration: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default Signup;
