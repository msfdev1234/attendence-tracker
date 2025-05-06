import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { signup } from "../../services/user";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "student",
    status: "pending",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate email domain
		if (!formData.email.endsWith("@mail.yu.edu")) {
			setError("Email must be a valid YU email address (@mail.yu.edu)");
			setLoading(false);
			return;
		}

		try {
			await signup(
				formData.email,
				formData.password,
				formData.userType,
				formData.firstName,
				formData.lastName,
				formData.status
			);
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
      <Logo src="/images/yu_katz_w_1.png" alt="Your Logo" />
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
					placeholder="Email (@mail.yu.edu)"
					value={formData.email}
					onChange={handleChange}
					pattern=".+@mail\.yu\.edu$"
					title="Please enter a valid YU email address (@mail.yu.edu)"
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
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: url("/images/yu_zoom_1920x1080_background_2.jpg") no-repeat center
		center fixed;
	background-size: cover;
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* dark overlay */
		z-index: 1;
	}

	> * {
		position: relative;
		z-index: 2;
	}
`;

const SignupForm = styled.form`
	display: flex;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	border-radius: 10px;

	flex-direction: column;
	align-items: center;
	padding: 20px;
	background: rgba(0, 0, 0, 0.8);
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
