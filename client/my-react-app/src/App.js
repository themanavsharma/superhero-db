

// App.js
import React from 'react';
import './App.css';
import SearchContainer from './components/SearchContainer/SearchContainer';
import CustomLists from './components/CustomLists';
import LoginForm from './components/LoginForm/LoginForm.js';

const App = () => {
  return (
    <div>
      <h1>SuperheroDB</h1>

      <LoginForm/>
      <SearchContainer/>
 
  

  
    </div>
  );
};

export default App;