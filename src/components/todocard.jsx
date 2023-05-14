import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Inputfield from "./inpufield";
import Note from ".//note";
import SkeleTon from "./skeleteton";
import { useNavigate } from "react-router-dom";
import {
  toDoApi,
  useAddToDoMutation,
  useDeleteToDoMutation,
  useFetchAllToDosQuery,
  useFetchOneToDoQuery,
  useUpdateToDoMutation,
} from "../api/todoslice";


export const TodoCard = (props) => {
  const BaseUrl = "https://light-hall-task-manager-ksjx.vercel.app/api";
  const [title, setTitle] = useState("");
  const [descript, setDescription] = useState("");
  const [filter, setFilter] = useState("All");
  const [isloaded, setIsLoaded] = useState(false);
  const [date, setDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const {
    data: tasks,
    refetch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchAllToDosQuery();
  const [addToDo,{isLoading:adding}] = useAddToDoMutation();

  const refreshList = () => {
    setIsLoaded(false);
   refetch();
  };
  
  if (!isloaded) {
    tasks && setIsLoaded(true);
  }

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
            <h1>My Tasks</h1>
          </div>
          <div className="header-logout">
            <button
              onClick={onHandle}
              variant="contained"
              size="medium"
              color="black">
              <p>Log Out</p>
            </button>
          </div>
          <div className="header-addtask">
            <Inputfield
              compClass="inputfieldcomponent"
              titlePlaceHolder="Create A new Task"
              descriptPlaceHolder=" Add description ..."
              titleValue={title}
              handleDate={(e) => {
                setDate(e.target.value);
              }}
              addClass={adding && "add-animation"}
              date={date}
              handleTitleEdit={(e) => {
                setTitle(e.target.value);
              }}
              contentValue={descript}
              changeContent={(e) => {
                setDescription(e.target.value);
              }}
              description={props.description}
              onSubmit={async (e) => {
                const data = {
                  title: e.target.title.value,
                  description: e.target.description.value,
                  status: "Pending",
                  dueDate: e.target.date.value,
                };
                setTitle("");
                setDescription("");
                e.preventDefault();

                try {
                  const status = await addToDo(data).unwrap();
                  refetch()
                  console.log(status);
                } catch (error) {
                  console.log(error);
                }

                setTimeout(() => {
                  // refreshList();
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
                    const data = tasks.filter((task) => {
                      return task.title.toLowerCase().includes(searchQuery);
                    });
                    setSearchData(data);
                  }}
                  className="search-bar-filter"
                  placeholder="Search by title"
                  onChange={(e) => {
                    setSearchState(false);

                    setSearchQuery(e.target.value);

                    const data = tasks.filter((task) => {
                      return task.title.toLowerCase().includes(e.target.value);
                    });
                    setSearchData(data);
                  }}
                  value={searchQuery}
                  inputProps={{ "aria-label": "search by title" }}
                />
                {searchState ? (
                  <SearchIcon
                    onClick={() => {
                      setSearchState(!searchState);
                    }}
                  />
                ) : (
                  <CloseIcon
                    onClick={() => {
                      setSearchState(!searchState);
                      setSearchData([]);
                    }}
                  />
                )}
              </Paper>
            </div>
   
            <div className="refresh">
              <button
                onClick={() => {
                  refreshList();
                }}
                className="refresh-button">
                Refresh
              </button>
            </div>
          </div>
        </section>

        {/*--------BODY-------- */}

        <section className="main">
          {searchState ? (
            <div className="tasklist">
              <div className="all-tasks">
                <div>
                  <h1>My Tasks</h1>
                </div>
                {isloaded ? (
                  tasks &&
                  tasks.map((task, index) => {
                    if (task.status === "Pending") {
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
                    }
                  })
                ) : (
                  <SkeleTon />
                )}
              </div>
              <div className="pending-tasks">
                <div>
                  <h1> Tasks In Progress</h1>
                </div>
                {isloaded ? (
                  tasks &&
                  tasks.map((task, index) => {
                    if (task.status === "In Progress") {
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
                    }
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
                  tasks &&
                  tasks.map((task, index) => {
                    if (task.status === "Completed") {
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
                    }
                  })
                ) : (
                  <SkeleTon />
                )}
              </div>
            </div>
          ) : (
            <div className="search-results">
              {searchData.map((task, index) => {
                return (
                  <Note
                    key={index}
                    id={task.id}
                    title={task.title}
                    status={task.status}
                    filters={filter}
                    dueDate={task.dueDate}
                    description={task.description}
                    user={task.userEmail}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

