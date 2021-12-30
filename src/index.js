import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0zFvget0Ip-83GZG0wascEskawS6VSOo",
  authDomain: "fir-9-dojo-fe101.firebaseapp.com",
  projectId: "fir-9-dojo-fe101",
  storageBucket: "fir-9-dojo-fe101.appspot.com",
  messagingSenderId: "1021412665617",
  appId: "1:1021412665617:web:bf403f00a742894c2484b0",
};
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//get collection data

getDocs(colRef)
  .then((snapshot) => {
    //   console.log(snapshot.docs);
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

//adding documents
const addBookform = document.querySelector(".add");
addBookform.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookform.title.value,
    author: addBookform.author.value,
  }).then(() => {
    addBookform.reset();
  });
});

//deleting documents
const deleteBookform = document.querySelector(".delete");
deleteBookform.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookform.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookform.reset();
  });
});
