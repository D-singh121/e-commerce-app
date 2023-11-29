import { useEffect, useState } from "react";
import myContext from "./MyContext";
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, getDocs, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";


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
	const [product, setProduct] = useState([]);  //**** initial state of product is empty but we will fetch it from fireDB and store into product array */
	// console.log(product);


	//***** for addinig product the initial state schema */
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
				navigate('/dashboard')
			}, 800);

			getProductData(); //*** jab hum product add kare to turant hume dikhna chahiye  */
			// closeModel() // unknown
			setLoading(false)

		} catch (error) {
			console.log(error);
			setLoading(false)
			toast.error("product added failed")
		}
		setProducts("");// seting input field empty after product addition
	}


	//******************************* Get Product from Database *************************** */

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

				//**** productArray me data aane ke baad usko setProducts ka use karke product empty array me store kar denge  */
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

	//*****************************     Update Product with Admin access     ******************** */
	const editProduct = (item) => {
		setProducts(item) //**** we are updating a single product item */
	}
	const navigate = useNavigate()

	const updateProduct = async () => {
		setLoading(true)
		try {
			await setDoc(doc(fireDB, "products", products.id), products)
			toast.success("Product updated successful")
			setTimeout(() => {
				navigate('/dashboard')
			}, 800);
			getProductData();
			setLoading(false)
			navigate("/dashboard")
		} catch (error) {
			console.log(error);
			setLoading(false)
			toast.error("Product updation failed")
			// return error;
		}
	}

	//******************************* Delete Product from store and database    ******************** */

	const deleteProduct = async (item) => {
		setLoading(true);
		try {
			await deleteDoc(doc(fireDB, "products", item.id))
			toast.success("Product deleted successful")
			getProductData();
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error);
			toast.error("This product can not be deleted")
		}
	}


	//******************************** Getting orderdata for order page   ***********************************/
	const [order, setOrder] = useState([]);
	//----- humara initial order data ek empty aaray rahega fir jab hum firedb se order data layenge to setOrder ki madad se order state me set kar denge 

	/*const getOrderData = async () => {
		setLoading(true)//-- async work me loading true kar dena chahiye;
		try {
			const result = await getDocs(collection(fireDB, "orders")); 
			console.log(result);
			const ordersArray = [];
			result.forEach((doc) => {
				ordersArray.push(doc.data());
				setLoading(false)
			});
			setOrder(ordersArray); // orderArray se order me orderdata bhej rahe hai. 
			// console.log(ordersArray)
			setLoading(false);
		} catch (error) {
			// console.log(error)
			setLoading(false)
		}
	}*/

	const getOrderData = async () => {
		setLoading(true)
		try {
			const result = await getDocs(collection(fireDB, "orders")) // yaha pe " orders" humare order collection ks name hai jo purchase hone ke baad firedb me save ho jata hai ;
			//   console.log(result);
			const ordersArray = [];
			result.forEach((doc) => {
				ordersArray.push(doc.data());
				setLoading(false)
			});
			setOrder(ordersArray);  // orderArray se order me orderdata bhej rahe hai. 
			//   console.log(ordersArray)
			setLoading(false);
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	useEffect(() => {
		// getProductData()
		getOrderData()

	}, []);





	//*************************************** Returning context    ************************ */

	return (
		<myContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, product, addProduct, editProduct, updateProduct, deleteProduct, order }} >
			{children}
		</myContext.Provider>
	)
}

export default MyContextStateProvider