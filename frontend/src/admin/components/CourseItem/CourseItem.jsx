import "./CourseItem.css";

const CourseItem = ({ course }) => {
	if (!course) {
		return <div className="card mb-3 shadow-sm">Invalid Course Data</div>;
	}

	// Ensure safe extraction of course details
	const {
		lectureTitle = "Unknown Course",
		CRN = "N/A",
		instructor = "Unknown Instructor",
		startTime = "TBD",
		endTime = "TBD",
		buildingNumber = "N/A",
		campus = "Unknown",
		weekdays = [],
		term = "Unknown Term",
		classType = "Unknown Type",
		startDate,
		endDate,
	} = course;

	// Handle dates properly
	const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : "N/A";
	const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : "N/A";

	return (
		<div className="card mb-3 shadow-sm">
			<div className="card-header text-white bg-primary">
				{lectureTitle} - {CRN}
			</div>
			<div className="card-body bg-light">
				<h5 className="card-title">{instructor}</h5>
				<p className="card-text">
					<strong>Time:</strong> {startTime} to {endTime}
				</p>
				<p className="card-text">
					<strong>Building:</strong> {buildingNumber} on {campus}
				</p>
				<p className="card-text">
					<strong>Weekdays:</strong> {weekdays.length > 0 ? weekdays.join(", ") : "Not specified"}
				</p>
				<p className="card-text">
					<strong>Term:</strong> {term} - {classType}
				</p>
				<p className="card-text">
					<strong>Dates:</strong> {formattedStartDate} to {formattedEndDate}
				</p>
			</div>
		</div>
	);
};

export default CourseItem;
