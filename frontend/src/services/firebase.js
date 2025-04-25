// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore functions

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7BP3YffQmJdkkDMJA22iVAg0n6oKQh-Y",
  authDomain: "yu-attendance-2d01b.firebaseapp.com",
  projectId: "yu-attendance-2d01b",
  storageBucket: "yu-attendance-2d01b.firebasestorage.app",
  messagingSenderId: "475051015844",
  appId: "1:475051015844:web:08c643caa9ae86ff1bf031",
  measurementId: "G-8KYCFC9J6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Function to save user data to Firestore
const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData); // Save user data in the "users" collection
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Function to sign up a new user
export const signup = async (email, password, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await saveUserData(user.uid, { email, userType }); // Save email and userType

    console.log("User signed up:", user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error during signup:", errorCode, errorMessage);
    throw error; // Rethrow the error to be caught in the Signup component
  }
};


// Function to log in a user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User logged in:", userData);
      return userData; // Return user data
    } else {
      console.error("No such user document!");
      throw new Error("User data not found.");
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error during login:", errorCode, errorMessage);
    throw error; // Rethrow the error to be caught in the Login component
  }
};

export const addCourse = async (courseData) => {
  try {
    const coursesCollectionRef = collection(db, "courses"); // Get reference to the "courses" collection
    await addDoc(coursesCollectionRef, courseData); // Add the course document
    console.log("Course added successfully!");
  } catch (error) {
    console.error("Error adding course:", error);
  }
};

export const getCourses = async () => {
  try {
    const coursesCollection = collection(db, "courses"); // ✅ Correctly reference the collection
    const querySnapshot = await getDocs(coursesCollection); // ✅ Get all docs in collection
    return querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export { app, auth, db };