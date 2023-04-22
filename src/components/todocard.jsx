import React, { useEffect, useRef, useState } from "react";
import moonicon from "../assets/images/icon-moon.svg";
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
import LoadingBar from "./loading";
import SkeleTon from "./skeleteton";
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

  const refreshList = () => {
    setIsLoaded(false);
    fetchTasks();
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get(baseUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setAll(response.data));
      dispatch(getPending());
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  !isloaded && fetchTasks();

  return (
    <div className="body">
      <div className="tasks">
        <div className="tasksheader">
          <h1>My Tasks</h1>
          <img src={moonicon} alt="theme mode img" />
        </div>
        <Inputfield
          title={props.title}
          titleValue={title}
          handleTitleEdit={(e) => {
            setTitle(e.target.value);
            console.log(e.target.value);
          }}
          contentValue={descript}
          changeContent={(e) => {
            console.log(e.target.value);
            setDescription(e.target.value);
          }}
          description={props.description}
          onSubmit={async (e) => {
            const data = {
              title: e.target.title.value,
              description: e.target.description.value,
              status: "pending",
              dueDate: e.target.date.value,
              user: "john",
              _id: (Math.random() * 2000 * Math.random() + 7000 * Math.random()),
            }
            e.preventDefault();
            dispatch(
              addTask(data)
            );
            await axios({
              method: 'POST',
              url: `${baseUrl}tasks`,
              data: {data}
            })
            .catch(console.error)

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
              />
            );
          })}
      </div>
      <button onClick={refreshList}>Refresh</button>
    </div>
  );
};
