// HeroListItem.js
import React, { useState } from 'react';
import './HeroListItem.css';

const HeroListItem = ({ list }) => {
  const { listName, lastModified, nickname, ids, averageRating } = list;
  const [detailedInfo, setDetailedInfo] = useState(null);

  const handleViewMoreInfo = async () => {
    try {
      const idsArray = ids.split(',');

      // Fetch detailed information for each hero in the list
      const promises = idsArray.map(async (id) => {
        const response = await fetch(`http://localhost:8080/api/superhero/${id}`);
        return response.json();
      });

      const superheroDataArray = await Promise.all(promises);

      // Update detailedInfo state with fetched superhero information
      setDetailedInfo(superheroDataArray);
    } catch (error) {
      console.error('Error fetching superhero details:', error);
    }
  };

  const handleHideInfo = () => {
    // Hide detailed information
    setDetailedInfo(null);
  };

  return (
    <div className="list-container">
      <h3>{listName}</h3>
      <p>Last Modified: {lastModified}</p>
      <p>Creator's Nickname: {nickname}</p>
      <p>Average Rating: {averageRating}</p>
      <p>Number of Heroes: {ids.split(',').length}</p>

      {/* Additional rendering for heroes based on ids */}
      {detailedInfo && (
        <div>
        <h4>Detailed Information:</h4>
        <ul>
          {detailedInfo.map((hero) => (
            <li key={hero.id}>
              {`${hero.name} - Publisher: ${hero.publisher}`}
              {hero.powers && (
                <p>Powers: {hero.powers.join(', ')}</p>
              )}
            </li>
          ))}
        </ul>
        </div>
      )}

      <button onClick={detailedInfo ? handleHideInfo : handleViewMoreInfo} className="view-info-button">
        {detailedInfo ? 'Hide Info' : 'View More Info'}
      </button>
    </div>
  );
};

export default HeroListItem;



// <div>
// <h4>Detailed Information:</h4>
// <ul>
//   {detailedInfo.map((hero) => (
//     <li key={hero.id}>
//       {`${hero.name} - Publisher: ${hero.publisher}`}
//       {hero.powers && (
//         <p>Powers: {hero.powers.join(', ')}</p>
//       )}
//     </li>
//   ))}
// </ul>
// </div>
