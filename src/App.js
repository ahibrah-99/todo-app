import React, { useState, useEffect } from 'react';
// useState => returns current state and a function to change it (use it to keep track of changes dynamically)
// https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h

// useEffect => used for saving and loading by (fetching data, local storage, etc)
// https://www.youtube.com/watch?v=0ZJgIjIuY7U

import localforage from 'localforage';  // For saving data locally 'Local Forage must be installed $npm install localforage'

// For styling
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> My ToDo List </h1>
      </header>
    </div>
  );
}

export default App;

/*
<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
*/