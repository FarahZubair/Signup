// Import necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBeBXNOoNsGgY9oJ63sS-0YdgAfVNM1vM",
  authDomain: "signupform-de0be.firebaseapp.com",
  projectId: "signupform-de0be",
  storageBucket: "signupform-de0be.firebasestorage.app",
  messagingSenderId: "1035710841732",
  appId: "1:1035710841732:web:0e561c1c6e9367b5e493d1",
  measurementId: "G-7CJ3734NYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get references to the form and input elements
const signUpForm = document.getElementById("signUpForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Get authentication instance
const auth = getAuth();

// Handle form submission
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;

  try {
    // Register the user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User signed up:", user);

    // Optionally, you can save the user's additional details like name in Firestore
    // Save the user's name into Firestore if needed (optional)
    // await saveUserName(user.uid, name);

    alert("User signed up successfully!");

    // Optionally, redirect the user to another page
    // window.location.href = "/welcome.html";
  } catch (error) {
    console.error("Error signing up:", error.message);
    alert("Error signing up: " + error.message);
  }
});

// Function to save the user's name to Firestore (optional)
const saveUserName = async (userId, name) => {
  try {
    const db = getFirestore();
    await setDoc(doc(db, "users", userId), {
      name: name
    });
    console.log("User details saved to Firestore!");
  } catch (error) {
    console.error("Error saving user details to Firestore:", error);
  }
};
