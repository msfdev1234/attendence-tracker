import React, { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";

// Dummy course data
const courses = [
	{
		title: "Theology in English",
		crn: 3093,
		professor: "Harris",
		totalClasses: 30,
		present: 25,
		absent: 5,
		late: 0,
	},
	{
		title: "Calculus I",
		crn: 4123,
		professor: "Dr. Smith",
		totalClasses: 28,
		present: 22,
		absent: 6,
		late: 1,
	},
	{
		title: "Modern History",
		crn: 5872,
		professor: "Johnson",
		totalClasses: 32,
		present: 30,
		absent: 2,
		late: 0,
	},
];

// Dummy trend data
const trendData = [
	{ session: "S1", attendance: 22 },
	{ session: "S2", attendance: 25 },
	{ session: "S3", attendance: 20 },
	{ session: "S4", attendance: 28 },
	{ session: "S5", attendance: 24 },
];

const AnalyticsScreen = () => {
	const [selectedCrn, setSelectedCrn] = useState(courses[0].crn);
	const course = courses.find((c) => c.crn === selectedCrn) || courses[0];

	const pieData = [
		{ name: "Late Days", value: course.late, color: "#f59e0b" },
		{ name: "Absent Days", value: course.absent, color: "#ef4444" },
		{ name: "Present Days", value: course.present, color: "#22c55e" },
	];

	const handleClear = () => setSelectedCrn(courses[0].crn);
	const handleApply = () => console.log("Filtering for CRN:", selectedCrn);

	return (
		<div className="p-6 bg-gray-50 min-h-screen space-y-6">
			{/* Top Bar */}
			<div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
					<h2 className="text-xl font-semibold">Roll Call Attendance</h2>
				</div>
				<div className="flex space-x-4">
					<div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white rounded-lg shadow p-4 text-center min-w-[100px]">
						<p className="text-sm">Total</p>
						<p className="text-2xl font-bold">{course.totalClasses}</p>
					</div>
					<div className="bg-white rounded-lg shadow p-4 text-center min-w-[100px]">
						<p className="text-sm text-gray-500">Present</p>
						<p className="text-2xl font-bold text-indigo-600">
							{course.present}
						</p>
					</div>
					<div className="bg-white rounded-lg shadow p-4 text-center min-w-[100px]">
						<p className="text-sm text-gray-500">Absent</p>
						<p className="text-2xl font-bold text-indigo-600">
							{course.absent}
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
				{/* Filter Panel */}
				<div className="bg-white rounded-lg shadow p-6 space-y-6">
					<h3 className="text-lg font-semibold">Filter Attendance</h3>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Course
						</label>
						<select
							value={selectedCrn}
							onChange={(e) => setSelectedCrn(Number(e.target.value))}
							className="w-full bg-gray-100 rounded p-2"
						>
							{courses.map((c) => (
								<option key={c.crn} value={c.crn}>
									{c.title} ({c.crn})
								</option>
							))}
						</select>
					</div>
					<div className="flex space-x-4">
						<button
							onClick={handleClear}
							className="flex-1 border border-indigo-600 text-indigo-600 rounded p-2"
						>
							Clear
						</button>
						<button
							onClick={handleApply}
							className="flex-1 bg-gradient-to-br from-indigo-600 to-blue-400 text-white rounded p-2"
						>
							Apply
						</button>
					</div>
				</div>

				{/* Right Side */}
				<div className="space-y-6">
					{/* Donut Chart Section */}
					<div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
						<div className="w-40 h-40 mx-auto md:mx-0">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={pieData}
										innerRadius={60}
										outerRadius={80}
										dataKey="value"
										stroke="none"
									>
										{pieData.map((entry, idx) => (
											<Cell key={idx} fill={entry.color} />
										))}
									</Pie>
								</PieChart>
							</ResponsiveContainer>
						</div>
						<div className="flex-1">
							<h3 className="text-xl font-semibold mb-2">
								Roll Call Attendance
							</h3>
							<div className="flex flex-wrap gap-6 mb-4">
								<div className="flex items-center space-x-2">
									<span className="inline-block w-3 h-3 bg-yellow-500 rounded-full" />
									<span>{course.late} Late Days</span>
								</div>
								<div className="flex items-center space-x-2">
									<span className="inline-block w-3 h-3 bg-red-500 rounded-full" />
									<span>{course.absent} Absent Days</span>
								</div>
								<div className="flex items-center space-x-2">
									<span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
									<span>{course.present} Present Days</span>
								</div>
							</div>
							<div className="text-center md:text-left">
								<p className="text-4xl font-bold">
									{Math.round((course.present / course.totalClasses) * 100)}%
								</p>
								<p className="text-gray-500">Current Score</p>
							</div>
						</div>
					</div>

					{/* Attendance Trend Chart */}
					<div className="bg-white rounded-lg shadow overflow-hidden">
						<div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white p-4 rounded-t-lg">
							<h3 className="text-lg font-semibold">Attendance Dashboard</h3>
						</div>
					</div>

					{/* Details Card */}
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-semibold">{course.title}</h3>
							<span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
								{course.crn}
							</span>
						</div>
						<div className="grid grid-cols-2 gap-8 mb-6">
							<div>
								<p className="text-sm text-gray-500">Professor</p>
								<p className="text-indigo-700 font-semibold">
									{course.professor}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Attendance %</p>
								<p className="text-indigo-700 font-semibold">
									{Math.round((course.present / course.totalClasses) * 100)}%
								</p>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4 text-center">
							<div className="bg-gray-100 rounded p-4">
								<p className="text-xl font-bold">{course.totalClasses}</p>
								<p className="text-sm text-gray-500">Schedules</p>
							</div>
							<div className="bg-gray-100 rounded p-4">
								<p className="text-xl font-bold">{course.present}</p>
								<p className="text-sm text-gray-500">Marked</p>
							</div>
							<div className="bg-gray-100 rounded p-4">
								<p className="text-xl font-bold">{course.absent}</p>
								<p className="text-sm text-gray-500">Unmarked</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsScreen;
