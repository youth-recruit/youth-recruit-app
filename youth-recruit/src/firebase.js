import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"


const app = firebase.initializeApp({
    apiKey: "AIzaSyB8Dd07ft7lBhQy7SdY7eLF0M_r80u8hLI",
    authDomain: "youth-recruit-2bb4d.firebaseapp.com",
    databaseURL: "https://youth-recruit-2bb4d-default-rtdb.firebaseio.com",
    projectId: "youth-recruit-2bb4d",
    storageBucket: "youth-recruit-2bb4d.appspot.com",
    messagingSenderId: "669816392746",
    appId: "1:669816392746:web:d1e228368869ebd9350753",
    measurementId: "G-NL7T7JCZWZ"
});

export const auth = app.auth();
export const database = app.firestore();
export default app;