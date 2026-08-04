import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Home = () => {
    const {isAuthenticated,user} = useAuth();
  return (
    <div>
        <div>
            <h1>Student event Management System</h1>
            {isAuthenticated ? (
                <p>
                    Welcome back, <strong>{user.name}</strong>({user.role}). Use the navigation bar to do Dashboard
                </p>
            ): (
                <>
                    <p>Admins create events, students register for events, and faculty view the partication report</p>
                    <p>
                        <Link to = "/login">Login</Link>
                        <Link to="/register">create an account</Link>
                    </p>
                </>
            )}
        </div>
    </div>
  )
}

export default Home