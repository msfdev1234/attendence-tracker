import React from "react";

import Navbar from "../Components/navbar";
import { logout } from "../services/user";
import ProfessorCourses from "./ProfessorCourses";
import StudentsTab from "./StudentsTab"; // ← import

const navbarItems = [
  {
    name: "Home",
  },
  {
    name: "Students",
  },
  {
    name: "Logout",
  },
];

const ProfessorDashboard = () => {
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
        navbarHeader="Professor Dashboard"
        tabs={navbarItems}
        activeTab={activeTab}
        onTabClickHandler={onTabClickHandler}
      />

			<div className="container mx-auto mt-6">
				{activeTab === "Home" && <ProfessorCourses />}
				{activeTab === "Students" && <StudentsTab />} {/* ← add this */}
				{/* Add other components for different tabs here */}
			</div>
		</div>
	);
};

export default ProfessorDashboard;
