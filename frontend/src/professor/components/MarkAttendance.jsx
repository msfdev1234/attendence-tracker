import React from "react";
import PropTypes from "prop-types";
import { serverTimestamp } from "firebase/firestore";
import { addAttendanceDetail } from "../../services/attendanceDetail";
import { addAttendance } from "../../services/attendance";
import { getLoggedInUser } from "../../services/user";
import { calculateDistance } from "../../services/location";

const MIN_DISTANCE_FOR_PRESENT = 100;

const MarkAttendance = ({
  loading,
  course,
  students,
  courseSchedule,
  handleClose,
  isOpen,
  refetchCourses,
}) => {
  const [attendanceData, setAttendanceData] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      // Get professor location
      const professotLocation = getLoggedInUser().location;

      setAttendanceData(
        students.map((student) => {
          let status = "Absent";
          if (professotLocation) {
            const studentLocation = student.location;

            if (studentLocation) {
              const distance = calculateDistance(
                professotLocation,
                studentLocation
              );

              if (
                typeof distance === "number" &&
                !isNaN(distance) &&
                distance <= MIN_DISTANCE_FOR_PRESENT
              ) {
                status = "Present";
              }
            }
          }

          return {
            id: student.id,
            email: student.email,
            status,
            remark: "",
          };
        })
      );
    }
  }, [isOpen, students]);

  const getCourseTimeDetails = (courseSchedule) => {
    const { date, day, startTime, endTime } = courseSchedule;

    return (
      <div className="rounded-md shadow-sm">
        <p className="text-sm text-gray-600">
          {`${date} (${day}), ${startTime} - ${endTime}`}
        </p>
      </div>
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Add attendance document
    const attendance = {
      courseId: course.id,
      date: courseSchedule.date,
      day: courseSchedule.day,
      startTime: courseSchedule.startTime,
      endTime: courseSchedule.endTime,
      createdAt: serverTimestamp(),
    };
    const createdAttendance = await addAttendance(attendance);

    const formData = new FormData(event.target);
    const data = attendanceData.map((entry) => {
      return {
        studentId: entry.id,
        attendanceId: createdAttendance.id,
        status: formData.get(`attendance-${entry.id}`),
        remark: formData.get(`remark-${entry.id}`),
        createdAt: serverTimestamp(),
      };
    });

    await addAttendanceDetail(data);
    setIsSubmitting(false);
    handleClose();

    // Refresh the page
    window.location.reload();
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b pb-3 px-6 py-4 bg-white sticky top-0 z-10">
            <div>
              <h5 className="text-xl font-semibold text-gray-800">
                Mark Attendance For
              </h5>
              {courseSchedule && getCourseTimeDetails(courseSchedule)}
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </div>

          <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
              </div>
            ) : (
              <form id="mark-attendance-form" onSubmit={onSubmit}>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Student
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Attendance
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((entry) => (
                      <tr key={entry.id}>
                        <td className="border border-gray-300 px-4 py-2">
                          {entry.email}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <select
                            name={`attendance-${entry.id}`}
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={entry.status}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            name={`remark-${entry.id}`}
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={entry.remark}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </form>
            )}
          </div>

          <div className="flex justify-end space-x-4 border-t px-6 py-4 bg-white sticky bottom-0 z-10">
            <button
              type="submit"
              form="mark-attendance-form"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
              disabled={loading || isSubmitting || attendanceData.length === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <button
              onClick={handleClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400"
              disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

MarkAttendance.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  course: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  courseSchedule: PropTypes.object,
  refetchCourses: PropTypes.func,
};

export default MarkAttendance;
