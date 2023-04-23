import axios from "axios";
import React, { useEffect, useState } from "react";
import { TodoCard } from "../components/todocard";
import { useNavigate, Link } from "react-router-dom";
export const Dashboard = () => {
  const [userTasks, SetUserTasks] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();
  const onHandle = () => {
    localStorage.clear();
    navigate("/");
  };

  const fetchTasks = async () => {
    const token = "Bearer " + localStorage.getItem("token");
    console.log(token);
    const baseUrl = "http://localhost:8000/";
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${token}`,
    };
    console.log(headers);
    await axios({
      method: "GET",
      url: `${baseUrl}tasks`,
      headers: headers,
    })
      .then((response) => SetUserTasks(response.data))
      .then(console.log(userTasks))
      .catch(console.error);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="container">
        <button onClick={onHandle}>Log out</button>

        <TodoCard user={user} />
      </div>
    </div>
  );
};
