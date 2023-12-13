import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAbx9CIWKTT5wolo6FHykfrcdlhyo3XCFU",
    authDomain: "todo-cf592.firebaseapp.com",
    projectId: "todo-cf592",
    storageBucket: "todo-cf592.appspot.com",
    messagingSenderId: "616512550022",
    appId: "1:616512550022:web:3b8f9aaee80006029e8d07"
};

// Initialize Firebase
let firebase_app = initializeApp(firebaseConfig);

export default firebase_app;
