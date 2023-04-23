import DeleteIcon from "@mui/icons-material/Delete";
import React, { inputRef, useState } from "react";
import crossIcon from "../assets/images/icon-cross.svg";
import checkicon from "../assets/images/icon-check.svg";
import { useDispatch } from "react-redux";
import {
  removeTask,
  updateTask,
  markComplete,
  markCompletePending,
  markpendingComplete,
  deleteFromCompleted,
  deleteFromPending,
  deleteFromdueDate,
  markDueDate,
} from "../statecontroller/tasksSlice";
import Inputfield from "./inpufield";
import axios from "axios";

const Note = (props) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescript, setTaskDescription] = useState("");
  return (
    <div className="note">
      {!edit ? (
        <div className="contents">
          {/* header */}
          <div className="contentHeader">
            <h1
              id={props.id}
              className="task"
              onClick={(e) => {
                if (props.filters === "All") {
                  setEdit(true);
                }
              }}
              status={props.status}>
              {props.title}
            </h1>

            <div
              className="circle"
              onClick={(e) => {
                if (props.status !== "Completed") {
                  dispatch(
                    markComplete({
                      id: props.id,
                      status: "Completed",
                    })
                  );
                } else {
                  dispatch(
                    markComplete({
                      id: props.id,
                      status: "Pending",
                    })
                  );
                }

                if (props.filters === "Pending") {
                  if (props.status !== "Completed") {
                    dispatch(
                      markpendingComplete({
                        id: props.id,
                        status: "Completed",
                      })
                    );
                  } else {
                    dispatch(
                      markpendingComplete({
                        id: props.id,
                        status: "Pending",
                      })
                    );
                  }
                } else if (props.filters === "Completed") {
                  if (props.status !== "Completed") {
                    dispatch(
                      markCompletePending({
                        id: props.id,
                        status: "Completed",
                      })
                    );
                  } else {
                    dispatch(
                      markCompletePending({
                        id: props.id,
                        status: "Pending",
                      })
                    );
                  }
                } else if (props.filters === "dueDate") {
                  if (props.status !== "Completed") {
                    dispatch(
                      markDueDate({
                        id: props.id,
                        status: "Completed",
                      })
                    );
                  } else {
                    dispatch(
                      markDueDate({
                        id: props.id,
                        status: "Pending",
                      })
                    );
                  }
                }
              }}>
              <img
                className={props.status === "Completed" ? "check" : "uncheck"}
                src={checkicon}
                alt=""
              />
            </div>
          </div>

          <div className="dueDate">
            <p> Due on {props.dueDate}</p>
          </div>
          {/* paragraph */}
          <div className="taskparagarph">
            <p>{props.description}</p>
          </div>
          {/* delete */}
          <button
            onClick={() => {
              dispatch(
                removeTask({
                  id: props.id,
                })
              );
              
              const token = "Bearer " + localStorage.getItem("token");
                
                const baseUrl = `https://backendfortasktracker.herokuapp.com/tasks/${props.id}`;
                console.log(baseUrl);
                const headers = {
                  Authorization: `${token}`,
                };
               axios({
                  method: "DELETE",
                  url: baseUrl,
                  data: {
                    _id: props.id,
                    title: props.title,
                    description: props.description,
                    status: props.status,
                    dueDate: props.dueDate,
                    user: props.user,
                  },
                  headers: headers,
                }).catch((error) => console.log(error));


              
              if (props.filters === "Pending") {
                dispatch(
                  deleteFromPending({
                    id: props.id,
                  })
                );
                const token = "Bearer " + localStorage.getItem("token");
                const baseUrl = `https://backendfortasktracker.herokuapp.com/tasks/${props.id}`;
                console.log(baseUrl);
                const headers = {
                  Authorization: `${token}`,
                };
                axios({
                  method: "DELETE",
                  url: baseUrl,
                  data: {
                    _id: props.id,
                    title: props.title,
                    description: props.description,
                    status: props.status,
                    dueDate: props.dueDate,
                    user: props.user,
                  },
                  headers: headers,
                }).catch((error) => console.log(error));
              } else if (props.filters === "Completed") {
                dispatch(
                  deleteFromCompleted({
                    id: props.id,
                  })
                );
                const token = "Bearer " + localStorage.getItem("token");
                
                const baseUrl = `https://backendfortasktracker.herokuapp.com/tasks/${props.id}`;
                console.log(baseUrl);
                const headers = {
                  Authorization: `${token}`,
                };
               axios({
                  method: "DELETE",
                  url: baseUrl,
                  data: {
                    _id: props.id,
                    title: props.title,
                    description: props.description,
                    status: props.status,
                    dueDate: props.dueDate,
                    user: props.user,
                  },
                  headers: headers,
                }).catch((error) => console.log(error));
              }
            }}>
            <DeleteIcon />
          </button>
        </div>
      ) : (
        <Inputfield
          title={props.title}
          titleValue={taskTitle}
          titlePlaceHolder={props.title}
          descriptPlaceHolder={props.description}
          handleTitleEdit={(e) => {
            setTaskTitle(e.target.value);
            console.log(e.target.value);
          }}
          contentValue={taskDescript}
          changeContent={(e) => {
            console.log(e.target.value);
            setTaskDescription(e.target.value);
          }}
          description={props.description}
          onSubmit={async (e) => {
            setEdit(false);
            e.preventDefault();
            const data = {
              id: props.id,
              content: {
                title: e.target.title.value,
                description: e.target.description.value,
                status: props.status,
                dueDate: e.target.date.value,
              },
            };
            dispatch(updateTask(data));

            const token = "Bearer " + localStorage.getItem("token");
            const baseUrl = `https://backendfortasktracker.herokuapp.com/tasks/${props.id}`;
            const headers = {
              Authorization: `${token}`,
            };

           await axios({
              method: "PUT",
              url: baseUrl,
              data: {
                title: e.target.title.value,
                description: e.target.description.value,
                status: props.status,
                dueDate: e.target.date.value,
                id:props.id
              },
              headers: headers,
            }).catch((error) => console.log(error));
          }}
        />
      )}
    </div>
  );
};
export default Note;
