import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAXDU2_c3hNSQ_-i7aO1KAskwKmFT6JFOI",
    authDomain: "cooking-site-e824b.firebaseapp.com",
    projectId: "cooking-site-e824b",
    storageBucket: "cooking-site-e824b.appspot.com",
    messagingSenderId: "244203314674",
    appId: "1:244203314674:web:a71717b15a8a40257d9f6b"
  }

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()

export { projectFirestore }