// HeroListItem.js
import React from 'react';
import './HeroListItem.css';

const HeroListItem = ({ list }) => {
  const { listName, lastModified, nickname, ids, averageRating } = list;

  return (
    <div className="list-container">
      <h3>{listName}</h3>
      <p>Last Modified: {lastModified}</p>
      <p>Creator's Nickname: {nickname}</p>
      <p>Average Rating: {averageRating}</p>
      <p>Number of Heroes: {ids.split(',').length}</p>
      {/* Additional rendering for heroes based on ids */}
    </div>
  );
};

export default HeroListItem;
