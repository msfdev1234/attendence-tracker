import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterCourses.css"; // make sure your CSS is properly imported
import dummyCourses, { currentStudent } from "../../../../services/data";

const courses = dummyCourses;

const RegisterCourses = () => {
	const navigate = useNavigate();
	const [registeredCourses, setRegisteredCourses] = useState([]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleRegister = (course) => {
		// Prevent duplicate entries
		if (!registeredCourses.find((c) => c.CRN === course.CRN)) {
			setRegisteredCourses((prev) => [...prev, course]);
		} else {
			alert("This course has already been added!");
		}
	};

	const confirmRegistration = () => {
		registeredCourses.forEach((course) => {
			const courseToUpdate = dummyCourses.find((c) => c.CRN === course.CRN);
			if (courseToUpdate) {
				courseToUpdate.students.push(currentStudent);
				console.log("Updated course with new student list:", courseToUpdate);
			}
		});

		// Optionally reset the registered courses list
		setRegisteredCourses([]);

		// Optionally navigate to another page or give feedback
		alert("Registration confirmed!");
	};

	return (
		<div className="container-register-courses mt-5">
			<div className="row mb-3">
				<div className="col-12">
					<button className="btn btn-secondary" onClick={handleBack}>
						&larr; Back
					</button>
					<h2 className="d-inline-block ms-3">Register Courses</h2>
				</div>
			</div>
			<div className="course-list-container">
				<div className="list-group">
					{courses.map((course) => (
						<div key={course.CRN} className="list-group-item">
							<div className="d-flex w-100 justify-content-between">
								<h5 className="mb-1">{course.lectureTitle}</h5>
								<button
									className="btn btn-primary"
									onClick={() => handleRegister(course)}
								>
									Register
								</button>
							</div>
							<p className="mb-1">CRN: {course.CRN}</p>
							<small>Instructor: {course.instructor}</small>
							<br />
							<small>Building: {course.buildingNumber}</small>
						</div>
					))}
				</div>
			</div>
			<div className="sticky-footer">
				{registeredCourses.length > 0 && (
					<>
						<div className="mt-4">
							<h4>Added Courses</h4>
							<ul className="list-group">
								{registeredCourses.map((course, index) => (
									<li key={index} className="list-group-item">
										{course.lectureTitle} - {course.instructor}
									</li>
								))}
							</ul>
						</div>
						<button
							className="btn btn-success btn-success-register-courses w-100 mt-3"
							onClick={confirmRegistration}
						>
							Confirm Registration
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default RegisterCourses;
