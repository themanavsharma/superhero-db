import React, { useState } from 'react';
import './SuperheroResult.css';

const SuperheroResult = ({ superhero }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const handleViewMore = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const handleSearchDDG = () => {
    const searchQuery = superhero.name.replace(/\s+/g, '+'); // Replace spaces with '+'
    const searchUrl = `https://duckduckgo.com/?q=${searchQuery}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="superhero-container">
      <h3>{superhero.name}</h3>
      <p>Publisher: {superhero.Publisher}</p>
      {showMoreInfo && (
        <div>
          <p>Gender: {superhero.Gender}</p>
          <p>Eye color: {superhero['Eye color']}</p>
          <p>Race: {superhero.Race}</p>
          <p>Hair color: {superhero['Hair color']}</p>
          <p>Height: {superhero.Height}</p>
          <p>Skin color: {superhero['Skin color']}</p>
          <p>Alignment: {superhero.Alignment}</p>
          <p>Weight: {superhero.Weight}</p>
          {/* Add more details as needed */}
        </div>
      )}
      <button className="view-more-info-btn" onClick={handleViewMore}>
        {showMoreInfo ? 'Hide Info' : 'View More Info'}
      </button>
      <button className="search-ddg-btn" onClick={handleSearchDDG}>
          Search on DDG
        </button>
    </div>
  );
};

export default SuperheroResult;
