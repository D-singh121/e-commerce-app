import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/MyContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
import { addDoc, collection, Timestamp } from 'firebase/firestore'; //database related
import { useNavigate } from 'react-router-dom';

function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate()

	const context = useContext(myContext);
	const { loading, setLoading } = context;

	const signup = async () => {
		setLoading(true)
		if (name === "" || email === "" || password === "") {
			return toast.error("All fields are required")
		}

		try {
			const users = await createUserWithEmailAndPassword(auth, email, password);
			// console.log(users)
			//******** ab humara user create ho gya hai firebase auth section me to hum ise firestore DB me store kar denge. store karne ke liye hum ek object model  lenge " user "  */
			const user = {
				name: name,
				uid: users.user.uid,
				email: users.user.email,
				time: Timestamp.now()
			}

			//**** hume database ka ek reference bhi bana rahe hai   */
			//**** yaha pe 'fireDb' database ka name hai aur 'users' collection ka jisme user store honge */
			const userRef = collection(fireDB, "users")
			//**** "addDoc" firebase ka ek method hai ye humare users reference ko collection me store kar dega  */
			await addDoc(userRef, user);
			//*** user Db me save hone ke baad hum input fields ko empty kar denge */
			setName(""),
				setEmail(""),
				setPassword("")
			//**** loading ko bhi false karenge because loading ka kaam humara ho gya hai  */
			setLoading(false);
			toast.success("Signup successful") //**** pop-up notification */
			navigate("/login")
		} catch (error) {
			// console.log(error)
			return error,
				toast.error("signup failed"),
				setLoading(false)
		}
	}

	return (
		<div className=' flex justify-center items-center h-screen'>
			{loading && <Loader />}
			<div className=' bg-gray-800 px-10 py-10 rounded-xl '>
				<div className="">
					<h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
				</div>
				<div>
					<input type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						name='name'
						className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
						placeholder='Name'
					/>
				</div>

				<div>
					<input type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						name='email'
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
						onClick={signup}
						className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
						Signup
					</button>
				</div>
				<div>
					<h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
				</div>
			</div>
		</div>
	)
}

export default Signup