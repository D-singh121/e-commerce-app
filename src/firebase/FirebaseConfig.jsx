import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
	apiKey: String(import.meta.env.VITE_API_KEY),
	authDomain: String(import.meta.env.VITE_AUTHDOMAIN),
	projectId: String(import.meta.env.VITE_PROJECT_ID),
	storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
	messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
	appId: String(import.meta.env.VITE_APP_ID)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export { fireDB, auth };