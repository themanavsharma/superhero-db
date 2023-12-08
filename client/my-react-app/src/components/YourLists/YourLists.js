// YourLists.js
import React, { useState, useEffect } from 'react';
import YourListItem from './YourListItem';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

const YourLists = () => {
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
        if (!user) {
          // User is not logged in, do nothing
          return;
        }

        // User is logged in, retrieve the nickname
        const email = user.email;
        const nicknameResponse = await fetch(`http://localhost:8080/api/nickname/${email}`);

        if (!nicknameResponse.ok) {
          console.error('Error fetching nickname:', nicknameResponse.statusText);
          return;
        }

        const nicknameData = await nicknameResponse.json();
        const nickname = nicknameData.nickname;

        // Fetch superhero lists from the backend
        const response = await fetch(`http://localhost:8080/api/secure/yourlists?nickname=${nickname}`);

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
  
    // Check if user is authenticated
    if (!user) {
      // If not authenticated, render nothing
      return null;
    }

  return (
    <div className="container" id="hero-lists-container">

        <>
          <h2>Your Hero Lists</h2>
          <div className="flex-container" id="superheroes-lists">
            {lists.map((list) => (
              <YourListItem key={list.listName} list={list} />
            ))}
          </div>
        </>

    </div>
  );
};

export default YourLists;
