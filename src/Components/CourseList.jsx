// src/Components/CourseList.jsx
import CourseItem from "./CourseItem";

const CourseList = ({ courses }) => {
	return (
		<div>
			{courses.map((course) => (
				<CourseItem key={course.id} course={course} />
			))}
		</div>
	);
};

export default CourseList;
