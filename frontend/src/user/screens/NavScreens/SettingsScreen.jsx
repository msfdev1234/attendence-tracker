import React from "react";

// Basic boilerplate for Settings screen with standard sections
const SettingsScreen = () => {
	return (
		<div className="p-6 bg-gray-50 min-h-screen space-y-8">
			{/* Page Title */}
			<header>
				<h1 className="text-2xl font-semibold">Settings</h1>
			</header>

			{/* Profile Section */}
			<section id="profile" className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-medium mb-2">Profile</h2>
				{/* TODO: Add profile form fields (name, email, password) */}
			</section>

			{/* Notifications Section */}
			<section id="notifications" className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-medium mb-2">Notifications</h2>
				{/* TODO: Add toggle switches for email/SMS notifications */}
			</section>

			{/* Reminders Section */}
			<section id="reminders" className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-medium mb-2">Reminders</h2>
				{/* TODO: Add settings for attendance reminder times */}
			</section>

			{/* Appearance Section */}
			<section id="appearance" className="bg-white p-6 rounded-lg shadow">
				<h2 className="text-xl font-medium mb-2">Appearance</h2>
				{/* TODO: Add theme switch (light/dark) */}
			</section>
		</div>
	);
};

export default SettingsScreen;
