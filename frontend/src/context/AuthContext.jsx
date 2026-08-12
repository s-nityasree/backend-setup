import { useState } from "react";
import { createContext, useContext } from "react";
import api from "../api/axios"
const AuthContext = createContext(null);//creating a context 

export function AuthProvider({children}){
    const [user, setUser] = useState(()=>{
        const savedUser  = localStorage.getItem("user")
    })


//call post auth/login

async function login(email,password){
    const response = await api.post("auth/login",{email,password});// response.data.data
    console.log(response)
    console.log(response.data)
    const {token, user: loggedInUser} = response.data.data;//JSON ---> string 

    localStorage.setItem("token", token);
    localStorage.setItem("user",JSON.stringify(loggedInUser))
    setUser(loggedInUser);

    return loggedInUser;
}

async function register(name, email, password, role){
    const response = await api.post("/auth/register" ,{
        name,
        email,
        password,
        role
    });
    console.log(response)
    return response.data
}

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
}

const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user
};


return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>//i am providing the context 
}
export function useAuth(){//use it by useAuth()
    return useContext(AuthContext)//if i want to use the context 
}

