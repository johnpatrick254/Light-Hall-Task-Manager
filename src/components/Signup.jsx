import loginService from '../services/login'
import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import "../App.css";
export const Signup = () => {
    const [name, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.signup({
            name, password,
          })
          setUser(user)
          setUsername('')
          setPassword('')
          alert('account created')
          navigate('/')
        } catch (exception) {
          console.error('Wrong credentials')
          setTimeout(() => {
            console.error(null)
          }, 5000)
        }
    }
  return (
    <div >Signup

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
      <button type="submit">Sign Up</button>
    </form> 
    {console.log(user)}     
    </div>
  )
}