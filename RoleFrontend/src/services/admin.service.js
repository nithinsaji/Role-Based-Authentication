import axios from "axios";

const API_URL = "http://localhost:8080";


const userlist = (search, sort, entry, page) => {
    var user = JSON.parse(localStorage.getItem("user"));
         return axios.get(API_URL + `/userlist?search=${search}&sort=${sort}&entry=${entry}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        }).then((res) => {
            return res.data
        })
    }

    const newUserlist = () => {
        var user = JSON.parse(localStorage.getItem("user"));
        return axios.get(API_URL + "/newUserList", {
           headers: {
               'Authorization': `Bearer ${user.accessToken}`
           }
       }).then((res) => {
           return res.data
       })
   }

   const userCount = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    return axios.get(API_URL + "/userCount", {
       headers: {
           'Authorization': `Bearer ${user.accessToken}`
       }
   }).then((res) => {
       return res.data
   })
}

const profile = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    return axios.post(API_URL + "/profile",{"email" : `${user.email}`}, {
       headers: {
           'Authorization': `Bearer ${user.accessToken}`
       }
   }).then((res) => {
       return res.data
   })
}

const updateRole = (id, role) => {
    var user = JSON.parse(localStorage.getItem("user"));
    return axios.put(API_URL+`/userRoles/${id}`,{
        'email' : `${user.email}`,
        'role' : `${role}`
    },
    {headers: {
        'Authorization': `Bearer ${user.accessToken}`
    }}).then((res)=>{
        return res.data
    })
}

const updateProfile = (profile) => {
    var user = JSON.parse(localStorage.getItem("user"));
    return axios.post(API_URL+`/updateUser`,{
        'id' : profile.id,
        'name' : `${profile.name}`,
        'email' : `${profile.email}`
    },
    {headers: {
        'Authorization': `Bearer ${user.accessToken}`
    }}).then((res)=>{
        return res.data
    })
}
const AdminService = {
    userlist,
    newUserlist,
    userCount,
    profile,
    updateRole,
    updateProfile
}

export default AdminService