import styled from "styled-components";
import welcomeImage from "../../../../public/images/welcome-screen-logo.jpg";
import { useState, useEffect } from "react";

const DashboardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;

const WelcomeBanner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	padding: 20px;
	max-width: 800px;
	height: auto;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-evenly;
	}
`;

const WelcomeText = styled.div`
	text-align: center;
	margin: 20px;

	h1 {
		font-size: 1.5rem;
		color: #333;
	}

	p {
		font-size: 1rem;
		color: #666;
	}

	@media (min-width: 768px) {
		text-align: left;
		margin-left: 20px;
	}
`;

const WelcomeImage = styled.img`
	width: 100%;
	max-width: 150px;
	height: auto;
	margin-bottom: 20px;

	@media (min-width: 768px) {
		max-width: 300px;
		margin-bottom: 0;
	}
`;

const getCurrentUser = () => {
	const storedUser = localStorage.getItem("user");
	console.log(storedUser); // Ensure this matches how you store it
	return storedUser ? JSON.parse(storedUser).name : "Guest"; // Adjusted to use name and fallback to "Guest"
};

const DashboardScreen = () => {
	const [userName, setUserName] = useState(getCurrentUser());

	useEffect(() => {
		// This effect will run once when the component mounts
		const handleStorageChange = () => {
			setUserName(getCurrentUser());
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return (
		<DashboardContainer>
			<WelcomeBanner>
				<WelcomeImage src={welcomeImage} alt="Welcome" />
				<WelcomeText>
					<h1>Welcome back, {userName}</h1>
					<p>
						You have successfully completed about 60% of your studies. Keep it
						up!
					</p>
				</WelcomeText>
			</WelcomeBanner>
			{/* Add other dashboard components here */}
		</DashboardContainer>
	);
};

export default DashboardScreen;
