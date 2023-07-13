import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_BACKEND_URL;
    // Perform registration logic here
    const jsonPayload = JSON.stringify({
      username,
      password,
      name,
      age: parseInt(age),
    });
    fetch(`${url}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.code === 201) {
          navigate("/login"); 
        } else {
          navigate("/register");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
        navigate("/register");
      });
    // Reset form fields
    setUsername("");
    setPassword("");
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="border border-gray-300 px-4 py-2 rounded w-full"
          autoComplete="off"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-gray-700">
          Age
        </label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={handleAgeChange}
          className="border border-gray-300 px-4 py-2 rounded w-full"
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
