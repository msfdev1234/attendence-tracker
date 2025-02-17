import React, { useState } from "react";
import "./CoursesScreenAdmin.css";
import AddCourseScreenAdmin from "../AddCourseScreenAdmin/AddCourseScreenAdmin"; // Correct the path as needed
import CourseItem from "../../../components/CourseItem/CourseItem"; // Correct the path as needed
import dummyCourses from "../../../../services/data"; // Correct the path as needed

const CoursesScreenAdmin = () => {
	const [showAddCourseModal, setShowAddCourseModal] = useState(false);

	const [coursesList, setCoursesList] = useState(dummyCourses);
	const [open, setOpen] = React.useState(false);

	// Function to add a new course to the list
	const addCourseHandler = (newCourse) => {
		setCoursesList((currentCourses) => [...currentCourses, newCourse]);
	};
	const handleShowModal = () => {
		setShowAddCourseModal(true);
	};

	const handleCloseModal = () => {
		setShowAddCourseModal(false);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<div className="row container-course-screen">
				<div className="col-6 heading-courses">
					<h3>Courses</h3>
					<button className="btn btn-primary" onClick={handleShowModal}>
						Add Course
					</button>
				</div>
			</div>
			<div className="row content-course-screen">
				<div className="col-6">
					{coursesList.map((course) => (
						<CourseItem key={course.CRN} course={course} />
					))}
				</div>
			</div>
			{showAddCourseModal && (
				<AddCourseScreenAdmin
					addCourse={addCourseHandler}
					handleClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default CoursesScreenAdmin;
