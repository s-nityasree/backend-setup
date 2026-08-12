import axios from "axios"

//central axios instance so that every api call goes through this same config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
    headers:{
        "Content-Type":"application/json"
    }
})

//attch JWT token (if present) to every request automatically

api.interceptors.request.use((config)=>{
const token = localStorage.getItem("token")
//login token setItem localStorage 
if(token){
    config.headers.Authorization = `Bearer ${token}`;

}
return config;
})

//error handling if token is expired or invaild / log out user
api.interceptors.response.use((response)=> response,
(error)=>{
    if(error.response && error.response.status === 401){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if(window.location.pathname !=="/login"){
            window.location.href = "/login";
        }
    }
    return Promise.reject(error)
});

export default api;