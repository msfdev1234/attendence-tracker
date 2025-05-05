import PropTypes from "prop-types";
import { useContext } from "react";
import TimerContext from "../../context/TimerContext";
import Button from "../button/Button";
import { useLocation } from "react-router-dom";

const CourseListItem = (props) => {
  const location = useLocation();
  const timerData = useContext(TimerContext);

  const courseTimerData = timerData?.[props.course.id] || {
    timeUntilNextClass: "N/A",
    isClassInProgress: false,
    canMarkAttendance: false,
  };

  const isStudentCourseRegistrationRoute =
    location.pathname === "/user/dashboard/my-courses/register";

  const {
    id: courseId,
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
    stream = "N/A", // Add stream property
  } = props.course;

  const loggedInUser = props.loggedInUser;

  // Handle dates properly
  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString()
    : "N/A";
  const formattedEndDate = endDate
    ? new Date(endDate).toLocaleDateString()
    : "N/A";

  const getRegisterButtonLable = () => {
    const registerStatus = props.registeredCourses[courseId];
    if (registerStatus) {
      if (registerStatus === "loading") {
        return "Loading...";
      }

      if (registerStatus === "success") {
        return "Registered";
      }
    }

    return "Register";
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <div className="bg-blue-600 text-white px-4 py-2">
        <h3 className="text-lg font-semibold">
          {lectureTitle} - {CRN}
        </h3>
      </div>
      <div className="p-4">
        {loggedInUser.userType !== "professor" && (
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Email:</span> {instructor}
          </p>
        )}
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Time:</span> {startTime} to {endTime}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Weekdays:</span>{" "}
          {weekdays.length > 0 ? weekdays.join(", ") : "Not specified"}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Term:</span> {term} - {classType}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Stream:</span> {stream}
        </p>
        {["professor", "student"].includes(loggedInUser.userType) && (
          <>
            <hr className="my-4" />
            <div className="flex items-center justify-between">
              <div className="text-gray-500">
                Next class in: {courseTimerData.timeUntilNextClass}
              </div>
              {loggedInUser.userType === "professor" && (
                <Button
                  variant="secondary"
                  onClick={() => props.markAttendance(props.course)}
                  disabled={
                    // !courseTimerData.isClassInProgress ||
                    !courseTimerData.canMarkAttendance
                  }
                >
                  Mark Attendance
                </Button>
              )}

              {loggedInUser.userType === "student" &&
                isStudentCourseRegistrationRoute && (
                  <Button
                    variant="primary"
                    onClick={() =>
                      props.registerCourse(loggedInUser.id, courseId)
                    }
                    disabled={props.registeredCourses[courseId]}
                  >
                    {getRegisterButtonLable()}
                  </Button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CourseListItem.propTypes = {
  loggedInUser: PropTypes.object.isRequired,
  course: PropTypes.shape({
    lectureTitle: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    CRN: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    classType: PropTypes.string.isRequired,
    weekdays: PropTypes.arrayOf(PropTypes.string).isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    buildingNumber: PropTypes.string.isRequired,
    campus: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    id: PropTypes.string.isRequired,
  }).isRequired,
  registerCourse: PropTypes.func,
  registeredCourses: PropTypes.object,
  markAttendance: PropTypes.func,
};

export default CourseListItem;
