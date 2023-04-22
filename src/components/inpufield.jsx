import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Calender from "./datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  getTasks,
  getall,
  getCompleted,
  getPending,
  deleteCompleted,
  getCompletedTasks,
  getPendingTasks,
  markComplete,
} from "../statecontroller/tasksSlice";

function Inputfield(props) {
  const [zoomIn, setZoom] = useState(false);
  const dispatch = useDispatch();

   const newDate = Date.now()

   const covertedDate = new Date(newDate)

   let defaultDate = covertedDate.toLocaleDateString('en-US')
  const [date,setDate] = useState('')

  return (
    <div className="inputfieldcomponent">
      <form
        className="create-note"
        onSubmit={
          props.onSubmit        
        }>
        <input
          onChange={props.handleTitleEdit}
          className="title"
          name="title"
          value={props.titleValue}
          placeholder="Create New Task"
        />
        <textarea
          onClick={() => setZoom(true)}
          name="description"
          onChange={props.changeContent}
          value={props.contentValue}
          placeholder="Enter Description..."
          rows={zoomIn ? "4" : "1"}
        />
        <p>
          <strong>Set Due Date</strong>
        </p>

        <input onChange={(e)=>{
           setDate(e.target.value)
        }} type = "date" value={date} min ={defaultDate} name ="date"/> 

        <Zoom in={zoomIn && true}>
          <button type="submit">+</button>
        </Zoom>
      </form>
    </div>
  );
}

export default Inputfield;
