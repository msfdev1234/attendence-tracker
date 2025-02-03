import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userdashboard from "./Screens/User/StudentDashboard";
import Admindashboard from "./screens/admin/AdminDashboard";

import Login from "./Screens/Common/Login.Jsx";
import CoursesScreen from "./Screens/User/NavScreens/CoursesScreen";
import DashboardScreen from "./Screens/User/NavScreens/DashboardScreen";
import SettingsScreen from "./Screens/User/NavScreens/SettingsScreen";
import AnalyticsScreen from "./Screens/User/NavScreens/AnalyticsScreen";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Login />} />
				<Route path="/userdashboard" element={<Userdashboard />}>
					<Route index element={<DashboardScreen />} />
					<Route path="welcome" element={<DashboardScreen />} />
					<Route path="my-courses" element={<CoursesScreen />} />
					<Route path="analytics" element={<AnalyticsScreen />} />
					<Route path="settings" element={<SettingsScreen />} />
				</Route>
				<Route path="/admindashboard" element={<Admindashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
