

// App.js
import React from 'react';
import './App.css';
import SearchContainer from './components/SearchContainer/SearchContainer';
import CustomLists from './components/CustomLists/CustomLists';
import LoginForm from './components/LoginForm/LoginForm.js';
import HeroLists from './components/HeroLists/HeroLists'

const App = () => {
  return (
    <div>
      <h1>SuperheroDB</h1>

      <LoginForm/>
      <SearchContainer/>
      <HeroLists/>
      <CustomLists />
  
    </div>
  );
};

export default App;
