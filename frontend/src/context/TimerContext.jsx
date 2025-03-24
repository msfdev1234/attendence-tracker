import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getNextClassTime } from "../services/course";

const TimerContext = createContext();

export const TimerProvider = ({ courses, children }) => {
  const [timerData, setTimerData] = useState({});

  const coursesRef = useRef(courses);

  useEffect(() => {
    // Initial calculation
    calculateTimerData();

    // Set interval for updates
    const intervalId = setInterval(calculateTimerData, 60000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  const calculateTimerData = () => {
    const currentTime = new Date();
    const updatedTimerData = {};

    coursesRef.current.forEach((course) => {
      if (!course) return; // Skip null/undefined courses
      if (!course.id) return; // Skip invalid courses

      try {
        const { classStartTime, classEndTime } = getNextClassTime(course);

        if (currentTime >= classStartTime && currentTime <= classEndTime) {
          updatedTimerData[course.id] = {
            timeUntilNextClass: "Class in progress",
            isClassInProgress: true,
            canMarkAttendance: true,
          };
        } else if (currentTime < classStartTime) {
          const timeDiff = classStartTime - currentTime;
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );

          updatedTimerData[course.id] = {
            timeUntilNextClass: `${days > 0 ? `${days} days ` : ""}${
              hours > 0 ? `${hours} hrs ` : ""
            }${minutes} mins until next class`,
            isClassInProgress: false,
            canMarkAttendance: true,
          };
        } else {
          // Find the next week's class
          const { classStartTime: nextWeekStart } = getNextClassTime(course);

          const nextClassDiff = nextWeekStart - currentTime;
          const nextClassDays = Math.floor(
            nextClassDiff / (1000 * 60 * 60 * 24)
          );
          const nextClassHours = Math.floor(
            (nextClassDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );

          updatedTimerData[course.id] = {
            timeUntilNextClass: `Next class in: ${nextClassDays} days ${nextClassHours} hrs`,
            isClassInProgress: false,
            canMarkAttendance: true,
          };
        }
      } catch (error) {
        console.error(
          `Error calculating timer for course ${course.id}:`,
          error
        );
        updatedTimerData[course.id] = {
          timeUntilNextClass: "Time calculation error",
          isClassInProgress: false,
          canMarkAttendance: false,
        };
      }
    });

    setTimerData(updatedTimerData);
  };

  return (
    <TimerContext.Provider value={timerData}>{children}</TimerContext.Provider>
  );
};

export default TimerContext;

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
  courses: PropTypes.array.isRequired,
};
