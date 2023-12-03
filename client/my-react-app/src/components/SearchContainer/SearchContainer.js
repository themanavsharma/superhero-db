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
  };

  return (
    <div className="container">
      <h2>Search</h2>


      <br />

      <label>Name:</label>
      <input type="text" className="specificSearch" id="" />

      <label class="label-left-margin">Race:</label>
      <input type="text" className="specificSearch" id="" />

      <label class="label-left-margin">Power:</label>
      <input type="text" className="specificSearch" id="" />

      <label class="label-left-margin">Publisher:</label>
      <input type="text" className="specificSearch" id="" />


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



// {/* <h3>General Search:</h3>
// <label>Enter Superhero ID:</label>
// {/* <input type="text" id="superheroId" />
// <button onClick={() => getSuperheroInfo(superheroId)} class="btn-left-margin">Get Info</button> */}

//   <input
//       type="text"
//       id="superheroId"
//       value={superheroId}
//       onChange={(e) => setSuperheroId(e.target.value)}
//   />
// <button onClick={handleButtonClick} class="btn-left-margin">
//   Get Info
// </button> */}


{/* <button onClick={() => getSuperheroPowers()} class="btn-left-margin">Get Powers</button> */}