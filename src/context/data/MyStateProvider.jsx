import { useState } from "react";
import myContext from "./MyContext";
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
	const [loading, setLoading] = useState(false);


	return (
		<myContext.Provider value={{ mode, toggleMode ,loading,setLoading }} >
			{children}
		</myContext.Provider>
	)
}

export default MyContextStateProvider