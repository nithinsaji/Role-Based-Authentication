import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {

    var user = JSON.parse(localStorage.getItem("user"));

    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(false)

    const validate = async () => {
        try {
            const response = await axios.get("http://localhost:8080/validate", {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            }).then((res) => {
                return res.data
            })
            setToken(response)
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user && user.accessToken) {
            validate()
        }else{
            setIsLoading(false)
        }
    }, [user])

    return (

        isLoading
            ? <p>Loading...</p>
            : token && user.roles?.find(role => allowedRoles?.includes(role.name))
                ? <Outlet />
                : <Navigate to="/login" state={{ from: location }} replace />

    );
}

export default RequireAuth;