import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import './Login.css';

async function loginUser(credentials) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    navigate("/");
  }

  return(
    <div className="login">
      <h1 className='titulo'>Entre com seu Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input className="user" type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input className="pass" type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
        <button onClick="location.href='/pessoa'">Enviar</button>
        <br></br>
        </div>
      </form>
      <img src="logo.png" alt="some text" width="250" height="200" vertical-align="bottom"></img>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};