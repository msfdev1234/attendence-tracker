import React from "react";

import { H1 } from "components/typography/Heading";
import CourseList from "components/course/CourseList";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/Button";
import * as registerCourseService from "../../../../services/studentCourse";
import { serverTimestamp } from "firebase/firestore";

const ProfessorCourses = () => {
  const navigate = useNavigate();

  const [registeredCourses, setRegisteredCourses] = React.useState({});

  const registerCourse = async (studentId, courseId) => {
    setRegisteredCourses((prevState) => ({
      ...prevState,
      [courseId]: "loading",
    }));

    const data = {
      studentId,
      courseId,
      createdAt: serverTimestamp(),
    };

    try {
      await registerCourseService.registerCourse(data);
      setRegisteredCourses((prevState) => ({
        ...prevState,
        [courseId]: "success",
      }));
    } catch (error) {
      setRegisteredCourses((prevState) => ({
        ...prevState,
        [courseId]: "error",
      }));
      console.log("🚀 ~ registerCourse ~ error:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex align-center justify-between">
          <H1>Register Courses</H1>

          <Button
            variant="secondary"
            onClick={() => navigate("/user/dashboard/my-courses")}
          >
            <span>Go Back</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <CourseList
          registerCourse={registerCourse}
          registeredCourses={registeredCourses}
        />
      </div>
    </>
  );
};

export default ProfessorCourses;
