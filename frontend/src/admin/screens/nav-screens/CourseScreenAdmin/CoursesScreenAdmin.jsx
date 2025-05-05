import React from "react";

import { Button } from "../../../../Components/button";
import { H1 } from "../../../../Components/typography/Heading";
import CourseList from "../../../../components/course/CourseList";
import AddCourseScreenAdmin from "../AddCourseScreenAdmin/AddCourseScreenAdmin";

const CoursesScreenAdmin = () => {
	const [showAddCourseModal, setShowAddCourseModal] = React.useState(false);
	const [newCourse, setNewCourse] = React.useState(null);

	// Function to add a new course dynamically
	const addCourseHandler = (newCourse) => {
		setNewCourse(newCourse);
		setShowAddCourseModal(false); // Close modal after adding
	};

	return (
		<>
			<div className="mb-4">
				<div className="flex align-center justify-between">
					<H1>Courses</H1>
					<Button variant="primary" onClick={() => setShowAddCourseModal(true)}>
						<span>Add Course</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4">
				<CourseList newCourse={newCourse} />
			</div>

			<AddCourseScreenAdmin
				addCourse={addCourseHandler}
				handleClose={() => setShowAddCourseModal(false)}
				isOpen={showAddCourseModal}
			/>
		</>
	);
};

export default CoursesScreenAdmin;
