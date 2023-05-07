import DeleteIcon from "@mui/icons-material/Delete";
import React, { inputRef, useState } from "react";
import checkicon from "../assets/images/icon-check.svg";
import crossicon from "../assets/images/icon-cross.svg"
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
  const [taskTitle, setTaskTitle] = useState(props.title);
  const [taskDescript, setTaskDescription] = useState(props.description);
  const [taskDate, setTaskDate] = useState(props.dueDate);
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

          
          {/* paragraph */}
          <div className="taskparagarph">
            <p  onClick={(e) => {
                if (props.filters === "All") {
                  setEdit(true);
                }
              }}>{props.description}</p>
          </div>
          {/* delete */}
          <div className="notedelete">
          <div className="dueDate">
            <p> Due on {props.dueDate}</p>
          </div>
          <button
            onClick={() => {
              dispatch(
                removeTask({
                  id: props.id,
                })
              );

              const token = "Bearer " + localStorage.getItem("token");

              const baseUrl = `http://localhost:3000/api/${props.id}`;
              const headers = {
                Authorization: token,
              };
              axios({
                method: "DELETE",
                url: baseUrl,
                headers: headers,
              }).catch((error) => console.log(error));

              if (props.filters === "Pending") {
                dispatch(
                  deleteFromPending({
                    id: props.id,
                  })
                );
                const token = "Bearer " + localStorage.getItem("token");

                const baseUrl = `http://localhost:3000/api/${props.id}`;
                const headers = {
                  Authorization: token,
                };
                axios({
                  method: "DELETE",
                  url: baseUrl,
                  headers: headers,
                }).catch((error) => console.log(error));
              } else if (props.filters === "Completed") {
                dispatch(
                  deleteFromCompleted({
                    id: props.id,
                  })
                );
                const token = "Bearer " + localStorage.getItem("token");

                const baseUrl = `http://localhost:3000/api/${props.id}`;
                const headers = {
                  Authorization: token,
                };
                axios({
                  method: "DELETE",
                  url: baseUrl,
                  headers: headers,
                }).catch((error) => console.log(error));
              } else if (props.filters === "dueDate") {
                dispatch(
                  deleteFromdueDate({
                    id: props.id,
                  })
                );
                const token = "Bearer " + localStorage.getItem("token");

              const baseUrl = `http://localhost:3000/api/${props.id}`;
              const headers = {
                Authorization: token,
              };
              axios({
                method: "DELETE",
                url: baseUrl,
                headers: headers,
              }).catch((error) => console.log(error));
              }
            }}>
            <DeleteIcon />
          </button></div>
          
        </div>
      ) : (
        <div>
          <div style={{margin:"0 auto",backgroundColor:"#ffffffbb"}} className="circle">
          <img
                onClick={()=>{setEdit(false)}}
                alt=""
                src={crossicon}
              />
          </div>
        <Inputfield
          date={taskDate}
          title={props.title}
          titleValue={taskTitle}
          TaskId={props.id}
          handleTitleEdit={(e) => {
            setTaskTitle(e.target.value);
          }}
          handleDate={(e) => {
            setTaskDate(e.target.value);
          }}
          contentValue={taskDescript}
          changeContent={(e) => {
            setTaskDescription(e.target.value);
          }}
          description={props.description}
          onSubmit={async (e) => {
            setEdit(false);
            e.preventDefault();
            const selected = props.TaskId
            console.log(selected)
            const data = {
              id: props.id,
              content: {
                id: props.id,
                title: e.target.title.value,
                description: e.target.description.value,
                status: props.status,
                dueDate: e.target.date.value,
              },
            };
            
            const token = "Bearer " + localStorage.getItem("token");
            const baseUrl = `http://localhost:3000/api/${props.id}`;
            const headers = {
              Authorization: `${token}`,
            };
            const updates = {
              title: e.target.title.value,
              description: e.target.description.value,
              status: "Pending",
              dueDate: e.target.date.value,
              userEmail: props.user,
            };
            dispatch(updateTask(data));
            console.log(baseUrl)
           try{ await axios({
              method: "PUT",
              url: baseUrl,
              data: updates,
              headers: headers,
            }).then(res=>console.log(res.data))}
            catch(error){ console.log(error)};
          }}
          />
          </div>
      )}
    </div>
  );
};
export default Note;






