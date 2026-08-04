import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {

  const {login} = useAuth()
  const navigate = useNavigate();

  const [formData,setFormData]= useState({email: "", password :""});
  const[error,setError]= useState("");
  const[loading,setLoading]=useState(false);

  function handleChange(e){
    setFormData({...formData, [e.target.name]:e.target.value})
    console.log(formData)
  }

  async function handleSubmit(e){
    e.preventDefault();
    setError("");

    if(!formData.email || !formData.password){
      setError("please fill both the fields")
      return;
    }

    setLoading(true);
    try{
      const loggedInUser = await login(formData.email, formData.password)

      if(loggedInUser.role ===  "ADMIN") navigate("/admin")
      else if(loggedInUser.role ===  "STUDENT") navigate("/student")
      else if(loggedInUser.role ===  "FCAULTY") navigate("/faculty")
      else navigate('/')
    }
    catch(err){
      const message = err.response?.data?.message || "login failed. please try again later"
      setError(message);

    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <div>
        <h2>Login</h2>
        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder='enter your email'/>
          </div>

          <div>
            <label>Passowrd</label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder='enter your password'/>
          </div>

          <button type='submit'>{loading? "logging in...": "login"}</button>
          
        </form>

        <p>Don't have an account? <Link to='/register'>Register here</Link></p>
      </div>
    </div>
    
  )
}

export default Login