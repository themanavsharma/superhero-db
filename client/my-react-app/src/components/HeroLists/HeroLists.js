// HeroLists.js
import React, { useState, useEffect } from 'react';
import './HeroLists.css';
import HeroListItem from './HeroListItem';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

const HeroLists = () => {
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        let nickname = null;

        if (user) {
          // User is logged in, retrieve the nickname
          const email = user.email;
          const nicknameResponse = await fetch(`http://localhost:8080/api/nickname/${email}`);

          if (nicknameResponse.ok) {
            const nicknameData = await nicknameResponse.json();
            nickname = nicknameData.nickname;
          } else {
            console.error('Error fetching nickname:', nicknameResponse.statusText);
          }
        }

        // Fetch superhero lists from the backend
        const endpoint = nickname
          ? `http://localhost:8080/api/secure/lists?nickname=${nickname}`
          : 'http://localhost:8080/api/lists';

        const response = await fetch(endpoint);

        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error('Error fetching superhero lists:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLists();
  }, [user]);

  return (
    <div className="container" id="hero-lists-container">
      <h2>Public Hero Lists</h2>
      <div className="flex-container" id="superheroes-lists">
        {lists.map((list) => (
          <HeroListItem key={list.listName} list={list} />
        ))}
      </div>
    </div>
  );
};

export default HeroLists;
