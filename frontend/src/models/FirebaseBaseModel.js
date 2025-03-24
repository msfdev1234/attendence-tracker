import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

class FirebaseBaseModel {
  static #db = null;
  static #auth = null;

  static initializeFirebase() {
    if (!this.#db) {
      const firebaseConfig = {
        apiKey: "AIzaSyA7BP3YffQmJdkkDMJA22iVAg0n6oKQh-Y",
        authDomain: "yu-attendance-2d01b.firebaseapp.com",
        projectId: "yu-attendance-2d01b",
        storageBucket: "yu-attendance-firebase.storage.app",
        messagingSenderId: "475051015844",
        appId: "1:475051015844:web:08c643caa9ae86ff1bf031",
        measurementId: "G-8KYCFC9J6F",
      };

      const app = initializeApp(firebaseConfig);

      if (!this.#auth) {
        this.#auth = getAuth(app);
      }

      this.#db = getFirestore(app);
    }
  }

  constructor(collectionName) {
    FirebaseBaseModel.initializeFirebase();
    this.collectionRef = collection(FirebaseBaseModel.#db, collectionName);
  }

  static getAuth() {
    if (!this.#auth) {
      this.initializeFirebase();
    }
    return this.#auth;
  }

  async getAllDocuments() {
    const q = query(this.collectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async addDocument(data) {
    if (!data) {
      throw new Error("Data is required");
    }

    const docRef = await addDoc(this.collectionRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return {
      id: docRef.id,
      ...data, // Return the data along with the ID
    };
  }

  async setDocument(id, data) {
    if (!id || !data) {
      throw new Error("Document ID and data are required");
    }

    const docRef = doc(FirebaseBaseModel.#db, this.collectionRef.path, id);
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  }

  async findDocumentById(id) {
    if (!id) {
      throw new Error("Document ID is required");
    }

    const docRef = doc(FirebaseBaseModel.#db, this.collectionRef.path, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error(`No document found with ID: ${id}`);
    }
  }

  async insertBulk(collection, dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new Error("An array of data is required");
    }

    return await Promise.all(
      dataArray.map((data) => addDoc(this.collectionRef, data))
    );
  }
}

export default FirebaseBaseModel;
