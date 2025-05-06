import FirebaseBaseModel from "./FirebaseBaseModel";
import { getDocs, limit, orderBy, query, where } from "firebase/firestore";
import AttendanceDetailModel from "./AttendanceDetailModel";

class AttendanceModel extends FirebaseBaseModel {
  constructor() {
    super("attendance");
  }

  async addAttendance(data) {
    if (!data) {
      throw new Error("Attendance data is required");
    }
    return await this.addDocument(data);
  }

  async getLastAttendance(courseIds) {
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      throw new Error("courseIds must be a non-empty array");
    }

    const q = query(
      this.collectionRef,
      where("courseId", "in", courseIds),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const lastAttendanceResult = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!lastAttendanceResult[data.courseId]) {
        lastAttendanceResult[data.courseId] = data;
      } else {
        if (data.createdAt > lastAttendanceResult[data.courseId].createdAt) {
          lastAttendanceResult[data.courseId] = data;
        }
      }
    });

    return lastAttendanceResult;
  }

  async getStudentAttendance(studentId, courseId) {
    if (!studentId || !courseId) {
      throw new Error("Student ID and Course ID are required");
    }

    // First get all attendance records for the course
    const attendanceQuery = query(
      this.collectionRef,
      where("courseId", "==", courseId),
      orderBy("createdAt", "desc")
    );

    const attendanceSnapshot = await getDocs(attendanceQuery);
    const attendanceIds = attendanceSnapshot.docs.map(doc => doc.id);

    // Then get attendance details for this student
    const attendanceDetailModel = new AttendanceDetailModel();
    const detailsQuery = query(
      attendanceDetailModel.collectionRef,
      where("studentId", "==", studentId),
      where("attendanceId", "in", attendanceIds)
    );

    const detailsSnapshot = await getDocs(detailsQuery);
    return detailsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}

export default AttendanceModel;
