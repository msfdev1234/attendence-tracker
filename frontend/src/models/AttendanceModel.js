import FirebaseBaseModel from "./FirebaseBaseModel";

import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

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
}

export default AttendanceModel;
