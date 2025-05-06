import React, { useState } from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

// Dummy student data
const dummyStudents = [
	{
		id: "S001",
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		attendance: 92,
	},
	{
		id: "S002",
		name: "Bob Smith",
		email: "bob.smith@example.com",
		attendance: 85,
	},
	{
		id: "S003",
		name: "Charlie Lee",
		email: "charlie.lee@example.com",
		attendance: 78,
	},
	{
		id: "S004",
		name: "Dana Williams",
		email: "dana.williams@example.com",
		attendance: 95,
	},
];

// Generate dummy trend data based on attendance
const generateTrend = (percent) => [
	{ session: "Mon", attendance: Math.max(0, percent - 5) },
	{ session: "Tue", attendance: percent },
	{ session: "Wed", attendance: Math.max(0, percent - 15) },
	{ session: "Thu", attendance: Math.max(0, percent - 2) },
	{ session: "Fri", attendance: Math.max(0, percent - 8) },
];

const StudentsTab = () => {
	const [students] = useState(dummyStudents);
	const [selectedId, setSelectedId] = useState(null);

	const selected = students.find((s) => s.id === selectedId) || null;
	const pieData = selected
		? [
				{ name: "Present", value: selected.attendance, color: "#22c55e" },
				{ name: "Absent", value: 100 - selected.attendance, color: "#ef4444" },
		  ]
		: [];
	const trendData = selected ? generateTrend(selected.attendance) : [];

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h2 className="text-2xl font-semibold mb-6">My Students</h2>

			{/* Students Table */}
			<div className="bg-white rounded-lg shadow p-4 overflow-auto mb-8">
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr>
							{["ID", "Name", "Email", "Attendance %", "Actions"].map((h) => (
								<th
									key={h}
									className="px-4 py-2 text-left text-sm font-medium text-gray-700"
								>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{students.map((student) => (
							<tr key={student.id} className="hover:bg-gray-50">
								<td className="px-4 py-2 text-sm text-gray-800">
									{student.id}
								</td>
								<td className="px-4 py-2 text-sm text-gray-800">
									{student.name}
								</td>
								<td className="px-4 py-2 text-sm text-gray-800">
									{student.email}
								</td>
								<td className="px-4 py-2 text-sm text-gray-800">
									{student.attendance}%
								</td>
								<td className="px-4 py-2 text-sm text-center">
									<button
										onClick={() => setSelectedId(student.id)}
										className={`px-3 py-1 rounded text-white ${
											selectedId === student.id
												? "bg-indigo-700"
												: "bg-indigo-600 hover:bg-indigo-700"
										}`}
									>
										View Attendance
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Analytics Section */}
			{selected && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Pie Chart */}
					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-xl font-semibold mb-4">
							{selected.name} ({selected.id}) - Overall Attendance
						</h3>
						<div className="h-64 flex items-center justify-center">
							<ResponsiveContainer width="60%" height="100%">
								<PieChart>
									<Pie
										data={pieData}
										dataKey="value"
										innerRadius={40}
										outerRadius={80}
										paddingAngle={2}
									>
										{pieData.map((entry, idx) => (
											<Cell key={idx} fill={entry.color} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Trend Line Chart */}
					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-xl font-semibold mb-4">
							{selected.name} ({selected.id}) - Weekly Trend
						</h3>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={trendData}
									margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="session" />
									<YAxis domain={[0, 100]} />
									<Tooltip />
									<Line
										type="monotone"
										dataKey="attendance"
										stroke="#f59e0b"
										strokeWidth={2}
										dot
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default StudentsTab;
