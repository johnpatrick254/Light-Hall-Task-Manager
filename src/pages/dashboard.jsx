import React, { useEffect, useState } from "react";
import { TodoCard } from "../components/todocard";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { reloadPage } from "../App";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { toDoApi } from "../api/todoslice";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
      <TodoCard user={localStorage.getItem("userEmail")}/>
     );
};
