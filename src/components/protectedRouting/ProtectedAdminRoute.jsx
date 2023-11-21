
import { useNavigate } from "react-router-dom";

//***** protected routing for admin user */
const ProtectedRouteForAdmin = ({ children }) => {
	const navigate = useNavigate();
	const admin = JSON.parse(localStorage.getItem('user'))

	if (admin.user.email === 'choudharydevesh121@gmail.com') {
		return children
	}
	else {
		return navigate('/login')
	}

}
export default ProtectedRouteForAdmin