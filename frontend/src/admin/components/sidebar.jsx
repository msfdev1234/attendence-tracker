// src/Components/Sidebar.jsx
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.div`
	width: 200px;
	height: 100vh;
	background-color: #2c3e50;

	color: white;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: start;
`;

const StyledLink = styled(NavLink)`
	color: white;
	text-decoration: none;
	display: block;
	padding: 10px;
	margin: 5px 0;

	&:hover {
		background-color: #34495e;
		cursor: pointer;
	}

	&.active {
		background-color: #16a085;
		font-weight: bold;
	}
`;

const Sidebar = () => {
	return (
		<SidebarContainer>
			<StyledLink to="/admindashboard/admin-welcome">Welcome</StyledLink>
			<StyledLink to="/admindashboard/admin-courses">Manage Courses</StyledLink>
			<StyledLink to="/admindashboard/admin-settings">Settings</StyledLink>
		</SidebarContainer>
	);
};

export default Sidebar;
