import { H1 } from "../../../../Components/typography/Heading";
import CourseList from "../../../../Components/course/CourseList";
import Button from "../../../../Components/button/Button";
import { useNavigate } from "react-router-dom";

const CourseScreen = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="mb-4">
				<div className="flex align-center justify-between">
					<H1>Courses</H1>
					<Button
						variant="primary"
						onClick={() => navigate("/user/dashboard/my-courses/register")}
					>
						<span>Register</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4">
				<CourseList />
			</div>
		</>
	);
};

export default CourseScreen;
