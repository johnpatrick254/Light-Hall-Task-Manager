import axios from "axios";

const token = "1";
console.log(token);
const baseUrl = 'https://light-hall-task-manager-ksjx.vercel.app/'

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorizaton: `Bearer ${localStorage.getItem("token")}`,
};
console.log(headers);
// sign in
const login = async (credentials) => {
  console.log(credentials, "values");
  const response = await axios.post(`${baseUrl}login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Create a new account
const signup = async (credentials) => {
  const response = await axios.post(`${baseUrl}createaccount`, credentials);
  console.log(response);
  return response.data;
};

const fetchTasks = async () => {
  console.log("test");
    await axios({
      method: 'GET',
      url: `${baseUrl}tasks`,
      headers: headers
    })
    .then (response => console.log(response))
    .catch(console.error)
};

export default { login, signup, fetchTasks };
