import React, { useState, useEffect } from "react";
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
import { getLoggedInUser } from "../../../services/user";
import { registeredCourses } from "../../../services/studentCourse";
import { getAttendanceForStudent } from "../../../services/attendance";
import { getCourseById } from "../../../services/course";

const AnalyticsScreen = () => {
	const [courses, setCourses] = useState([]);
	const [selectedCrn, setSelectedCrn] = useState(null);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const user = getLoggedInUser();
				const userCourses = await registeredCourses(user.id);
				// Transform the data into the required format with attendance data
				const formattedCourses = await Promise.all(userCourses.map(async course => {
					const attendanceRecords = await getAttendanceForStudent(user.id, course.courseId);
					const courseDetails = await getCourseById(course.courseId);
					
					const present = attendanceRecords.filter(record => record.status === "Present").length;
					const absent = attendanceRecords.filter(record => record.status === "Absent").length;
					const late = attendanceRecords.filter(record => record.status === "Late").length;
					const totalClasses = attendanceRecords.length;
					
					return {
						title: courseDetails.lectureTitle,
						crn: courseDetails.CRN,
						id: courseDetails.id,
						professor: courseDetails.instructor,
						totalClasses,
						present,
						absent,
						late,
					};
				}));
			
				setCourses(formattedCourses);
				if (formattedCourses.length > 0) {
					setSelectedCourse(formattedCourses[0]);
					setSelectedCrn(formattedCourses[0].crn);
				}
			} catch (error) {
				console.error("Error fetching courses:", error);
			} finally {
				setLoading(false);
			}
		};
	
		fetchCourses();
	}, []);
	console.log("###### courses", courses, selectedCrn);
	// Remove this line as we're using selectedCourse state directly
	// const course = courses.find((c) => c.crn === selectedCrn) || courses[0];
	
	// Update the selection handler
	const handleCourseSelection = (id) => {
	  const selected = courses.find((c) => c.id === id);
	  setSelectedCrn(id);
	  setSelectedCourse(selected);
	};
	// Update pieData to use the actual course values
	// Update pieData to handle no data case
	const pieData = selectedCourse && (selectedCourse.present || selectedCourse.absent || selectedCourse.late) ? [
	  { name: "Present Days", value: selectedCourse.present || 0, color: "#22c55e" },
	  { name: "Absent Days", value: selectedCourse.absent || 0, color: "#ef4444" },
	  { name: "Late Days", value: selectedCourse.late || 0, color: "#f59e0b" }
	].filter(item => item.value > 0) : [];
	console.log("###### pieData", selectedCourse);
	return (
		<div className="p-6 bg-gray-50 min-h-screen space-y-6">
			{loading ? (
				<div className="flex justify-center items-center h-64">
					<p>Loading analytics...</p>
				</div>
			) : courses.length === 0 ? (
				<div className="flex justify-center items-center h-64">
					<p>No courses registered yet.</p>
				</div>
			) : (
				<>
					{/* Top Bar */}
					<div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
							<h2 className="text-xl font-semibold">Roll Call Attendance</h2>
						</div>
						<div className="flex space-x-4">
							<div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white rounded-lg shadow p-4 text-center min-w-[100px]">
								<p className="text-sm">Total</p>
								<p className="text-2xl font-bold">{selectedCourse?.totalClasses || 0}</p>
							</div>
							<div className="bg-white rounded-lg shadow p-4 text-center min-w-[100px]">
								<p className="text-sm text-gray-500">Present</p>
								<p className="text-2xl font-bold text-indigo-600">
									{selectedCourse?.present || 0}
								</p>
							</div>
							<div className="bg-white rounded-lg shadow p-4 text-center min-w-[100px]">
								<p className="text-sm text-gray-500">Absent</p>
								<p className="text-2xl font-bold text-indigo-600">
									{selectedCourse?.absent || 0}
								</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-6">
						{/* Filter Panel */}
						<div className="bg-white rounded-lg shadow p-6 space-y-6">
							<h3 className="text-lg font-semibold">Course Selection</h3>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Select Course
								</label>
								<select
									value={selectedCrn}
									onChange={(e) => handleCourseSelection(e.target.value)}
									className="w-full bg-gray-100 rounded p-2"
								>
									{courses.map((c) => (
										<option key={c.id} value={c.id}>
											{c.title} ({c.crn})
										</option>
									))}
								</select>
							</div>
						</div>

						{/* Right Side */}
						<div className="space-y-6">
							{/* Donut Chart Section */}
							<div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
								<div className="w-40 h-40 mx-auto md:mx-0">
									<ResponsiveContainer width="100%" height="100%">
										{pieData.length > 0 ? (
											<PieChart>
												<Pie
													data={pieData}
													innerRadius={60}
													outerRadius={80}
													dataKey="value"
													stroke="none"
													paddingAngle={2}
												>
													{pieData.map((entry, idx) => (
														<Cell key={idx} fill={entry.color} />
													))}
												</Pie>
												<Tooltip formatter={(value) => `${value} days`} />
											</PieChart>
										) : (
											<div className="h-full w-full flex items-center justify-center">
												<p className="text-gray-500 text-center">No attendance data</p>
											</div>
										)}
									</ResponsiveContainer>
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-semibold mb-2">
										Roll Call Attendance
									</h3>
									{pieData.length > 0 ? (
										<>
											<div className="flex flex-wrap gap-6 mb-4">
												<div className="flex items-center space-x-2">
													<span className="inline-block w-3 h-3 bg-yellow-500 rounded-full" />
													<span>{selectedCourse?.late || 0} Late Days</span>
												</div>
												<div className="flex items-center space-x-2">
													<span className="inline-block w-3 h-3 bg-red-500 rounded-full" />
													<span>{selectedCourse?.absent || 0} Absent Days</span>
												</div>
												<div className="flex items-center space-x-2">
													<span className="inline-block w-3 h-3 bg-green-500 rounded-full" />
													<span>{selectedCourse?.present || 0} Present Days</span>
												</div>
											</div>
											<div className="text-center md:text-left">
												<p className="text-4xl font-bold">
													{selectedCourse ? Math.round((selectedCourse.present / selectedCourse.totalClasses) * 100) || 0 : 0}%
												</p>
												<p className="text-gray-500">Current Score</p>
											</div>
										</>
									) : (
										<p className="text-gray-500">No attendance records available</p>
									)}
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
									<h3 className="text-xl font-semibold">{selectedCourse?.title || 'No Course Selected'}</h3>
									<span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
										{selectedCourse?.crn || 'N/A'}
									</span>
								</div>
								<div className="grid grid-cols-2 gap-8 mb-6">
									<div>
										<p className="text-sm text-gray-500">Professor</p>
										<p className="text-indigo-700 font-semibold">
											{selectedCourse?.professor || 'N/A'}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">Attendance %</p>
										<p className="text-indigo-700 font-semibold">
											{selectedCourse ? Math.round((selectedCourse.present / selectedCourse.totalClasses) * 100) : 0}%
										</p>
									</div>
								</div>
								<div className="grid grid-cols-3 gap-4 text-center">
									<div className="bg-gray-100 rounded p-4">
										<p className="text-xl font-bold">{selectedCourse?.totalClasses || 0}</p>
										<p className="text-sm text-gray-500">Schedules</p>
									</div>
									<div className="bg-gray-100 rounded p-4">
										<p className="text-xl font-bold">{selectedCourse?.present || 0}</p>
										<p className="text-sm text-gray-500">Marked</p>
									</div>
									<div className="bg-gray-100 rounded p-4">
										<p className="text-xl font-bold">{selectedCourse?.absent || 0}</p>
										<p className="text-sm text-gray-500">Unmarked</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default AnalyticsScreen;
