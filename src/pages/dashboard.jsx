
import React, { useEffect, useState } from "react";
import { TodoCard } from "../components/todocard";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { reloadPage } from "../App";

export const Dashboard = () => {
  const navigate = useNavigate();
  const onHandle = () => {
    localStorage.clear();
    navigate("/");
    reloadPage();
  };







  return (
    <div>
      <div className="container">
        <div className="logout">
          <Button onClick={onHandle} variant="contained" size="medium">
            Log Out
          </Button>
        </div>
        <TodoCard user={localStorage.getItem("userEmail")}/>
      </div>
    </div>
  );
};
