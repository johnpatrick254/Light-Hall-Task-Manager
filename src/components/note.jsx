import DeleteIcon from "@mui/icons-material/Delete";
import React, { inputRef, useState } from "react";
import checkicon from "../assets/images/icon-check.svg";
import crossicon from "../assets/images/icon-cross.svg";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDeleteToDoMutation, useUpdateToDoMutation } from "../api/todoslice";
import { DataObjectOutlined } from "@mui/icons-material";

const Note = (props) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState(props.title);
  const [taskDescript, setTaskDescription] = useState(props.description);
  const [taskDate, setTaskDate] = useState(props.dueDate);
  const [status, setSetStatus] = React.useState(props.status);
  const [updateToDo,{isLoading:updating,isSuccess:updatingComplete}] = useUpdateToDoMutation();
  const [deleteToDo,{isLoading:deleting,isSuccess:deletingComplete}] = useDeleteToDoMutation();
  const [animate,setAnimate] = useState(true);


  const handleChange = (event) => {
    setSetStatus(event.target.value);
  };
  return (
    <div className="note">
      {!edit ? (
        <div className={`note-contents ${updating && 'loading-animation'}`}>
          {/* header */}
          <div className="note-title">
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
          </div>
          <div className="note-status">
            <FormControl id="menu-item-form" size="small">
              <InputLabel className="menu-item">Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={status}
                label="Status"
                onChange={handleChange}>
                <MenuItem
                  className="menu-select-demo"
                  value={"Pending"}
                  onClick={() => {
                    updateToDo({
                      id: props.id,
                      data: {
                        status: "Pending",
                      },
                    })
                    setSetStatus("Pending");
                  }}>
                  Pending
                </MenuItem>
                <MenuItem
                  className="menu-select-demo"
                  value={"In Progress"}
                  onClick={() => {
                    updateToDo({
                      id: props.id,
                      data: {
                        status: "In Progress",
                      },
                    });
                    setSetStatus("In Progress");

                  }}>
                  In Progress
                </MenuItem>
                <MenuItem
                  className="menu-select-demo"
                  value={"Completed"}
                  onClick={() => {
                    updateToDo({
                      id: props.id,
                      data: {
                        status: "Completed",
                      },
                    });
                    setSetStatus("Completed");

                  }}>
                  Completed
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* paragraph */}
          <div className="note-paragraph">
            <p
              onClick={(e) => {
                if (props.filters === "All") {
                  setEdit(true);
                }
              }}>
              {props.description}
            </p>
          </div>
          {/* duedate */}
          <div className="note-duedate">
            <p> Due on {props.dueDate}</p>
          </div>
          {/* delete */}

          <div className={`note-delete ${deleting && 'delete-animation'}`}>
            <button
              onClick={() => {
                const taskId= props.id
                console.log(taskId)
                try {
                  const status = deleteToDo(taskId ).unwrap();
                } catch (e) {
                  console.log(e);
                  console.log(status)
                }
              }}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ) : (
        <div className="note-edit">
          <div
            className="note-close"
            onClick={() => {
              setEdit(false);
            }}>
            <img alt="" src={crossicon} />
          </div>
          <div className="note-update-box">
            <Inputfield
              compClass="note-update"
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

                const data = {
                  id: props.id,
                  data: {
                    title: e.target.title.value,
                    description: e.target.description.value,
                    status: props.status,
                    dueDate: e.target.date.value,
                  },
                };
                updateToDo(data);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Note;

// div
//               className="circle"

//               onClick={(e) => {
//                 if (props.status !== "Completed") {
//                   dispatch(
//                     markComplete({
//                       id: props.id,
//                       status: "Completed",
//                     })
//                   );
//                 } else {
//                   dispatch(
//                     markComplete({
//                       id: props.id,
//                       status: "Pending",
//                     })
//                   );
//                 }

//                 if (props.filters === "Pending") {
//                   if (props.status !== "Completed") {
//                     dispatch(
//                       markpendingComplete({
//                         id: props.id,
//                         status: "Completed",
//                       })
//                     );
//                   } else {
//                     dispatch(
//                       markpendingComplete({
//                         id: props.id,
//                         status: "Pending",
//                       })
//                     );
//                   }
//                 } else if (props.filters === "Completed") {
//                   if (props.status !== "Completed") {
//                     dispatch(
//                       markCompletePending({
//                         id: props.id,
//                         status: "Completed",
//                       })
//                     );
//                   } else {
//                     dispatch(
//                       markCompletePending({
//                         id: props.id,
//                         status: "Pending",
//                       })
//                     );
//                   }
//                 } else if (props.filters === "dueDate") {
//                   if (props.status !== "Completed") {
//                     dispatch(
//                       markDueDate({
//                         id: props.id,
//                         status: "Completed",
//                       })
//                     );
//                   } else {
//                     dispatch(
//                       markDueDate({
//                         id: props.id,
//                         status: "Pending",
//                       })
//                     );
//                   }
//                 }
//               }}>
