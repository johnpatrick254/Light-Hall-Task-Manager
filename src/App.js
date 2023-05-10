import { Dashboard } from "./pages/dashboard";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const reloadPage = () => {
  window.location.reload();
};
function App() {
  const [hideLogin, setHideLogin] = useState(false);

  return (
    
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
  );
}

export default App;
export { reloadPage };
