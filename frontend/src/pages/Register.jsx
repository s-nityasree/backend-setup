import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Register = () => {
    const {register} = useAuth()
    const navigate = useNavigate()
    const[formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"STUDENT"
    });
    const[error,setError] = useState("");
    const[success,setSuccess]=useState("");
    const[loading, setLoading]=useState(false);

    function handleChange(e){
        console.log(e);
        console.log(e.target.name)
        console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,//name 
        });
    }

    function validate(){
        if(!formData.name || !formData.email || !formData.password){
            return "All fields are required";
        }
        if(formData.password.length<3){
            return "password must be atleast 3 characters"
        }
    }
    async function handleSubmit(e){
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validate();
        if(validationError){
            setError(validationError);
            return;
        }

        setLoading(true);
        try{
            await register(
                formData.name,
                formData.email,
                formData.password,
                formData.role
            );
            setSuccess("registration successful redirect to login...");
            setTimeout(()=> navigate('/login'), 1200)
        }
        catch(err){
            const message = err.response?.data?.message || "registration failed. please try again later"
            setError(message)
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <div>
        <div>
            <h2>Create Account</h2>
          

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input 
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}//nitya
                        placeholder='enter your name'/>
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter your email'/>
                </div>
                <div>
                    <lable>Password</lable>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='********'/>
                </div>
                <div>
                    <label>Role</label>
                    <select id="role" name="role" value = {formData.role} onChange={handleChange}>
                        <option value="STUDENT">Student</option>
                        <option value="FCAULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button type = "Submit">Register</button>
            </form>

            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    </div>
  )
}

export default Register