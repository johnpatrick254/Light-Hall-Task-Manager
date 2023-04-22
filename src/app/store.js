import { configureStore } from "@reduxjs/toolkit";
import Taskreducer from "../statecontroller/tasksSlice";

export default configureStore({
    reducer:{
         tasks: Taskreducer
    }
})