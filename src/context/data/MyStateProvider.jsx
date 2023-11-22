import { useEffect, useState } from "react";
import myContext from "./MyContext";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";


//***** yaha pe hamari state rahegi jo hum components me use karne wale hai */
const MyContextStateProvider = ({ children }) => {

	const [mode, setMode] = useState('light');

	const toggleMode = () => {
		if (mode === 'light') {
			setMode('dark')
			document.body.style.backgroundColor = "rbg(17,24,39)"
		} else {
			setMode('light')
			document.body.style.backgroundColor = "white"
		}
	}
	const [loading, setLoading] = useState(false);// for async work .

	//***** for addinig product the initial state */
	const [products, setProducts] = useState({
		title: null,
		price: null,
		imageUrl: null,
		category: null,
		description: null,
		time: Timestamp.now(),
		date: new Date().toLocaleString(
			"en-us",
			{
				year: "numeric",
				month: "short",
				day: "2-digit"
			}
		)
	});

	//********************** Add Product Section ********** */

	const addProduct = async () => {
		if (products.title === null || products.price === null || products.imageUrl === null || products.category === null || products.description === null) {
			return toast.warning("all fields are mendetory")
		}

		setLoading(true)

		try {
			//***** we need a reference for product storage in fireDB  */
			const productRef = collection(fireDB, 'products');
			await addDoc(productRef, products) // products is our data model
			toast.success("Product Added")

			//***** this timeout function will prevent from infinite looping */
			setTimeout(() => {
				window.location.href = '/dashboard'
			}, 800);

			getProductData(); //*** jab hum product add kare to turant hume dikhna chahiye  */
			// closeModel() // unknown
			setLoading(false)

		} catch (error) {
			// console.log(error);
			setLoading(false)
		}
		setProducts("");// seting input field empty after product addition
	}

	const [product, setProduct] = useState([]);
	const getProductData = async () => {

		setLoading(true)
		try {		//*** query -> firebase db  method hai */
			const q = query(
				collection(fireDB, 'products'),
				orderBy('time')
			)
			const data = onSnapshot(q, (QuerySnapshot) => {
				let productArray = [];//*** storing products data  */
				//**** QuerySnapshot ke doc me jo data aaya hai usko foreach loop ki madad se productArray me push kar denge  with id */
				QuerySnapshot.forEach((doc) => {
					productArray.push({ ...doc.data(), id: doc.id });
				});

				//**** productArray me data aane ke baad usko setProduct ka use karke product empty array me store kar denge  */
				setProduct(productArray);
				setLoading(false)
			});
			return () => data

		} catch (error) {
			console.log(error.message);
			setLoading(false)
		}
	}
	useEffect(() => {
		getProductData() //**** page load hote hi products dikhne chahiye uske liye */
	}, [])

	return (
		<myContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, product, addProduct }} >
			{children}
		</myContext.Provider>
	)
}

export default MyContextStateProvider