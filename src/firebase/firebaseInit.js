import firebase from "firebase/app";
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAq9dnOmwa5W_8DdsyWnOSvlzhUIJoR1Q8",
    authDomain: "timezone-bbfde.firebaseapp.com",
    projectId: "timezone-bbfde",
    storageBucket: "timezone-bbfde.appspot.com",
    messagingSenderId: "984914941777",
    appId: "1:984914941777:web:934874944c14bf82d96570"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()