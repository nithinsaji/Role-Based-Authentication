import axios from "axios";

const API_URL = "http://localhost:8080";

const register = (name, email, password) => {
    console.log(name+" "+email + " " + password);
    return axios.post(API_URL + "/register", {
      name,
      email,
      password
    }).then((response)=>
    {
        return response.data
    });
  }

const login = (email, password) => {
    return axios.post(API_URL + '/auth/login', {
        email,
        password
    })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }

            return response.data
        })
}

const AuthService = {
    register,
    login
}

export default AuthService;


