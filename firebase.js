import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh2ZfUN_TKRwWomoTVnvsoyTXLsDlZfwI",
  authDomain: "login-app-d0655.firebaseapp.com",
  projectId: "login-app-d0655",
  storageBucket: "login-app-d0655.appspot.com",
  messagingSenderId: "244221948375",
  appId: "1:244221948375:web:54352aa7fcbb3e2680db92",
};

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// const db = firbaseApp.firestore();

// export { auth, db };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();

const auth = firebase.auth();

export { db, auth };
