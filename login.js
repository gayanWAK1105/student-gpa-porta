import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
     apiKey: "AIzaSyCm8w4DIYUux6LfM5tXIm5_ugIBrIWLipw",
  authDomain: "test-4bc36.firebaseapp.com",
  projectId: "test-4bc36",
  storageBucket: "test-4bc36.firebasestorage.app",
  messagingSenderId: "622818653268",
  appId: "1:622818653268:web:1543e3a533154f281869c1",
  measurementId: "G-8RPRBZ8PXQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('loginBtn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // If successful, go to the search page
        window.location.href = "index.html"; 
    } catch (error) {
        document.getElementById('errorMsg').innerText = "Login Failed: " + error.message;
    }
});