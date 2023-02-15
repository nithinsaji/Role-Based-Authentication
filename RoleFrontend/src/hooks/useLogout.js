import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate()
    return (e) => {
        e.preventDefault();
        localStorage.removeItem("user")
        navigate('/login')
    }
}

export default useLogout