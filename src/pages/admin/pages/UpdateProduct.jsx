import { useContext } from 'react'
import myContext from '../../../context/data/MyContext'
// import { useNavigate } from 'react-router-dom';


function UpdateProduct() {
	// const navigate = useNavigate();
	const context = useContext(myContext)
	const { products, setProducts, updateProduct } = context;

	return (

		<div className=' flex justify-center items-center max-h-screen my-5'>
			<div className=' bg-gray-800 px-7 py-5 rounded-xl '>
				<div className="">
					<h1 className='text-center text-white text-xl mb-4 font-bold'>Update Product</h1>
				</div>
				<div>
					<input
						value={products.title}
						onChange={(e) => setProducts({ ...products, title: e.target.value })}
						type="text"
						name='title'
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Product title'
					/>
				</div>
				<div>
					<input type="text"
						value={products.price}
						onChange={(e) => setProducts({ ...products, price: e.target.value })}
						name='price'
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Product price'
					/>
				</div>

				<div>
					<input type="text"
						value={products.imageUrl}
						onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
						name='imageurl'
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Product imageUrl'
					/>
				</div>
				<div>
					<input type="text"
						value={products.category}
						onChange={(e) => setProducts({ ...products, category: e.target.value })}
						name='category'
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Product category'
					/>
				</div>
				<div>
					<textarea cols="15" rows="5" name='title'
						value={products.description}
						onChange={(e) => setProducts({ ...products, description: e.target.value })}
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Product desc'>

					</textarea>
				</div>
				<div className=' flex justify-center mb-3'>
					<button onClick={updateProduct}
						className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
						Update Product
					</button>
				</div>

			</div>
		</div>

	)
}

export default UpdateProduct