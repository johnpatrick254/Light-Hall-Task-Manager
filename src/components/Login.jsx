import loginService from '../services/login'
import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import "../App.css";
export const Login = () => {
    const [name, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)
    const [tasks, setTasks]=useState(null)
    const [storage,setStorage] = useState(localStorage.getItem('token'))

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            name, password,
          }).then(
            localStorage.setItem("user", name)
          )
          setUser(user) 
          console.log(user,"login.jsx")
          setUsername('')
          setPassword('')
        
        } catch (exception) {
          console.error('Wrong credentials')
          setTimeout(() => {
            console.error(null)
          }, 5000)
        }
    }

    useEffect(()=>{
      if(user||storage){
        console.log("test")
        try {
          navigate("/dashboard")
        } catch (error) {
          console.error(error)
        }
        
      }

     const getTask = async()=>{
      const tasksData = await loginService.fetchData()
      setTasks(tasksData)
     }
  
      getTask()
      }
    ,[user])

   

  return (
    <div className='form' >
      
<div className='account'>
<h1>Login</h1>
<form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={name}
          name="name"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 

</div>

    {console.log(tasks)}     



    </div>
  )
}
