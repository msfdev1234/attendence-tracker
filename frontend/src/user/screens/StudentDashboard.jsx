import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar";
import { logout } from "../../services/user";
import React from "react";

const navbarItems = [
	{
		name: "Home",
		value: "/user/dashboard",
	},
	{
		name: "My Courses",
		value: "/user/dashboard/my-courses",
	},
	{
		name: "Analytics",
		value: "/user/dashboard/analytics",
	},
	{
		name: "Settings",
		value: "/user/dashboard/settings",
	},
	{
		name: "Logout",
		value: "logout",
	},
];

const StudentDashboard = () => {
	const [activeTab, setActiveTab] = React.useState("Home");
	const navigate = useNavigate();

	const onTabClickHandler = (tab) => {
		if (tab === "Logout") {
			logout();
			window.location.href = "/login";
			return;
		}

		setActiveTab(tab);
		const selectedItem = navbarItems.find((item) => item.name === tab);
		if (selectedItem) {
			navigate(selectedItem.value);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar
				navbarHeader="Student Dashboard"
				tabs={navbarItems}
				activeTab={activeTab}
				onTabClickHandler={onTabClickHandler}
			/>
			<div className="container mx-auto mt-6">
				<Outlet />
			</div>
		</div>
	);
};

export default StudentDashboard;
