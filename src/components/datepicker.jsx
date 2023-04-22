import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
const today = dayjs();

const Calender = () => {
  const [value, setValue] = useState(today);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={today}
        disablePast
        value={value}
        className="date"
        name="calender"
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default Calender;
