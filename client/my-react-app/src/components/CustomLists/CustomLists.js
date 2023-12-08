// CustomLists.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

import './CustomLists.css';


const CustomLists = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const createList = async () => {
    const listName = document.getElementById('listNameInput').value;
    const description = document.getElementById('descriptionInput').value;
    const heroIds = document.getElementById('heroIdsInput').value;
    const isPublic = document.getElementById('publicVisibility').checked;

    // Retrieve user's email from Firebase user object
    const userEmail = user.email;

    try {
      // Assuming you have userEmail available in your component state or props
      console.log('User Email:', userEmail);

      const nicknameResponse = await fetch(`http://localhost:8080/api/nickname/${userEmail}`);

      if (!nicknameResponse.ok) {
        // Handle error fetching nickname
        console.error('Error fetching nickname:', nicknameResponse.statusText);
        return;
      }

      const nicknameData = await nicknameResponse.json();
      const nickname = nicknameData.nickname;

      // Send request to create a new list
      const response = await fetch('http://localhost:8080/api/secure/createlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listName,
          description,
          heroIds,
          isPublic,
          nickname,
        }),
      });

      if (response.ok) {
        // List created successfully
        console.log('List created successfully');
        window.location.reload();
      } else {
        // Handle error in creating the list
        console.error('Error creating the list:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteSuperheroList = async () => {
    const listName = document.getElementById('deleteListName').value;

    // Retrieve user's email from Firebase user object
    const userEmail = user.email;

    try {
      // Assuming you have userEmail available in your component state or props
      console.log('User Email:', userEmail);

      const nicknameResponse = await fetch(`http://localhost:8080/api/nickname/${userEmail}`);

      if (!nicknameResponse.ok) {
        // Handle error fetching nickname
        console.error('Error fetching nickname:', nicknameResponse.statusText);
        return;
      }

      const nicknameData = await nicknameResponse.json();
      const nickname = nicknameData.nickname;

      // Send request to delete the list
      const deleteResponse = await fetch('http://localhost:8080/api/secure/deletelist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listName,
          nickname,
        }),
      });

      if (deleteResponse.ok) {
        // List deleted successfully
        console.log('List deleted successfully');
        window.location.reload();
      } else {
        // Handle error in deleting the list
        console.error('Error deleting the list:', deleteResponse.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Check if user is authenticated
  if (!user) {
    // If not authenticated, render nothing
    return null;
  }

  return (
    <div className="container">
      <h2>Custom Lists</h2>

      <h3>Create a List:</h3>

      <label>Enter list name:</label>
      <input type="text" id="listNameInput" />

      <br />

      <label>Enter description (optional):</label>
      <input className="input-top-margin" type="text" id="descriptionInput" />

      <br />

      <label>Enter hero IDs (comma-separated):</label>
      <input className="input-top-margin" type="text" id="heroIdsInput" />

      <br />

      <div className="input-top-margin">
        <label>Visibility:</label>
        <div>
          <input type="radio" id="privateVisibility" name="visibility" value="private" defaultChecked />
          <label htmlFor="privateVisibility">Private</label>
        </div>

        <div>
          <input type="radio" id="publicVisibility" name="visibility" value="public" />
          <label htmlFor="publicVisibility">Public</label>
        </div>
      </div>

      <button onClick={createList} className="btn-left-margin">
        Create
      </button>

      <h3>Delete a List:</h3>
      <label>Enter list name:</label>
      <input type="text" id="deleteListName" />
      <button onClick={deleteSuperheroList} className="btn-left-margin">
        Delete
      </button>
    </div>
  );
};

export default CustomLists;
