import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import FirebaseBaseModel from "./FirebaseBaseModel";
import { documentId, getDocs, query, where } from "firebase/firestore";

class UserModel extends FirebaseBaseModel {
  constructor() {
    super("users");
  }

  static USER_TYPES = {
    ADMIN: "admin",
    PROFESSOR: "professor",
    STUDENT: "student",
  };

  async createUser(userData) {
    return await this.createDocument(userData);
  }

  async findUserById(id) {
    return await this.findDocumentById(id);
  }

  async getUsersByType(userType) {
    const q = query(this.collectionRef, where("userType", "==", userType));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async login(email, password) {
    const auth = FirebaseBaseModel.getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userModel = new UserModel();
    return await userModel.findUserById(user.uid);
  }

  static async signup(email, password, userType) {
    const auth = FirebaseBaseModel.getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const userModel = new UserModel();
    await userModel.saveUserData(user.uid, { email, userType });
  }

  async saveUserData(userId, userData) {
    return await this.setDocument(userId, userData);
  }

  async getUsersByIds(ids) {
    if (!ids) {
      throw new Error("User IDs are required");
    }

    const q = query(this.collectionRef, where(documentId(), "in", ids));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async updateUserLocation(userId, location) {
    if (!userId || !location) {
      throw new Error("User ID and location are required");
    }
    return await this.updateDocument(userId, { location });
  }
}

export default UserModel;
