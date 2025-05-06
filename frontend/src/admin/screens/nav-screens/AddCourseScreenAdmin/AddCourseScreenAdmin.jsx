import React from "react";
import PropTypes from "prop-types";
import * as userService from "../../../../services/user";
import { addNewCourse } from "../../../../services/course";

const AddCourseScreenAdmin = ({ addCourse, handleClose, isOpen }) => {
	const [course, setCourse] = React.useState({
		lectureTitle: "",
		CRN: "",
		instructor: "",
		instructorID: "",
		startTime: "",
		endTime: "",
		buildingNumber: "",
		campus: "",
		startDate: "",
		endDate: "",
		weekdays: [],
		term: "",
		classType: "",
		stream: "", // Add new field
	});

	const [instructors, setInstructors] = React.useState([]);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [errors, setErrors] = React.useState({});

	React.useEffect(() => {
		if (isOpen) {
			setCourse({
				lectureTitle: "",
				CRN: "",
				instructor: "",
				instructorID: "",
				startTime: "",
				endTime: "",
				buildingNumber: "N/A",
				campus: "N/A",
				startDate: "N/A",
				endDate: "N/A",
				weekdays: [],
				term: "",
				classType: "",
				stream: "",
			});
			setErrors({});
		}
	}, [isOpen]);

	React.useEffect(() => {
		(async () => {
			const instructors = await userService.getUsersByType("professor");
			setInstructors(instructors);
		})();
	}, []);

	const validateForm = () => {
		const newErrors = {};
		Object.keys(course).forEach((key) => {
			if (!course[key] && key !== "weekdays") {
				newErrors[key] = "This field is required";
			}
		});
		if (course.weekdays.length === 0) {
			newErrors.weekdays = "At least one weekday must be selected";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

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
		setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		try {
			const addedCourse = await addNewCourse(course);
			addCourse(addedCourse);
			handleClose();
		} catch (error) {
			console.error("Error adding course:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		isOpen && (
			<div
				className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto"
				onClick={handleClose}
			>
				<div
					className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex justify-between items-center border-b pb-3 px-6 py-4 bg-white sticky top-0 z-10">
						<h5 className="text-xl font-semibold text-gray-800">
							Add New Course
						</h5>
						<button
							onClick={handleClose}
							className="text-gray-500 hover:text-gray-800"
						>
							&times;
						</button>
					</div>

					<div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
						<form
							id="add-course-form"
							onSubmit={handleSubmit}
							className="space-y-4"
						>
							<div className="space-y-2">
								<label
									htmlFor="lectureTitle"
									className="block text-sm font-medium text-gray-700"
								>
									Lecture Title
								</label>
								<input
									type="text"
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="lectureTitle"
									name="lectureTitle"
									value={course.lectureTitle}
									onChange={handleChange}
									required
								/>
								{errors.lectureTitle && (
									<p className="text-red-500 text-sm">{errors.lectureTitle}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="CRN"
									className="block text-sm font-medium text-gray-700"
								>
									CRN
								</label>
								<input
									type="text"
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="CRN"
									name="CRN"
									value={course.CRN}
									onChange={handleChange}
									required
								/>
								{errors.CRN && (
									<p className="text-red-500 text-sm">{errors.CRN}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="instructor"
									className="block text-sm font-medium text-gray-700"
								>
									Instructor
								</label>
								<select
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="instructor"
									name="instructor"
									value={course.instructorID}
									onChange={(e) => {
										const selectedInstructor = instructors.find(
											(i) => i.id === e.target.value
										);
										setCourse((prev) => ({
											...prev,
											instructorID: selectedInstructor?.id || "",
											instructor: selectedInstructor?.email || "",
										}));
									}}
									required
								>
									<option value="">Select Instructor</option>
									{instructors.map((instructor) => (
										<option key={instructor.id} value={instructor.id}>
											{instructor.email}
										</option>
									))}
								</select>
								{errors.instructor && (
									<p className="text-red-500 text-sm">{errors.instructor}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="startTime"
									className="block text-sm font-medium text-gray-700"
								>
									Start Time
								</label>
								<input
									type="time"
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="startTime"
									name="startTime"
									value={course.startTime}
									onChange={handleChange}
									required
								/>
								{errors.startTime && (
									<p className="text-red-500 text-sm">{errors.startTime}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="endTime"
									className="block text-sm font-medium text-gray-700"
								>
									End Time
								</label>
								<input
									type="time"
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="endTime"
									name="endTime"
									value={course.endTime}
									onChange={handleChange}
									required
								/>
								{errors.endTime && (
									<p className="text-red-500 text-sm">{errors.endTime}</p>
								)}
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Weekdays
								</label>
								<div className="flex flex-wrap gap-4">
									{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
										(day) => (
											<div key={day} className="flex items-center space-x-2">
												<input
													className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
													type="checkbox"
													id={day}
													name="weekdays"
													value={day}
													checked={course.weekdays.includes(day)}
													onChange={handleChange}
												/>
												<label className="text-sm text-gray-700" htmlFor={day}>
													{day}
												</label>
											</div>
										)
									)}
								</div>
								{errors.weekdays && (
									<p className="text-red-500 text-sm">{errors.weekdays}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="term"
									className="block text-sm font-medium text-gray-700"
								>
									Term
								</label>
								<select
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="term"
									name="term"
									value={course.term}
									onChange={handleChange}
									required
								>
									<option value="">Select Term</option>
									<option value="Fall">Fall</option>
									<option value="Spring">Spring</option>
									<option value="Summer">Summer</option>
								</select>
								{errors.term && (
									<p className="text-red-500 text-sm">{errors.term}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="classType"
									className="block text-sm font-medium text-gray-700"
								>
									Class Type
								</label>
								<select
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="classType"
									name="classType"
									value={course.classType}
									onChange={handleChange}
									required
								>
									<option value="">Select Class Type</option>
									<option value="Face to Face">Face to Face</option>
									<option value="Online">Online</option>
									<option value="Hybrid">Hybrid</option>
								</select>
								{errors.classType && (
									<p className="text-red-500 text-sm">{errors.classType}</p>
								)}
							</div>
							<div className="space-y-2">
								<label
									htmlFor="stream"
									className="block text-sm font-medium text-gray-700"
								>
									Stream
								</label>
								<select
									className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
									id="stream"
									name="stream"
									value={course.stream}
									onChange={handleChange}
									required
								>
									<option value="">Select Stream</option>
									<option value="Artificial Intelligence">
										Artificial Intelligence
									</option>
									<option value="Computer Science">Computer Science</option>
									<option value="Cybersecurity">Cybersecurity</option>
									<option value="Data Management">Data Management</option>
									<option value="Digital Marketing">Digital Marketing</option>
									<option value="Bio-technology">Bio-technology</option>
								</select>
								{errors.stream && (
									<p className="text-red-500 text-sm">{errors.stream}</p>
								)}
							</div>
						</form>
					</div>

					<div className="flex justify-end space-x-4 border-t px-6 py-4 bg-white sticky bottom-0 z-10">
						<button
							type="submit"
							form="add-course-form"
							className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Submit"}
						</button>
						<button
							onClick={handleClose}
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		)
	);
};

AddCourseScreenAdmin.propTypes = {
	addCourse: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default AddCourseScreenAdmin;
