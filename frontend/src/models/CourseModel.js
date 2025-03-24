import { documentId, getDocs, orderBy, query, where } from "firebase/firestore";
import FirebaseBaseModel from "./FirebaseBaseModel";

class CourseModel extends FirebaseBaseModel {
  constructor() {
    super("courses");
  }

  async getAllCourses() {
    return await this.getAllDocuments();
  }

  async addNewCourse(course) {
    if (!course) {
      throw new Error("course data is required");
    }

    return await this.addDocument(course);
  }

  async getProfessorCourses(id) {
    if (!id) {
      throw new Error("Instructor ID is required");
    }

    const q = query(
      this.collectionRef,
      orderBy("createdAt", "desc"),
      where("instructorID", "==", id)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getCoursesByIds(ids) {
    if (!ids) {
      throw new Error("Course IDs are required");
    }

    const q = query(this.collectionRef, where(documentId(), "in", ids));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getCoursesNotInIds(ids) {
    if (!ids) {
      throw new Error("Course IDs are required");
    }

    if (ids.length <= 10) {
      // Use Firestore query if the array has 10 or fewer elements
      const q = query(this.collectionRef, where(documentId(), "not-in", ids));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      // Fetch all courses and filter manually if the array exceeds 10 elements
      const allCourses = await this.getAllDocuments();
      return allCourses.filter((course) => !ids.includes(course.id));
    }
  }
}

export default CourseModel;
