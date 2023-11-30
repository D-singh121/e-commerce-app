import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/data/MyContext';
import { useContext } from 'react';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate()

	const context = useContext(myContext)
	const { mode, loading, setLoading } = context

	const login = async () => {
		setLoading(true)
		try {
			const result = await signInWithEmailAndPassword(auth, email, password)
			// console.log(result)
			localStorage.setItem('user', JSON.stringify(result));

			toast.success("Login success")

			navigate("/")

		} catch (error) {
			console.log(error)
			toast.error("Login failed")
			setLoading(false)
			navigate("/signup")
		}
	}




	return (
		<div className=' flex justify-center items-center h-screen' style={{ backgroundColor: mode === 'dark' ? '#333334' : '', color: mode === 'dark' ? 'white' : '', }}>
			{loading && <Loader />}
			<div className=' bg-gray-800 px-10 py-10 pt-7 rounded-xl '>
				<div className="">
					<h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
				</div>
				<div>
					<input type="email"
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Email'
					/>
				</div>
				<div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Password'
					/>
				</div>
				<div className=' flex justify-center mb-3'>
					<button
						onClick={login}
						className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
						Login
					</button>
				</div>
				<div>
					<h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
				</div>
			</div>
		</div>
	)
}

export default Login