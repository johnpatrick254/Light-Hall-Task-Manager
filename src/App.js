import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
const reloadPage = () => {
  window.location.reload();
};
function App() {
  const [hideLogin, setHideLogin] = useState(false);

  return (

    <div className="App">
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
      </Routes>

      <Analytics />
    </div>
  );
}

export default App;
export { reloadPage };
