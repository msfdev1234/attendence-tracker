// src/Screens/User/StudentDashboard.jsx or a similar file
import styled from "styled-components";

import { Outlet } from "react-router-dom"; // Assuming React Router v6
import Sidebar from "../components/Sidebar-user";

const LayoutContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const Content = styled.div`
	flex-grow: 1; // Ensures it takes up the remaining space
	display: flex;
	flex-direction: column;
	padding: 20px;
	background-color: aliceblue;
`;

const StudentDashboard = () => {
	return (
		<LayoutContainer>
			<Sidebar />
			<Content>
				<Outlet /> {/* This will render the matched child route components */}
			</Content>
		</LayoutContainer>
	);
};

export default StudentDashboard;
