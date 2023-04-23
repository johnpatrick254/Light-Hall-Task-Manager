import { createSlice } from "@reduxjs/toolkit";

export const Tasks = createSlice({
  name: "tasks",
  initialState: {
    value: [
      {
        title: "Hi ",
        description: "Click on Add description to display add task icon",
        status: "Pending",
        dueDate: "2023-04-25",
        user: "Example",
        _id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
      },
      {
        title: "Click on Task Title to Edit Task ",
        description: "Click on the description to show add icon",
        status: "Pending",
        dueDate: "2023-04-25",
        user: "Example",
        _id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
      },
      {
        title: "First task, edit this! ",
        description: "then click on the trash icon to delete",
        status: "Pending",
        dueDate: "2023-04-25",
        user: "Example",
        _id: Math.random() * 2000 * Math.random() + 7000 * Math.random(),
      },
    ],
    pendingTasks: [],
    completedTasks: [],
    dueDate: [],
  },
  reducers: {
    setTask: (state, action) => {
      state.value = action.payload.value;
    },

    addTask: (state, action) => {
      state.value.push(action.payload);
    },
    removeTask: (state, action) => {
      state.value = state.value.filter(
        (task) => task._id !== action.payload.id
      );
    },
    updateTask: (state, action) => {
      state.value.forEach((e) => {
        if (e._id === action.payload.id) {
          state.value[state.value.indexOf(e)] = action.payload.content;
        }
      });
    },
    markComplete: (state, action) => {
      state.value.forEach((e) => {
        if (e._id === action.payload.id) {
          state.value[state.value.indexOf(e)].status = action.payload.status;
        }
      });
    },
    markpendingComplete: (state, action) => {
      state.pendingTasks.forEach((e) => {
        if (e._id === action.payload.id) {
          state.pendingTasks[state.pendingTasks.indexOf(e)].status =
            action.payload.status;
        }
      });
    },
    markCompletePending: (state, action) => {
      state.completedTasks.forEach((e) => {
        if (e._id === action.payload.id) {
          state.completedTasks[state.completedTasks.indexOf(e)].status =
            action.payload.status;
        }
      });
    },
    markDueDate: (state, action) => {
      state.dueDate.forEach((e) => {
        if (e._id === action.payload.id) {
          state.dueDate[state.dueDate.indexOf(e)].status =
            action.payload.status;
        }
      });
    },

    getall: (state) => {
      state.value = state.value;
    },
    getPending: (state) => {
      state.pendingTasks = state.value.filter(
        (task) => task.status === "Pending"
      );
    },
    getDueDate: (state) => {
      state.dueDate = state.value.sort((a, b) => {
        return new Date(`${b.dueDate} GMT`) - new Date(`${a.dueDate} GMT`);
      });
    },
    getCompleted: (state) => {
      state.completedTasks = state.value.filter(
        (task) => task.status === "Completed"
      );
    },
    deleteCompleted: (state) => {
      state.value = state.value.filter((task) => task.status !== "Completed");
    },
    deleteFromPending: (state, action) => {
      state.pendingTasks = state.pendingTasks.filter(
        (task) => task._id !== action.payload.id
      );
    },
    deleteFromCompleted: (state, action) => {
      state.completedTasks = state.completedTasks.filter(
        (task) => task._id !== action.payload.id
      );
    },
    deleteFromdueDate: (state, action) => {
      state.dueDate = state.dueDate.filter(
        (task) => task._id !== action.payload.id
      );
    },
    setAll: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const getTasks = (state) => state.tasks.value;
export const getCompletedTasks = (state) => state.tasks.completedTasks;
export const dueDateSelector = (state) => state.tasks.dueDate;
export const getPendingTasks = (state) => state.tasks.pendingTasks;

export const {
  addTask,
  setTask,
  removeTask,
  updateTask,
  markComplete,
  getall,
  getCompleted,
  getPending,
  deleteCompleted,
  deleteFromCompleted,
  deleteFromPending,
  markCompletePending,
  markpendingComplete,
  getDueDate,
  deleteFromdueDate,
  markDueDate,
  setAll,
} = Tasks.actions;
export default Tasks.reducer;
