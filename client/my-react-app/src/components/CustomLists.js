// CustomLists.js
import React from 'react';
import './CustomLists.css';

const CustomLists = () => {
  return (
    <div className="search-container">
      <h2>Custom Lists</h2>

      <h3>Create a List:</h3>
      <label>Enter list name:</label>
      <input type="text" id="listNameInput" />
      <button onClick={() => createList()} class="btn-left-margin">Create</button>

      <h3>Delete a List:</h3>
      <label>Enter list name:</label>
      <input type="text" id="deleteListName" />
      <button onClick={() => deleteSuperheroList()} class="btn-left-margin">Delete </button>

      <h3 className="specificSearch">Add to a List:</h3>
      <label>Enter list name:</label>
      <input type="text" className="specificSearch" id="addToListNameInput" />
      <br />
      <label>Enter superhero IDs:</label>
      <input type="text" id="superheroIdsInput" />
      <br />
      <button onClick={() => addToSuperheroList()}>Add</button>

      <h3>View List IDs:</h3>
      <label>Enter list name:</label>
      <input type="text" id="viewIDsListName" />
      <button onClick={() => viewSuperheroIDs()} class="btn-left-margin">View</button>

      <h3>View List Info:</h3>
      <label>Enter list name:</label>
      <input type="text" id="viewListInfoInput" />
      <button onClick={() => viewListInfo()} class="btn-left-margin">View</button>
    </div>
  );
};

export default CustomLists;
