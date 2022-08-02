//dependencies
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Create a root reference

const firebaseConfig = {
  apiKey: "AIzaSyAYrs7nFfJ5SsulcQeL9WrM7nVwqPXI_J4",
  authDomain: "sbsc-9d988.firebaseapp.com",
  projectId: "sbsc-9d988",
  storageBucket: "sbsc-9d988.appspot.com",
  messagingSenderId: "261315757355",
  appId: "1:261315757355:web:01cac1bc79bdfb8b0cf16e",
};

//exports

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage();

export { storage };
