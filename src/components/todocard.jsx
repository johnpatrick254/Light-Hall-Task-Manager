import React, { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import checkicon from "../assets/images/icon-check.svg";
import {
  addTask,
  getTasks,
  getall,
  getCompleted,
  getPending,
  deleteCompleted,
  getCompletedTasks,
  getPendingTasks,
  getDueDate,
  dueDateSelector,
  setAll,
} from "../statecontroller/tasksSlice";
import Inputfield from "./inpufield";
import Note from ".//note";
import axios from "axios";
import SkeleTon from "./skeleteton";
import { Navigate, useNavigate } from "react-router-dom";
const baseUrl = "https://backendfortasktracker.herokuapp.com/";

// import { response } from "express";

export const TodoCard = (props, { taskData }) => {
  console.log(taskData);
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const dueDate = useSelector(dueDateSelector);
  const completedTasks = useSelector(getCompletedTasks);
  const pendingTasks = useSelector(getPendingTasks);
  const [title, setTitle] = useState("");
  const [descript, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [isloaded, setIsLoaded] = useState(false);
  const [date,setDate] = useState('')
  
 const navigate =useNavigate()
  const newTask = {
    title: title,
    description: descript,
    status: "Pending",
    dueDate: date,
    user: props.user,
    // id: `${Math.random() * 2000 * Math.random() + 7000 * Math.random()}`,
  }

  const addNewTask = async (event) => {
    
    const token = "Bearer " + localStorage.getItem("token");
    console.log(token);
    const addbaseUrl = 'https://backendfortasktracker.herokuapp.com/tasks';
    const headers = { 
        // 'Content-Type' : 'application/json',
        // 'Accept' : 'application/json',
        'Authorization' : `${token}`
      }
    console.log(headers);
    try  {
      await axios({
      method: "post",
      url: addbaseUrl,
      data: newTask,
      headers: headers,
    }).then((res) => console.log(res));
    } catch (error){}
   
  }

  const refreshList = () => {
    setIsLoaded(false);
    fetchTasks();
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get(baseUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setIsLoaded(true);

      if(response.data.length !== 0){
       
        const newState = response.data.filter(task => task.user == props.user)
        console.log(newState)
        dispatch(setAll(newState));
         dispatch(getPending());
      } 
    } catch (error) {
      console.log(error);
      dispatch(setAll([{
        title: "Error ",
        description: "No Tasks found, your account is not Registered, Sign up first then Login. You will be redirected to the Sign up page...",
        status: "Pending",
        dueDate: "2023-04-25",
        user: props.user,
        _id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
      }]))
      setIsLoaded(true)
      setTimeout(()=>{
        navigate('/')
      },7000)
    }
  };
  !isloaded && fetchTasks();

  return (
    <div className="body">
      <div className="tasks">
        <div className="tasksheader">
          <h1> Welcome {props.user}, Manage Your Tasks</h1>
        </div>
        <Inputfield
          title={props.title}
          titlePlaceHolder="Create A new Task"
          descriptPlaceHolder=" Add description ..."
          titleValue={title}
          handleDate= {(e)=>{
            setDate(e.target.value)
         }}
         date={date}
          handleTitleEdit={(e) => {
            setTitle(e.target.value);
          }}
          contentValue={descript}
          changeContent={(e) => {
            setDescription(e.target.value);
          }}
          description={props.description}
          onSubmit={ (e) => {
            const data = {
              title: e.target.title.value,
              description: e.target.description.value,
              status: "Pending",
              dueDate: e.target.date.value,
              user: props.user,
              _id: `${Math.random() * 2000 * Math.random() + 7000 * Math.random()}`,
            };
            setTitle("");
            setDescription("");
            e.preventDefault();
            dispatch(addTask(data));
           addNewTask()

           setTimeout(()=>{
            refreshList()
           },500)

            
          }}
        />

        <div className="alltaskscontainer">
          <footer className="taskscontrols">
            <p>{tasks.length} Tasks</p>
            <div className="statuscard">
              <p
                onClick={() => {
                  dispatch(getall());
                  setFilter("All");
                }}
                className="task_status">
                All
              </p>
              <p
                onClick={() => {
                  dispatch(getPending());
                  setFilter("Pending");
                }}
                className="task_status">
                Pending
              </p>
              <p
                onClick={() => {
                  dispatch(getDueDate());
                  setFilter("dueDate");
                }}
                className="task_status">
                Due Date
              </p>
              <p
                onClick={() => {
                  dispatch(getCompleted());
                  setFilter("Completed");
                }}
                className="task_status">
                Completed
              </p>
            </div>

            <p
              onClick={() => {
                console.log("clearing all");
                dispatch(deleteCompleted());
                setFilter("All");
              }}
              className="task_status">
              Clear Completed
            </p>
          </footer>
        </div>
      </div>
      <div className="tasklist">
        {isloaded ? (
          filter === "All" &&
          tasks.map((task, index) => {
            return (
              <Note
                key={index}
                id={task._id}
                title={task.title}
                status={task.status}
                className={"circle"}
                dueDate={task.dueDate}
                description={task.description}
                filters={filter}
                user={task.user}
              />
            );
          })
        ) : (
          <SkeleTon />
        )}
        {filter === "Pending" &&
          pendingTasks.map((task, index) => {
            return (
              <Note
                key={index}
                id={task._id}
                title={task.title}
                status={task.status}
                className={"circle"}
                filters={filter}
                dueDate={task.dueDate}
                description={task.description}
                user={task.user}
              />
            );
          })}
        {filter === "Completed" &&
          completedTasks.map((task, index) => {
            return (
              <Note
                key={index}
                id={task._id}
                title={task.title}
                status={task.status}
                className={"circle"}
                filters={filter}
                dueDate={task.dueDate}
                description={task.description}
                user={task.user}
              />
            );
          })}
        {filter === "dueDate" &&
          dueDate.map((task, index) => {
            return (
              <Note
                key={index}
                id={task._id}
                title={task.title}
                status={task.status}
                className={"circle"}
                filters={filter}
                description={task.description}
                dueDate={task.dueDate}
                user={task.user}
              />
            );
          })}
      </div>
      <Button onClick={refreshList} variant="contained" size ="medium">Refresh</Button>

  
    </div>
  );
};
