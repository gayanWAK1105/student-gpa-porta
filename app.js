import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Check if logged in
onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "login.html";
});

document.getElementById('searchBtn').addEventListener('click', async () => {
    // Get the input and replace "/" with "_" to match your Document IDs in the image
    let inputNumber = document.getElementById('studentNumInput').value.trim();
    
    // If users type EC/2022/002, this converts it to EC_2022_002 to match your screenshot
    const formattedId = inputNumber.replace(/\//g, "_");

    const resultDiv = document.getElementById('resultDisplay');
    resultDiv.innerHTML = "Fetching record...";

    try {
        // Direct lookup: Collection 'student' -> Document ID (e.g., 'EC_2022_002')
        const docRef = doc(db, "student", formattedId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            resultDiv.innerHTML = `
                <div style="border: 2px solid #007bff; padding: 15px; border-radius: 10px; background: #fff;">
                    <h3 style="margin-top: 0;">Student Record</h3>
                    <p><strong>ID:</strong> ${formattedId}</p>
                    <p style="font-size: 28px; color: #007bff;"><strong>GPA: ${data.GPA}</strong></p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color:red;">No record found for ID: ${formattedId}</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = "<p style='color:red;'>Error loading data. Check console.</p>";
    }
});