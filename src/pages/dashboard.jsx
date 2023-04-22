import axios from "axios";
import React, {useEffect, useState} from "react";
import { TodoCard } from "../components/todocard";

export const Dashboard = () => {
    const [userTasks, SetUserTasks] = useState(null)
    const [tokenAvailable, SetTokenAvailable] = useState(false)
    const fetchTasks = async () => {
        const token = 'Bearer ' + localStorage.getItem('token')
        console.log(token)
        const baseUrl = 'http://localhost:8000/'
        const headers = { 
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `${token}`
      }
      console.log(headers)
        await axios({
          method: 'GET',
          url: `${baseUrl}tasks`,
          headers: headers
          })
          .then (response => SetUserTasks(response.data))
          .then(console.log(userTasks))
          .catch(console.error)
        }
  useEffect(()=>{
    fetchTasks()
  },[])

  return (
    <div className="container">
      <TodoCard taskData = {userTasks}/>
    </div>
  );
};
