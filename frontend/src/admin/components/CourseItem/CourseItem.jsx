import "./CourseItem.css";

const CourseItem = ({ course }) => {
	return (
		<div className="card mb-3 shadow-sm">
			<div className="card-header text-white bg-primary">
				{course.lectureTitle} - {course.CRN}
			</div>
			<div className="card-body bg-light">
				<h5 className="card-title">{course.instructor}</h5>
				<p className="card-text">
					<strong>Time:</strong> {course.startTime} to {course.endTime}
				</p>
				<p className="card-text">
					<strong>Building:</strong> {course.buildingNumber} on {course.campus}
				</p>
				<p className="card-text">
					<strong>Weekdays:</strong> {course.weekdays.join(", ")}
				</p>
				<p className="card-text">
					<strong>Term:</strong> {course.term} - {course.classType}
				</p>
				<p className="card-text">
					<strong>Dates:</strong>{" "}
					{new Date(course.startDate).toLocaleDateString()} to{" "}
					{new Date(course.endDate).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
};

export default CourseItem;
