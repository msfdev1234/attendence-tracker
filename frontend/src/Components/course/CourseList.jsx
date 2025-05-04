import React from "react";
import PropTypes from "prop-types";
import * as userService from "services/user";
import CourseListItem from "./CourseListItem";
import * as courseService from "services/course";
import { TimerProvider } from "../../context/TimerContext";
import { useLocation } from "react-router-dom";

const CourseList = (props) => {
  const location = useLocation();

  const [loading, setLoading] = React.useState(true);
  const [courses, setCourses] = React.useState([]);
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  const getCourses = async () => {
    const response = await courseService.getCourses(location.pathname);
    console.log(response); // Add this line to check the response object
    setCourses(response);
    setLoading(false);
  };

  const getLoggedInUser = async () => {
    const user = await userService.getLoggedInUser();
    setLoggedInUser(user);
  };

  React.useEffect(() => {
    getCourses();
    getLoggedInUser();
  }, []);

  React.useEffect(() => {
    setCourses((prevCourses) => [props.newCourse, ...prevCourses]);
  }, [props.newCourse]);

  const getCourseList = () => {
    if (loading) {
      return <p>Loading courses...</p>;
    }

    if (courses.length === 0) {
      return <p>No courses available.</p>;
    }

    const courseList = courses.map((course) => (
      <CourseListItem
        key={course.id}
        course={course}
        loggedInUser={loggedInUser}
        registerCourse={props.registerCourse}
        registeredCourses={props.registeredCourses}
        markAttendance={props.markAttendance}
      />
    ));

    if (loggedInUser.userType === "admin") {
      return courseList;
    }

    return <TimerProvider courses={courses}>{courseList}</TimerProvider>;
  };

  return (
    <div className="row content-course-screen">
      <div className="col-6">{getCourseList()}</div>
    </div>
  );
};
CourseList.propTypes = {
  newCourse: PropTypes.object,
  registerCourse: PropTypes.func,
  registeredCourses: PropTypes.object,
  markAttendance: PropTypes.func,
};

export default CourseList;
