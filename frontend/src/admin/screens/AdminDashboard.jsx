// src/Screens/Admin/AdminDashboard.jsx
import React from "react";

import Navbar from "../../Components/navbar";
import CoursesScreenAdmin from "./nav-screens/CourseScreenAdmin/CoursesScreenAdmin";
import UserScreenAdmin from "./nav-screens/UserScreenAdmin";
import { logout } from "../../services/user";

const navbarItems = [
	{
		name: "Home",
	},
	{
		name: "Users",
	},
	{
		name: "Logout",
	},
];

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = React.useState("Home");

	const onTabClickHandler = (tab) => {
		if (tab === "Logout") {
			logout();
			// Redirect to login screen
			window.location.href = "/login";
			return;
		}
		setActiveTab(tab);
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar
				navbarHeader="Admin Dashboard"
				tabs={navbarItems}
				activeTab={activeTab}
				onTabClickHandler={onTabClickHandler}
			/>
			<div className="container mx-auto mt-6">
				{activeTab === "Home" && <CoursesScreenAdmin />}
				{activeTab === "Users" && <UserScreenAdmin />}
				{/* Add other components for different tabs here */}
			</div>
		</div>
	);
};

export default AdminDashboard;
