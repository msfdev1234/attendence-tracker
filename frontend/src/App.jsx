import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userdashboard from "./user/screens/StudentDashboard.jsx";
import Admindashboard from "./admin/screens/AdminDashboard.jsx";

import Login from "./Screens/Common/Login.jsx";
import Signup from "./Screens/Common/Signup.jsx";
import CoursesScreen from "./user/screens/NavScreens/CoursesScreen/CoursesScreen.jsx";
import DashboardScreen from "./user/screens/NavScreens/DashboardScreen.jsx";
import SettingsScreen from "./user/screens/NavScreens/SettingsScreen.jsx";
import AnalyticsScreen from "./user/screens/NavScreens/AnalyticsScreen.jsx";
import RegisterCourses from "./user/screens/NavScreens/CoursesScreen/RegisterCourses.jsx";
import ProfessorDashboard from "./professor/ProfessorDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="user/dashboard" element={<Userdashboard />}>
          <Route index element={<DashboardScreen />} />
          <Route path="welcome" element={<DashboardScreen />} />
          <Route path="my-courses" element={<CoursesScreen />} />
          <Route path="my-courses/register" element={<RegisterCourses />} />
          <Route path="analytics" element={<AnalyticsScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
        </Route>
        <Route path="admin">
          <Route path="dashboard" element={<Admindashboard />} />
        </Route>
        <Route path="professor">
          <Route path="dashboard" element={<ProfessorDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
