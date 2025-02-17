// src/Screens/Admin/AdminDashboard.jsx
import React, { useState } from "react";
import styled from "styled-components";

import "./AdminDashboard.css";
import { act } from "react";
import ListItem from "../components/ListItem";
import CoursesScreenAdmin from "./nav-screens/CourseScreenAdmin/CoursesScreenAdmin";

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState("Home");

	const onHomeButtonClickHandler = () => {
		setActiveTab("Home");
	};

	const onManageCoursesButtonClickHandler = () => {
		setActiveTab("ManageCourses");
	};

	const onStudentsButtonClickHandler = () => {
		setActiveTab("Students");
	};

	const onSettingsButtonClickHandler = () => {
		setActiveTab("Settings");
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 admin-nav-bar">
					<ListItem
						onClick={onHomeButtonClickHandler}
						isActiveTab={activeTab === "Home" ? true : false}
					>
						Home
					</ListItem>

					<ListItem
						onClick={onManageCoursesButtonClickHandler}
						isActiveTab={activeTab === "ManageCourses" ? true : false}
					>
						Manage Courses
					</ListItem>
					<ListItem
						onClick={onStudentsButtonClickHandler}
						isActiveTab={activeTab === "Students" ? true : false}
					>
						Students
					</ListItem>
					<ListItem
						onClick={onSettingsButtonClickHandler}
						isActiveTab={activeTab === "Settings" ? true : false}
					>
						Settings
					</ListItem>
				</div>
			</div>
			<div className="content-admin-dashboard">
				<CoursesScreenAdmin />
			</div>

			<div></div>
		</div>
	);
};

export default AdminDashboard;
