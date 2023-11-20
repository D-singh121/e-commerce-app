import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
	apiKey: "AIzaSyCOEd0P4tvGpYgWE_i8BzWPrToV8hY6QW8",
	authDomain: "e-commerce-website-d10ba.firebaseapp.com",
	projectId: "e-commerce-website-d10ba",
	storageBucket: "e-commerce-website-d10ba.appspot.com",
	messagingSenderId: "944198687723",
	appId: "1:944198687723:web:251ddb9ae670a6fc3e17ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export { fireDB, auth };