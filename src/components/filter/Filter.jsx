import myContext from "../../context/data/MyContext"
import { CiSearch } from "react-icons/ci";
import { useContext } from "react"
import Input from "../Input";


const Filter = () => {
	const context = useContext(myContext);
	const { mode, filterPrice, setFilterPrice, searchKey, setSearchKey, filterType, setFilterType, product } = context;



	return (
		<div style={{
			backgroundColor: mode === 'dark' ? '#282c34' : ''
		}} >
			<div className=' container mx-auto px-4 py-5'>
				<div className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
					style={{
						backgroundColor: mode === 'dark' ? '#282c34' : '',
						color: mode === 'dark' ? 'white' : '',
					}}>
					<div className="relative">
						{/* search logo */}
						<div className="absolute flex items-center ml-2 h-full">
							<CiSearch className="w-4 h-4 fill-current text-primary-gray-dark" />

						</div>
						<Input
							type="text"
							value={searchKey}
							onChange={(e) => setSearchKey(e.target.value)}
							name="searchkey"
							id="searchkey"
							placeholder="Search here"
							className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}
						/>

					</div>
					<div className="flex items-center justify-between mt-4">
						<p className="font-medium">
							Filters
						</p>
						<button className="px-4 py-2 bg-gray-50hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" style={{ color: mode === 'dark' ? 'white' : '' }}>
							Reset Filter
						</button>
					</div>
					<div>
						<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
							<select
								className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{
									backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '',
								}}>
								value={filterType}
								onChange={(e) => setFilterType(e.target.value)}
								{product.map((item, index) => {
									return <option key={index} value={item.category}>{item.category}</option>
								})}
							</select>
							{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
							{/* this Select component is for future code purpose */}
							{/* <Select
								options={options}
								label="Choose a value"
								className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}
								value={selectedValue}
								onChange={handleChange}
							/> */}
							{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////*/}



							<select
								className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0  focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
								style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }}>
								value={filterPrice}
								onChange={(e) => setFilterPrice(e.target.value)}
								{product.map((item, index) => {
									return (
										<option key={index} value={item.price}>{item.price}</option>

									)
								})}
							</select>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter