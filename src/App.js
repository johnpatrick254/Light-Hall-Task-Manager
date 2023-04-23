import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./components/Signup";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const reloadPage = ()=>{
  window.location.reload()
}
function App() {

  const [hideLogin,setHideLogin] = useState(false)
  
  return (
    // <div className="App">
    //   <h1>Super League - Level 2 - Team 16</h1>
    <div className="App">
     { !hideLogin && <nav className="navigation ">
        <ul className="home logout">

          
            <Link onClick={()=>{setHideLogin(true)}} to="/login">Sign In</Link>
        
          
            <Link to="/signup">Sign Up</Link>
          
        </ul>
      </nav>}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
export {reloadPage}