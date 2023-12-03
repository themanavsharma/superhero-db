// SearchContainer.js
import React, { useState } from 'react';
import './SearchContainer.css';


const SearchContainer = () => {

const [superheroId, setSuperheroId] = useState('');
const [superheroInfo, setSuperheroInfo] = useState(null);

// Function to get superhero info based on superhero ID input
const getSuperheroInfo = async () => {
    try {
    const response = await fetch(`/api/superhero/${superheroId}`);
    const superhero = await response.json();
    setSuperheroInfo(superhero);
    } catch (error) {
    console.error('Error getting the superhero information:', error);
    }
};

const handleButtonClick = () => {
    getSuperheroInfo();
    // You can add more logic here if needed
  };

  return (
    <div className="search-container">
      <h2>Search</h2>
      <h3>General Search:</h3>
      <label>Enter Superhero ID:</label>
      {/* <input type="text" id="superheroId" />
      <button onClick={() => getSuperheroInfo(superheroId)} class="btn-left-margin">Get Info</button> */}

        <input
            type="text"
            id="superheroId"
            value={superheroId}
            onChange={(e) => setSuperheroId(e.target.value)}
        />
      <button onClick={handleButtonClick} class="btn-left-margin">
        Get Info
      </button>

      <button onClick={() => getSuperheroPowers()} class="btn-left-margin">Get Powers</button>

      <h3>Specific Search:</h3>

      <label>Choose a field:</label>
      <select className="specificSearch" id="fieldDropdown">
        
        <option value="name">Name</option>
        <option value="gender">Gender</option>
        <option value="eye color">Eye Color</option>
        <option value="hair color">Hair Color</option>
        <option value="height">Height</option>
        <option value="publisher">Publisher</option>
        <option value="height">Height</option>
        <option value="skin color">Skin Color</option>
        <option value="alignment">Alignment</option>
        <option value="weight">Weight</option>
        
      </select>

      <br />

      <label>Enter a Pattern:</label>
      <input type="text" className="specificSearch" id="patternInput" />

      <br />

      <label>Enter number of matching results:</label>
      <input type="number" className="specificSearch" id="resultsInput" />

      <br />

      <button onClick={() => searchSuperheroes()} >Search</button>

      <div className="superhero-info-container">
        {/* Display superheroInfo */}
        {superheroInfo && (
          <div>
            <h3>Superhero Information:</h3>
            <pre>{JSON.stringify(superheroInfo, null, 2)}</pre>
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchContainer;
