// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU8qpj_G_Mv0rf_fIxFfInFa8vpOYQPEg",
  authDomain: "testing-platform-90b5b.firebaseapp.com",
  databaseURL: "https://testing-platform-90b5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testing-platform-90b5b",
  storageBucket: "testing-platform-90b5b.appspot.com",
  messagingSenderId: "448443270278",
  appId: "1:448443270278:web:855927fe4e3aad63a4fd07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getDatabase(app);
