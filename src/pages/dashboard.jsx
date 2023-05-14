import React, { useEffect, useState } from "react";
import { TodoCard } from "../components/todocard";
import { useNavigate, Link } from "react-router-dom";


export const Dashboard = () => {
  const navigate = useNavigate();
  const time = localStorage.getItem("time")
  const expiry = time + 3600
  const currentTime = Date.now()

  if(currentTime>expiry){
    navigate('/')
    localStorage.clear("time")
    localStorage.clear("token")
  }
  return (
      <TodoCard user={localStorage.getItem("userEmail")}/>
     );
};
