import React, { useCallback } from "react";

import { H1 } from "../Components/typography/Heading";
import CourseList from "../Components/course/CourseList";
import MarkAttendance from "./components/MarkAttendance";
import { courseStudents } from "../services/studentCourse";
import { getUsersByIds } from "../services/user";

const ProfessorCourses = () => {
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [courseSchedule, setCourseSchedule] = React.useState(null);
  const markAttendance = useCallback((courseId, courseSchedule) => {
    console.log("🚀 ~ file: ProfessorCourses.jsx:42 ~ ProfessorCourses ~ courseSchedule:", courseSchedule, courseId)
    setSelectedCourse(courseId);
    setCourseSchedule(courseSchedule);
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const studentsOfCourse = await courseStudents(selectedCourse.id);

      if (studentsOfCourse.length > 0) {
        const studentIds = studentsOfCourse.map((student) => student.studentId);

        return await getUsersByIds(studentIds);
      }

      return [];
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [selectedCourse]);

  React.useEffect(() => {
    if (!selectedCourse) return;

    const fetchData = async () => {
      const studentsData = await fetchStudents();

      setStudents(studentsData);
    };

    fetchData();
  }, [fetchStudents, selectedCourse]);

  const handleClose = () => {
    setSelectedCourse(null);
    setStudents([]);
    setLoading(true);
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex align-center justify-between">
          <H1>Courses</H1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <CourseList markAttendance={markAttendance} />
      </div>

      {selectedCourse && (
        <MarkAttendance
          course={selectedCourse}
          isOpen={true}
          students={students}
          loading={loading}
          courseSchedule={courseSchedule}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ProfessorCourses;
