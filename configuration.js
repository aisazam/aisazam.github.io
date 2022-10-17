// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAuihZYjMgVmgagTqptAqzxmY1VBTPCVKs",
  authDomain: "newgraphicsadmin.firebaseapp.com",
  projectId: "newgraphicsadmin",
  storageBucket: "newgraphicsadmin.appspot.com",
  messagingSenderId: "538279167843",
  appId: "1:538279167843:web:a6b72a06f47b435da07556"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


