import React, { useState } from "react";
import dummyCourses from "../../../../services/data";
//import "./AddCourseScreenAdmin.css";

// import ReactDom from "react-dom";

const AddCourseScreenAdmin = ({ handleClose, addCourse }) => {
	const [course, setCourse] = useState({
		lectureTitle: "",
		CRN: "",
		instructor: "",
		startTime: "",
		endTime: "",
		buildingNumber: "",
		campus: "",
		startDate: "",
		endDate: "",
		weekdays: [],
		term: "",
		classType: "",
	});

	const handleChange = (event) => {
		const { name, value, type } = event.target;
		if (type === "checkbox" && name === "weekdays") {
			setCourse((prevCourse) => ({
				...prevCourse,
				weekdays: prevCourse.weekdays.includes(value)
					? prevCourse.weekdays.filter((day) => day !== value)
					: [...prevCourse.weekdays, value],
			}));
		} else {
			setCourse((prevCourse) => ({
				...prevCourse,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Submitting course data:", course);
		// Add AJAX call to post data, or handle data in another way
		addCourse(course);
		dummyCourses.push(course);
	};

	return (
		<div className="modal-overlay" onClick={handleClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<h5>Add New Course</h5>
					<button onClick={handleClose}>&times;</button>
				</div>
				<div className="modal-body">
					<form onSubmit={handleSubmit}>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="lectureTitle">Lecture Title</label>
								<input
									type="text"
									className="form-control"
									id="lectureTitle"
									name="lectureTitle"
									value={course.lectureTitle}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="CRN">CRN</label>
								<input
									type="text"
									className="form-control"
									id="CRN"
									name="CRN"
									value={course.CRN}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="instructor">Instructor</label>
								<input
									type="text"
									className="form-control"
									id="instructor"
									name="instructor"
									value={course.instructor}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="startTime">Start Time</label>
								<input
									type="time"
									className="form-control"
									id="startTime"
									name="startTime"
									value={course.startTime}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="endTime">End Time</label>
								<input
									type="time"
									className="form-control"
									id="endTime"
									name="endTime"
									value={course.endTime}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="buildingNumber">Building Number</label>
								<input
									type="text"
									className="form-control"
									id="buildingNumber"
									name="buildingNumber"
									value={course.buildingNumber}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="campus">Campus</label>
								<input
									type="text"
									className="form-control"
									id="campus"
									name="campus"
									value={course.campus}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="startDate">Start Date</label>
								<input
									type="date"
									className="form-control"
									id="startDate"
									name="startDate"
									value={course.startDate}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="endDate">End Date</label>
								<input
									type="date"
									className="form-control"
									id="endDate"
									name="endDate"
									value={course.endDate}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-group">
								<label>Weekdays</label>
								<div>
									{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
										(day) => (
											<div key={day} className="form-check form-check-inline">
												<input
													className="form-check-input"
													type="checkbox"
													id={day}
													name="weekdays"
													value={day}
													checked={course.weekdays.includes(day)}
													onChange={handleChange}
												/>
												<label className="form-check-label" htmlFor={day}>
													{day}
												</label>
											</div>
										)
									)}
								</div>
							</div>

							<div className="form-group">
								<label htmlFor="term">Term</label>
								<select
									className="form-control"
									id="term"
									name="term"
									value={course.term}
									onChange={handleChange}
								>
									<option value="">Select Term</option>
									<option value="Fall">Fall</option>
									<option value="Spring">Spring</option>
									<option value="Summer">Summer</option>
								</select>
							</div>

							<div className="form-group">
								<label htmlFor="classType">Class Type</label>
								<select
									className="form-control"
									id="classType"
									name="classType"
									value={course.classType}
									onChange={handleChange}
								>
									<option value="">Select Class Type</option>
									<option value="Face to Face">Face to Face</option>
									<option value="Online">Online</option>
									<option value="Hybrid">Hybrid</option>
								</select>
							</div>

							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Submit
							</button>
						</form>
					</form>
				</div>
				<div className="modal-footer">
					<button onClick={handleClose}>Close</button>
				</div>
			</div>
		</div>
	);
};

export default AddCourseScreenAdmin;
