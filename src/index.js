import { initializeApp } from "firebase/app"
import {
	getFirestore,
	collection,
	onSnapshot,
	addDoc,
	deleteDoc,
	doc,
	query,
	where,
	getDoc,
	updateDoc,
} from "firebase/firestore"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyCiZX7NKn7p5zz8VNVbjqWDudaJymsf-Og",
	authDomain: "fir-9-training-903d7.firebaseapp.com",
	projectId: "fir-9-training-903d7",
	storageBucket: "fir-9-training-903d7.appspot.com",
	messagingSenderId: "841615203332",
	appId: "1:841615203332:web:45686fc6852647b7552951",
}

// init app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

// collection ref
const colRef = collection(db, "books")

//queries
const q = query(colRef, where("author", "==", "R.L Stein"))

// realtinme data from collection
onSnapshot(q, (snapshot) => {
	let books = []
	snapshot.docs.forEach((doc) => {
		books.push({ ...doc.data(), id: doc.id })
	})
	console.log(books)
})
// adding documents
const addBookForm = document.querySelector(".add")
addBookForm.addEventListener("submit", (e) => {
	e.preventDefault()

	addDoc(colRef, {
		title: addBookForm.title.value,
		author: addBookForm.author.value,
	}).then(() => {
		addBookForm.reset()
	})
})

// deleting documents
const deleteBookForm = document.querySelector(".delete")
deleteBookForm.addEventListener("submit", (e) => {
	e.preventDefault()

	const docRef = doc(db, "books", deleteBookForm.id.value)
	deleteDoc(docRef).then(() => {
		deleteBookForm.reset()
	})
})

// get a single document
const docRef = doc(db, "books", "QRmn1dPUd5KZk6uEfax3")

onSnapshot(docRef, (doc) => {
	console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector(".update")
updateForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const docRef = doc(db, "books", updateForm.id.value)

	updateDoc(docRef, {
		title: "updated title",
	}).then(() => {
		updateForm.reset()
	})
})

// signing users up
const signupForm = document.querySelector(".signup")
signupForm.addEventListener("submit", (e) => {
	e.preventDefault()

	const email = signupForm.email.value
	const password = signupForm.password.value

	createUserWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			console.log("user created", cred.user)
			signupForm.reset()
		})
		.catch((err) => {
			console.log(err.message)
		})
})
