import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userdashboard from "./user/screens/StudentDashboard.jsx";
import Admindashboard from "./admin/screens/AdminDashboard.jsx";

import Login from "./Screens/Common/Login.Jsx";
import Signup from "./Screens/Common/Signup.jsx";
import CoursesScreen from "./user/screens/NavScreens/CoursesScreen/CoursesScreen.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardScreen from "./user/screens/NavScreens/DashboardScreen.jsx";
import SettingsScreen from "./user/screens/NavScreens/SettingsScreen.jsx";
import AnalyticsScreen from "./user/screens/NavScreens/AnalyticsScreen.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
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
