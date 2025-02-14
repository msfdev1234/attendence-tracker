// src/Components/CourseItem.jsx
import styled from "styled-components";

const CourseContainer = styled.div`
	padding: 10px;
	margin: 5px;
	background: lightgray;
	cursor: pointer;
`;

const CourseItem = ({ course }) => {
	return (
		<CourseContainer>
			<h3>{course.name}</h3>
			<p>{course.instructor}</p>
			<p>{course.time}</p>
		</CourseContainer>
	);
};

export default CourseItem;
