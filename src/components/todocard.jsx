import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
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
import { useNavigate } from "react-router-dom";
import { reloadPage } from "../App";



// import { response } from "express";

export const TodoCard = (props) => {
  const BaseUrl = "http://localhost:3000/api";
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const dueDate = useSelector(dueDateSelector);
  const completedTasks = useSelector(getCompletedTasks);
  const pendingTasks = useSelector(getPendingTasks);
  const [title, setTitle] = useState("");
  const [descript, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [isloaded, setIsLoaded] = useState(false);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const addNewTask = async (event) => {
    const token = "Bearer " + localStorage.getItem("token");
    const baseUrl = `http://localhost:3000/api`;
    const headers = {
      Authorization: `${token}`,
    };

   try{ await axios({
      method: "POST",
      url: baseUrl,
      data: {
        title: title,
        description: descript,
        status: "Pending",
        dueDate: date,
      },
      headers: headers,
    }).then(res=>console.log(res.data))}
    catch(error){ console.log(error)};
  };

  const refreshList = () => {
    setIsLoaded(false);
    fetchTasks();
  };
  const fetchTasks = async () => {
    if(localStorage.getItem("token") === null){
      navigate("/")
    }

    try {
    const token = 'Bearer ' + localStorage.getItem("token") ;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token
    };
    
   const response = await axios.get(BaseUrl, { headers })
      .then(res => 
        res.data
      )
      .catch(error => {
        console.error(error);
      })
      setIsLoaded(true);
       
      if (response.length===0) {
        dispatch(
          setAll([
            {
              title: "Tour the Platform ",
              description:
                "Welcome to Lighthall Task Manager, Click on the circle on the top right corner to mark this complete .",
              status: "Pending",
              dueDate: "2023-04-25",
              user: props.user,
              id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
            },
            {
              title: "Learn How to add a Task ",
              description:
                "Type your task title and then enter decription and due date then click on + icon to save task .",
              status: "Pending",
              dueDate: "2023-04-25",
              user: props.user,
              id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
            },
            {
              title: "Edit a Task ",
              description:
                "Click on this task title to trigger edit mode, finish by hitting the + icon to save.",
              status: "Pending",
              dueDate: "2023-04-25",
              user: props.user,
              id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
            },
          ])
        );
      }else{
        const newState = response;
        dispatch(setAll(newState));
        dispatch(getPending());
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
     localStorage.clear();
      navigate("/");
    reloadPage()

      }, 7000);
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
          titlePlaceHolder="Create A new Task"
          descriptPlaceHolder=" Add description ..."
          titleValue={title}
          handleDate={(e) => {
            setDate(e.target.value);
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
          onSubmit={(e) => {
            const data = {
              title: e.target.title.value,
              description: e.target.description.value,
              status: "Pending",
              dueDate: e.target.date.value,
              userEmail: props.user,
            };
            setTitle("");
            setDescription("");
            e.preventDefault();
            dispatch(addTask(data));
            addNewTask();

            setTimeout(() => {
              refreshList();
            }, 500);
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
                id={task.id}
                title={task.title}
                status={task.status}
                className={"circle"}
                dueDate={task.dueDate}
                description={task.description}
                filters={filter}
                user={task.userEmail}
                 TaskId={task.id}

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
                id={task.id}
                title={task.title}
                status={task.status}
                className={"circle"}
                filters={filter}
                dueDate={task.dueDate}
                description={task.description}
                user={task.userEmail}
              />
            );
          })}
        {filter === "Completed" &&
          completedTasks.map((task, index) => {
            return (
              <Note
                key={index}
                id={task.id}
                title={task.title}
                status={task.status}
                className={"circle"}
                filters={filter}
                dueDate={task.dueDate}
                description={task.description}
                user={task.userEmail}
              />
            );
          })}
        {filter === "dueDate" &&
          dueDate.map((task, index) => {
            return (
              <Note
                key={index}
                id={task.id}
                title={task.title}
                status={task.status}
                className={"circle"}
                filters={filter}
                description={task.description}
                dueDate={task.dueDate}
                user={task.userEmail}
              />
            );
          })}
      </div>
      <Button onClick={refreshList} variant="contained" size="medium">
        Refresh
      </Button>
    </div>
  );
};
