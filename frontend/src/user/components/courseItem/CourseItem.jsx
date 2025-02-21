import React, { useState, useEffect } from "react";
import { getCoordinates } from "../../../services/util"; // Importing utility functions
import "./CourseItem.css";

const CourseItem = (props) => {
	// State management
	const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
	const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
	const [error, setError] = useState(null);
	const [timeUntilNextClass, setTimeUntilNextClass] = useState("");
	const [isClassInProgress, setIsClassInProgress] = useState(false);

	// Helper Functions
	const formatDate = (date) => {
		const parsedDate = new Date(date);
		if (isNaN(parsedDate)) {
			console.error("Invalid date:", date);
			return "Invalid Date";
		}
		return parsedDate.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const calculateDistance = (lat1, lon1, lat2, lon2) => {
		const toRad = (value) => value * Math.PI / 180;
		const R = 6371; // Radius of Earth in kilometers
		const dLat = toRad(lat2 - lat1);
		const dLon = toRad(lon2 - lon1);

		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c * 3280.84; // Convert km to feet
		return distance;
	};

	const fetchCoordinates = async () => {
		try {
			const coords = await getCoordinates();
			setCoordinates(coords);
		} catch (err) {
			setError("Error fetching coordinates: " + err.message);
		}
	};
	const getNextClassTime = () => {
		const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const currentDate = new Date();
		const courseWeekdays = props.course.weekdays.map((day) => weekdays.indexOf(day));
		const currentDayIndex = currentDate.getDay();

		let nextClassDayIndex = courseWeekdays.find((dayIndex) => dayIndex > currentDayIndex);
		if (nextClassDayIndex === undefined) nextClassDayIndex = courseWeekdays[0];

		const nextClassDate = new Date(currentDate);
		nextClassDate.setDate(currentDate.getDate() + ((nextClassDayIndex - currentDayIndex + 7) % 7));

		const [startHour, startMinute] = props.course.startTime.split(":");
		const classStartTime = new Date(nextClassDate);
		classStartTime.setHours(parseInt(startHour));
		classStartTime.setMinutes(parseInt(startMinute.split(" ")[0]));
		classStartTime.setSeconds(0);

		const [endHour, endMinute] = props.course.endTime.split(":");
		const classEndTime = new Date(nextClassDate);
		classEndTime.setHours(parseInt(endHour));
		classEndTime.setMinutes(parseInt(endMinute.split(" ")[0]));
		classEndTime.setSeconds(0);

		return { classStartTime, classEndTime };
	};

	// Mark attendance
	const markAttendance = async () => {
		try {
			fetchCoordinates()
			const distance = calculateDistance(
				coordinates.lat,
				coordinates.lng,
				parseFloat(props.course.latitude["$numberDouble"]),
				parseFloat(props.course.longitude["$numberDouble"])
			);
			if (distance < 50) {
				setIsAttendanceMarked(true);
				alert('Attendance marked successfully!');
			} else {
				alert('Failed to mark attendance: You are too far from the class!');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error getting location. Please try again.');
		}
	};

	// Date formatting for start and end
	const startDateTimestamp = props.course.startDate.$date.$numberLong;
	const endDateTimestamp = props.course.endDate.$date.$numberLong;
	const formattedStartDate = formatDate(parseInt(startDateTimestamp));
	const formattedEndDate = formatDate(parseInt(endDateTimestamp));

	// Countdown timer logic
	useEffect(() => {
		const intervalId = setInterval(() => {
			const { classStartTime, classEndTime } = getNextClassTime();
			const currentTime = new Date();

			if (currentTime >= classStartTime && currentTime <= classEndTime) {
				setIsClassInProgress(true);
				setTimeUntilNextClass("Class in progress");
			} else if (currentTime < classStartTime) {
				const timeDiff = classStartTime - currentTime;
				const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
				const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				setIsClassInProgress(false);
				setTimeUntilNextClass(`${days} days ${hours} hours until next class`);
			} else {
				const nextClassTime = getNextClassTime();
				const nextClassDiff = nextClassTime.classStartTime - currentTime;
				const nextClassDays = Math.floor(nextClassDiff / (1000 * 60 * 60 * 24));
				const nextClassHours = Math.floor((nextClassDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				setTimeUntilNextClass(`Next class in: ${nextClassDays} days ${nextClassHours} hours`);
			}

			if (currentTime >= classStartTime && currentTime <= classEndTime) {
				setIsAttendanceMarked(false); // Disable attendance marking if class is in progress
			} else {
				setIsAttendanceMarked(true); // Enable it if class hasn't started yet or has ended
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [props.course]);

	return (
		<div className="container my-2">
			<div className="card course-card">
				<div className="card-header bg-primary text-white">
					<h2 className="card-title">{props.course.lectureTitle}</h2>
					<h6 className="card-subtitle mb-2">
						{props.course.instructor} | CRN: {props.course.CRN}
					</h6>
				</div>
				<div className="card-body bg-light">
					<p className="card-text"><strong>Term:</strong> {props.course.term}</p>
					<p className="card-text"><strong>Class Type:</strong> {props.course.classType}</p>
					<p className="card-text"><strong>Schedule:</strong> {props.course.weekdays.join(", ")}</p>
					<p className="card-text"><strong>Time:</strong> {props.course.startTime} - {props.course.endTime}</p>
					<p className="card-text"><strong>Location:</strong> Building {props.course.buildingNumber}, {props.course.campus}</p>
					<p className="card-text"><strong>Duration:</strong> {formattedStartDate} - {formattedEndDate}</p>
					{error && <p className="text-danger">{error}</p>}
				</div>
				<div className="card-footer text-muted flex">
					<div>Next class in: {timeUntilNextClass}</div>
					<button
						className="btn btn-success"
						disabled={!isClassInProgress || isAttendanceMarked}
						onClick={markAttendance}
					>
						Mark Attendance
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseItem;
