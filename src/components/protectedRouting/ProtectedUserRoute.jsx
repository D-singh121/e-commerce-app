
import { useNavigate } from "react-router-dom";
// protected route for users
const ProtectedUserRoute = ({ children }) => {
	const navigate = useNavigate();

	const user = localStorage.getItem("user")
	if (user) {
		return children
	} else {
		return navigate("/login")
	}
}

export default ProtectedUserRoute;