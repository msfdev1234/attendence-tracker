import styled from "styled-components";
import { courses } from "../../../../services/course.data";
import { useState } from "react";
import CourseItem from "../../../components/courseItem/CourseItem";
//import distanceBetweenTwoPoints from "../../../services/util";
//import { courses } from "../../../data/course.data"; // Adjust the path as needed

import "./CoursesScreen.css";
import dummyCourses from "../../../../services/data";
// Styling for the overall container of the course cards
const CourseContainer = styled.div`
	background: #f9f9f9;
	border-radius: 15px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin: 20px auto;
	width: 90%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
`;

const CourseTitle = styled.h2`
	font-size: 1.8rem;
	color: #333;
	border-bottom: 2px solid #eee;
	padding-bottom: 10px;
`;

const CourseDescription = styled.p`
	font-size: 1rem;
	color: #666;
	margin: 10px 0;
`;

const CourseInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
`;

const ProfessorName = styled.div`
	font-size: 1rem;
	font-weight: bold;
	color: #444;
`;

const AttendanceButton = styled.button`
	padding: 8px 16px;
	background-color: #4caf50; // A green color for success/action
	color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 1rem;

	&:hover {
		background-color: #45a049; // Darken on hover for visual feedback
	}

	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;

const CurrentLocation = styled.div`
	font-size: 1rem;
	font-weight: bold;
	color: #444;
`;

const CoursesScreen = () => {
	const [attendance, setAttendance] = useState(
		courses.reduce((acc, course) => {
			acc[course.id] = false;
			return acc;
		}, {})
	);

	const [distanceFromProfessor, setDistanceFromProfessor] = useState();

	const handleMarkAttendance = (course) => {
		const geoOptions = {
			enableHighAccuracy: true, // Requests the best results from the location provider
			timeout: 5000, // Maximum time allowed for trying to get a position (in milliseconds)
			maximumAge: 0, // Disable caching, always try to get a fresh location
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					console.log(position);
				},
				(error) => {
					alert(`Error getting location: ${error.message}`);
				},
				geoOptions
			);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	};

	return (
		<div className="m-0 p-0 w-100 h-100 bg-grey ">
			<div className="row top-bar-courses-screen header border rounded-1 p-2 flex-row d-flex justify-content-center align-items-center">
				<div className="col-4 d-flex justify-content-center">
					<h4 className="p-2">My Courses</h4>
				</div>

				<div className="col-4 d-flex justify-content-center">
					<button className="btn btn-primary">Register</button>
				</div>
			</div>

			<div className="row card p-3 mt-2 border-0">
				{dummyCourses.map((course) => (
					<CourseItem key={course.CRN} course={course}></CourseItem>
				))}
			</div>
		</div>
	);
};

export default CoursesScreen;
