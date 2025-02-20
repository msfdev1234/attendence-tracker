import React from "react";

import "./CourseItem.css";
const CourseItem = (props) => {
	// Helper function to format dates
	const formatDate = (date) => {
		return new Date(date).toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

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
					<p className="card-text">
						<strong>Term:</strong> {props.course.term}
					</p>
					<p className="card-text">
						<strong>Class Type:</strong> {props.course.classType}
					</p>
					<p className="card-text">
						<strong>Schedule:</strong> {props.course.weekdays.join(", ")}
					</p>
					<p className="card-text">
						<strong>Time:</strong> {props.course.startTime} -{" "}
						{props.course.endTime}
					</p>
					<p className="card-text">
						<strong>Location:</strong> Building {props.course.buildingNumber},{" "}
						{props.course.campus}
					</p>
					<p className="card-text">
						<strong>Duration:</strong> {formatDate(props.course.startDate)} -{" "}
						{formatDate(props.course.endDate)}
					</p>
				</div>
				<div className="card-footer text-muted">
					<button className="btn btn-success">View More</button>
				</div>
			</div>
		</div>
	);
};

export default CourseItem;
