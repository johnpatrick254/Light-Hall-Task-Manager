
import React, { useEffect, useState } from "react";
import { TodoCard } from "../components/todocard";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { reloadPage } from "../App";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
  
       <TodoCard user={localStorage.getItem("userEmail")}/> 
    
  
  );
};
