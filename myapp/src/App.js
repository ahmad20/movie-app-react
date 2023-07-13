import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MovieList from "./components/Movie/MovieList";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import UserDetail from "./components/UserDetail";
import SeatPage from "./components/SeatPage";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/me" element={<UserDetail />} />
            <Route path="/movie/:id/choose-seats" element={<SeatPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
