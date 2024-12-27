import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import{getFirestore , setDoc , doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCotsHWQ48x4qkqB6uAv-r4yktuhz5LgPU",
    authDomain: "fir-authentication-ca637.firebaseapp.com",
    projectId: "fir-authentication-ca637",
    databaseURL: "https://fir-authentication-ca637-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "fir-authentication-ca637.appspot.com",
    messagingSenderId: "591229707599",
    appId: "1:591229707599:web:bd9bcc7f98eb87621b913a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const btn = document.getElementById("submit");

btn.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const number = document.getElementById("number").value;


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("creating account");
            const userdata={
                email : email,
                name : username,
                number:number,
            };
            const docref = doc(db , "users",user.uid);
            setDoc(docref , userdata)
            .then(()=>{
                window.location.href = "index.html";
            })
            .catch((error)=>{
                console.log(error.message);
            })
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
})



document.getElementById('show-login').addEventListener('click', function () {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

document.getElementById('show-signup').addEventListener('click', function () {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});


const loginBtn = document.getElementById("login");

loginBtn.addEventListener('click', () => {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPass = document.getElementById("loginPassword").value;
    signInWithEmailAndPassword(auth, loginEmail, loginPass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            window.location.href = "We Code.png";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

})