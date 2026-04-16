import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    //add config
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
