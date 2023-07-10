import React from 'react';
import CardList from './component/CardList';

const App = () => {
  return (
    <div className="app">
      <header className="navbar">
          <button className="navbar-button">Register</button>
          <button className="navbar-button">Login</button>
      </header>
      <CardList />
    </div>
  );
};

export default App;
