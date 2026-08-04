import Navbar from "./components/Navbar"
import {Routes,Route} from 'react-router-dom'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Unauthorized from "./pages/Unauthorized"
import AdminDashboard from "./pages/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import FacultyDashboard from "./pages/FacultyDashboard"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
export default function App(){
  return(
    <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/unauthorized" element={<Unauthorized/>}/>
            <Route path="/admin" element={<ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>}/>
            <Route path="/student" element={<ProtectedRoute>
              <StudentDashboard/>
            </ProtectedRoute>}/>
            <Route path="/faculty" element={<ProtectedRoute>
              <FacultyDashboard/>
            </ProtectedRoute>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
  )
}