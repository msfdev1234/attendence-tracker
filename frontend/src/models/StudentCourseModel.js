import { getDocs, query, where } from "firebase/firestore";
import FirebaseBaseModel from "./FirebaseBaseModel";

class StudentCourseModel extends FirebaseBaseModel {
  constructor() {
    super("student_course");
  }

  async registerCourse(data) {
    return await this.addDocument(data);
  }

  async getRegisteredCoursesForStudent(studentId) {
    const q = query(this.collectionRef, where("studentId", "==", studentId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getCourseStudents(courseId) {
    const q = query(this.collectionRef, where("courseId", "==", courseId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}

export default StudentCourseModel;
