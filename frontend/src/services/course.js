import CourseModel from "models/CourseModel";
import { getLoggedInUser } from "services/user";

import * as studentCourseService from "services/studentCourse";

export const getCourses = async (pathName) => {
  try {
    const loggedinUser = getLoggedInUser();
    const course = new CourseModel();

    if (loggedinUser.userType === "admin") {
      return await course.getAllCourses();
    }

    if (loggedinUser.userType === "professor") {
      return await course.getProfessorCourses(loggedinUser.id);
    }

    if (loggedinUser.userType === "student") {
      const registeredCourses = await studentCourseService.registeredCourses(
        loggedinUser.id
      );

      const registeredCourseIds = registeredCourses.map(
        (course) => course.courseId
      );

      if (pathName === "/user/dashboard/my-courses") {
        if (registeredCourses.length === 0) {
          return [];
        }

        return await course.getCoursesByIds(registeredCourseIds);
      }

      if (registeredCourses.length === 0) {
        return await course.getAllCourses();
      }

      return await course.getCoursesNotInIds(registeredCourseIds);
    }

    return [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const addNewCourse = async (courseData) => {
  try {
    const courseModel = new CourseModel();
    return await courseModel.addNewCourse(courseData);
  } catch (error) {
    console.error("Error adding new course:", error);
    throw error;
  }
};

export const getNextClassTime = (course) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const courseWeekdays = course.weekdays.map((day) => weekdays.indexOf(day));
  const currentDayIndex = currentDate.getDay();

  let nextClassDayIndex = courseWeekdays.find(
    (dayIndex) => dayIndex > currentDayIndex
  );
  if (nextClassDayIndex === undefined) nextClassDayIndex = courseWeekdays[0];

  const nextClassDate = new Date(currentDate);
  nextClassDate.setDate(
    currentDate.getDate() + ((nextClassDayIndex - currentDayIndex + 7) % 7)
  );

  const [startHour, startMinute] = course.startTime.split(":");
  const classStartTime = new Date(nextClassDate);
  classStartTime.setHours(parseInt(startHour));
  classStartTime.setMinutes(parseInt(startMinute.split(" ")[0]));
  classStartTime.setSeconds(0);

  const [endHour, endMinute] = course.endTime.split(":");
  const classEndTime = new Date(nextClassDate);
  classEndTime.setHours(parseInt(endHour));
  classEndTime.setMinutes(parseInt(endMinute.split(" ")[0]));
  classEndTime.setSeconds(0);

  return { classStartTime, classEndTime };
};
