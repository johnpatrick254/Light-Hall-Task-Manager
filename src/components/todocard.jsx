import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import checkicon from "../assets/images/icon-check.svg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { response } from "express";

export const TodoCard = (props) => {
  const BaseUrl = "https://light-hall-task-manager-ksjx.vercel.app/api";
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
  const [searchState, setSearchState] = useState(true);

  const navigate = useNavigate();

  const addNewTask = async (event) => {
    const token = "Bearer " + localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };

    try {
      await axios({
        method: "POST",
        url: BaseUrl,
        data: {
          title: title,
          description: descript,
          status: "Pending",
          dueDate: date,
        },
        headers: headers,
      }).then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const refreshList = () => {
    setIsLoaded(false);
    fetchTasks();
  };
  const fetchTasks = async () => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }

    try {
      const token = "Bearer " + localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      };

      const response = await axios
        .get(BaseUrl, { headers })
        .then((res) => console.log(res.data))
        .catch((error) => {
        
          console.error(error);
        });
      setIsLoaded(true);
       console.log(response)
      if (response.length === 0) {
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
      } else {
        const newState = response;
        dispatch(setAll(newState));
        dispatch(getPending());
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        localStorage.clear();
        navigate("/");
        reloadPage();
      }, 7000);
    }
  };
  !isloaded && fetchTasks();
  const onHandle = () => {
    localStorage.clear();
    navigate("/");
    // reloadPage();
  };
  return (
    <div className="container">
      {/*--------HEADER-------- */}
      <div className="content">
        <section className="header">
          <div className="header-welcome">
            <h1> My Tasks</h1>
          </div>
          <div className="header-logout">
            <button onClick={onHandle} variant="contained" size="medium" color="black">
              <p>Log Out</p>
            </button>
          </div>
          <div className="header-addtask">
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
          </div>
          <div className="header-filter">
            <div className="search-bar">
              <Paper
                component="form"

                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  onClick={() => {
                    setSearchState(!searchState);
                  }}
                  className="search-bar-filter"
                  placeholder="Search by title"
                  inputProps={{ "aria-label": "search by title" }}
                />
                {searchState ? <SearchIcon /> : <CloseIcon />}
              </Paper>
            </div>
            <div className="search-filter">
              <div>
                <p>Sort by Due Date</p>
              </div>
            </div>
            <div className="refresh">
              <button className="refresh-button" onClick={refreshList} >
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/*--------BODY-------- */}

        <section className="main">
          <div className="tasklist">
            <div className="all-tasks">
              <div>
                <h1>My Tasks</h1>
              </div>
              {isloaded ? (
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
            </div>
            <div className="pending-tasks">
              <div>
                <h1>Pending Tasks</h1>
              </div>
              {isloaded ? (
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
                })
              ) : (
                <SkeleTon />
              )}
            </div>
            <div className="completed-tasks">
              <div>
                <h1>Completed Tasks</h1>
              </div>
              {isloaded ? (
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
                })
              ) : (
                <SkeleTon />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

{
  /* <p
onClick={() => {
  dispatch(getDueDate());
  setFilter("dueDate");
}}
className="task_status">
Due Date
</p> */
}
