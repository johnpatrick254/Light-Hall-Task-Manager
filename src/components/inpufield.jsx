import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";

function Inputfield(props) {
  const [zoomIn, setZoom] = useState(false);
  const dispatch = useDispatch();

  const newDate = Date.now();

  const covertedDate = new Date(newDate);

  let defaultDate = covertedDate.toLocaleDateString("en-US");

  return (
    <div className={props.compClass}>
      <form className="create-note" onSubmit={props.onSubmit}>
        <input
          onClick={() => setZoom(true)}
          onChange={props.handleTitleEdit}
          className="title"
          required
          name="title"
          value={props.titleValue}
          placeholder={props.titlePlaceHolder}
        />
        <textarea
          required
          onClick={() => setZoom(true)}
          name="description"
          onChange={props.changeContent}
          value={props.contentValue}
          placeholder={props.descriptPlaceHolder}
          rows={zoomIn ? "7" : "4"}
        />

        <div className="duedate">
          <p>Due Date</p>
          <input
            className="date"
            required
            onChange={props.handleDate}
            type="date"
            value={props.date}
            min={defaultDate}
            autoCapitalize="true"
            name="date"
          />
        </div>
        <Zoom in={zoomIn && true}>
          <button type="submit">+</button>
        </Zoom>
      </form>
    </div>
  );
}

export default Inputfield;
