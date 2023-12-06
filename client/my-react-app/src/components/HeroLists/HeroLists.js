// HeroLists.js
import React, { useState, useEffect } from 'react';
import './HeroLists.css';
import HeroListItem from './HeroListItem';

const HeroLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch superhero lists from the backend
    fetch('http://localhost:8080/api/lists')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data from the server:', data);
        if (Array.isArray(data)) {
          setLists(data);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching superhero lists:', error));
  }, []);

  return (
    <div className="container" id="hero-lists-container">
      <h2>Hero Lists</h2>
      <div className="flex-container" id="superheroes-lists">
        {lists.map((list) => (
          <HeroListItem key={list.listName} list={list} />
        ))}
      </div>
    </div>
  );
};

export default HeroLists;
