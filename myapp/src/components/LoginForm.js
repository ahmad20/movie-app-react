import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BACKEND_URL;
  const [cookie, setCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userExists, setUserExist] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    const jsonPayload = JSON.stringify({ username, password });
    // Send API
    fetch(`${url}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.code === 200) {
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          setCookie("token", data.data, { expires: expirationDate });
          setCookie("username", username);
          setUserExist(true);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        navigate("/login");
      });

    if (!userExists) {
      setAlertStatus(true);
      setAlertMessage("User not found");
      setTimeout(() => {
        setAlertStatus(false);
      }, 1000);
    } else {
      setAlertStatus(false);
    }
    // Reset form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {alertStatus && !userExists && (
        <div className="bg-red-500 text-white py-2 px-4 rounded mb-4 text-center">
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 px-4 py-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
