import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({

    email: "",
    password: "",
    username: "",
  });

  const {email, password, username} = inputValue;

  const handleOnChange = (e) => {

    const {name, value} = e.target;

    setInputValue({

      ...inputValue,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      
      let headersList = {
        "Content-Type": "application/json" 
      }
      
      let bodyContent = JSON.stringify({...inputValue});
      
      let reqOptions = {
        url: "http://localhost:5000/Signup",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }
      
      let response = await axios.request(reqOptions);
      console.log(response.data);

      navigate('/');

    } catch (error) {
      
      console.error(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup