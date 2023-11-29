// import Container from "../container/Container"

import { useContext, useEffect } from "react"
import myContext from "../../context/data/MyContext"
import Button from "../Button"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/CartSlice"
import { toast } from "react-toastify"

const ProductCard = () => {
	const context = useContext(myContext)
	const { mode, product, searchKey, setSearchKey, filterType, setFilterType, filterPrice, setFilterPrice } = context
	// console.log(product)
	//********* card add functionality using redux toolkit ********/
	const dispatch = useDispatch();

	//***** product cart me add hone ke baad hume ise navbar ke cart number me show karna hai uske liye hum useSelector ki madad se cart me se  no. of products ko fetch karke ek variable (cartItem ) me store kar lenge . */
	const cartItems = useSelector((state) => state.cart)
	// console.log(cartItems)

	//****** here product is a argumemt to store cartdata */
	const addCart = (product) => {
		dispatch(addToCart(product));
		toast.success("Product added to the Store");
	}

	//******** page refresh karne pe items value  cart se jaye na isliye ise hum localstorage me store kar rahe hai cart name se   */
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems));
	}, [cartItems])
	//********* ab hume cart initialstate me bhi upadate karna padega  */

	return (

		<section className="text-gray-600 body-font" style={{
			backgroundColor: mode === 'dark' ? '#282c34' : ''
		}}>
			<div className="container px-5 py-8 md:py-16 mx-auto">
				<div className="lg:w-1/2 w-full mb-6 lg:mb-10">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
					<div className="h-1 w-20 bg-purple-600 rounded"></div>
				</div>

				<div className="flex flex-wrap -m-4">
					{product.filter((obj) => obj.title.toLowerCase().includes(searchKey))
						.filter((obj) => obj.category.toLowerCase().includes(filterType))
						.filter((obj) => obj.price.includes(filterPrice)).map((item, index) => {
							{/* console.log(item) */ }
							const { title, imageUrl, price } = item;
							return (
								<div key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
									<div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
										<div className="flex justify-center cursor-pointer" >
											<img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl} alt={title} />
										</div>
										<div className="p-5 border-t-2">
											<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>D-Commerce</h2>
											<h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
											{/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
											<p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>{price}</p>
											<div className=" flex justify-center">
												<Button
													onClick={() => addCart(item)}
													className="focus:outline-none text-white bg-purple-800 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">
													Add to cart
												</Button>
											</div>
										</div>

									</div>
								</div>
							)
						})}

				</div>

			</div>
		</section >
	)
}

export default ProductCard