import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProfessorDashboard, StudentDashboard, Auth } from "@/layouts";

// Example of user data. Replace this with actual logic like context or localStorage.
const isAuthenticated = true; // Replace with real authentication check
const userRole = "student"; // Replace with real role (could be 'student', 'professor', etc.)

function App() {
  return (
    <Routes>
      {/* Public Route - Auth Page */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Conditional Routes based on Authentication */}
      {isAuthenticated ? (
        <>
          {/* Restricted Routes based on User Role */}
          {userRole === "professor" ? (
            <>
              <Route path="/professor/*" element={<ProfessorDashboard />} />
              {/* Redirect all other routes to Professor Dashboard */}
              <Route path="*" element={<Navigate to="/professor/home" replace />} />
            </>
          ) : userRole === "student" ? (
            <>
              <Route path="/student/*" element={<StudentDashboard />} />
              {/* Redirect all other routes to Student Dashboard */}
              <Route path="*" element={<Navigate to="/student/home" replace />} />
            </>
          ) : (
            // If the user has an unknown role, you can redirect them to the login page or a default screen.
            <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
          )}
        </>
      ) : (
        // Redirect to Auth if not authenticated
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      )}
    </Routes>
  );
}

export default App;
