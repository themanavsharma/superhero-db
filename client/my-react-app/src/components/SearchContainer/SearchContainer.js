// SearchContainer.js
import React, { useState } from 'react';
import './SearchContainer.css';
import SuperheroResult from '../SuperheroResult/SuperheroResult';


const SearchContainer = () => {
  const [matchingSuperheroes, setMatchingSuperheroes] = useState([]);


const handleSearch = async () => {
  const powerInput = document.getElementById('powersField'); // Assuming 'powersField' is the id of the input field
  const enteredPower = powerInput.value.trim() || 'noSpecifiedPower'; // Use 'noSpecifiedPower' if no power is specified

  const raceInput = document.getElementById('raceField');
  const enteredRace = raceInput.value.trim() || 'noSpecifiedRace';

  const nameInput = document.getElementById('nameField');
  const enteredName = nameInput.value.trim() || 'noSpecifiedName';

  const publisherInput = document.getElementById('publisherField');
  const enteredPublisher = publisherInput.value.trim() || 'noSpecifiedPublisher';

  const response = await fetch(`http://localhost:8080/api/searchSuperheroes/${enteredPower}/${enteredRace}/${enteredName}/${enteredPublisher}`);
  const matchingSuperheroes = await response.json();
  setMatchingSuperheroes(matchingSuperheroes);
  // Do something with the matching superheroes in your frontend
};




  return (
    <div>
    <div className="container" id="searching-container">
      <h2>Search</h2>


      <br />

      <label>Name:</label>
      <input type="text" className="specificSearch" id="nameField" />

      <label class="label-left-margin">Race:</label>
      <input type="text" className="specificSearch" id="raceField" />

      <label class="label-left-margin">Power:</label>
      <input type="text" className="specificSearch" id="powersField" />

      <label class="label-left-margin">Publisher:</label>
      <input type="text" className="specificSearch" id="publisherField" />


      {/* <br /> */}

      <button onClick={handleSearch} class="label-left-margin">Search</button>

    {/* Display matching superheroes */}
    <div className="flex-container" id="matching-superheroes">
    {matchingSuperheroes.map(superhero => (
      <SuperheroResult key={superhero.id} superhero={superhero} />
    ))}


    </div>


  </div>
  </div>
  );
};

export default SearchContainer;

