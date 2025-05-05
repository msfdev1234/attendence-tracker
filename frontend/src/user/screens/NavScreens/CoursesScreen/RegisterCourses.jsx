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
  const [selectedStreams, setSelectedStreams] = React.useState([]);
  const [selectedTerms, setSelectedTerms] = React.useState([]);

  const streams = [
    "Artificial Intelligence",
    "Computer Science",
    "Cybersecurity",
    "Data Management",
    "Digital Marketing",
    "Bio-technology"
  ];

  const terms = [
    "Fall",
    "Spring",
    "Summer",
  ];

  const handleStreamChange = (stream) => {
    setSelectedStreams(prev => {
      if (prev.includes(stream)) {
        return prev.filter(s => s !== stream);
      }
      return [...prev, stream];
    });
  };

  const handleTermChange = (term) => {
    setSelectedTerms(prev => {
      if (prev.includes(term)) {
        return prev.filter(t => t !== term);
      }
      return [...prev, term];
    });
  };

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

      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-3">Filter by Stream</h2>
          <div className="flex flex-wrap gap-4">
            {streams.map((stream) => (
              <label key={stream} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedStreams.includes(stream)}
                  onChange={() => handleStreamChange(stream)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{stream}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Filter by Term</h2>
          <div className="flex flex-wrap gap-4">
            {terms.map((term) => (
              <label key={term} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTerms.includes(term)}
                  onChange={() => handleTermChange(term)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{term}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <CourseList
          registerCourse={registerCourse}
          registeredCourses={registeredCourses}
          streamFilter={selectedStreams}
          termFilter={selectedTerms}
        />
      </div>
    </>
  );
};

export default ProfessorCourses;
