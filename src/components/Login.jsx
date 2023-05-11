
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [formState, setFormState] = useState("Login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errText, setErrText] = useState("");
  const [tasks, setTasks] = useState(null);
  const [storage, setStorage] = useState(localStorage.getItem("token"));
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const BaseUrl = "http://localhost:3000/api";

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrText("")


    try {
      if (formState === "Login") {
        try {
          await axios({
            method: "post",
            url: `${BaseUrl}/login`,
            data: {
              userEmail: email,
              password: password,
            },
          }).then((res) => {
            if(res.data ==="User is not registered"){
              setErrText(res.data)
              setFormState("Register");
            }else if(res.data==="wrong username or password"){
              setErrText(res.data)

            }else if(res.data.length === 0){
              setErrText(` Internal error:${res.data}`)

            }else{
              localStorage.setItem("token",res.data);
              localStorage.setItem("userEmail",email);
              navigate('/dashboard');
            }
            
          });
        } catch (error) {
              setErrText(error);
          console.log(error);
        }
      } else if (formState === "Register") {
        try {
          await axios({
            method: "post",
            url: `${BaseUrl}/signup`,
            data: {
              userEmail: email,
              password: password,
              firstname: firstName,
              lastname: lastName,
            },
          }).then((res) => {
            console.log(res.data)
            if(res.data ==="User exists"){
              setErrText(`${res.data}, sign in`)
              setFormState("Login");
            }else if(res.data==="Success"){
              setErrText(` User Registered ${res.data}fully`)
              setFormState("Login");
            }
            
          });
        } catch (error) {
              setErrText(error);
          console.log(error);
        }
      }
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Wrong credentials");
      setErrText("Server Error");

      setTimeout(() => {
        console.log(error);
      }, 5000);
    }
  };

  return (
    <div className="form">
      <div className="account">
        <form onSubmit={handleLogin}>
          <div className="error">{errText}</div>
          <div className="loginInput">
            <p>Email</p>
            <TextField
              id="outlined-basic"
              required
              type="email"
              size="small"
              variant="outlined"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {formState === "Register" && (
            <div className="loginInput">
              <p>First Name</p>
              <TextField
                required
                type="text"
                size="small"
                variant="outlined"
                name="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          )}
          {formState === "Register" && (
            <div className="loginInput">
              <p>Last Name</p>
              <TextField
                required
                type="text"
                size="small"
                variant="outlined"
                name="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}

          <div className="passwordInput">
            <p>Password</p>
            <div className="pass-text">
              <TextField
                id="outlined-basic"
                type={showPassword ? "text" : "password"}
                size="small"
                className="loginInput passinput"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                size="small">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <div className="buttons">
            <button
              className="login-button"
              type="submit"
              >
              {formState}
            </button>
            <div>
              <p
                onClick={() => {
              setErrText("")

                  setFormState((prev) => {
                    if (prev === "Login") {
                      return "Register";
                    } else {
                      return "Login";
                    }
                  });
                }}>
                click here to {formState === "Login" ? "register" : "login"}{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
