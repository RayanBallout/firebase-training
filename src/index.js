import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

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

// collection ref
const colRef = collection(db, "books")

// get data from collection
getDocs(colRef)
	.then((snapshot) => {
		let books = []
		snapshot.docs.forEach((doc) => {
			books.push({ ...doc.data(), id: doc.id })
		})
		console.log(books)
	})
	.catch((err) => {
		console.log(err.message)
	})
