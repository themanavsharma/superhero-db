import React, { useState } from 'react';

const YourListItem = ({ list }) => {
  const { listName, lastModified, nickname, ids, averageRating, description } = list;
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedList, setEditedList] = useState({});

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

  const handleEditList = () => {
    setIsEditing(!isEditing);

    // Initialize editedList state with current list values
    setEditedList({
      listName,
      description,
      ids,
      isPublic: true, // Assuming it's public by default, adjust as needed
    });
  };

  const handleChange = (e) => {
    // Update editedList state based on input changes
    setEditedList({
      ...editedList,
      [e.target.name]: e.target.value,
    });
  };

  const handleDiscardChanges = () => {
    // Discard changes and revert to the original view
    setIsEditing(false);
  };

  const handleMakeChanges = () => {
    // Handle the logic for making changes to the list
    // You can send a request to the backend to update the list with the editedList values
    console.log('Making changes:', editedList);

    // After making changes, revert to the original view
    setIsEditing(false);
  };

  return (
    <div className="list-container">
      {isEditing ? (
        <div>
          <label>Edit List Name:</label>
          <input type="text" name="listName" value={editedList.listName} onChange={handleChange} />

          <br/>
          <br/>

          <label>Edit Description:</label>
          <input type="text" name="description" value={editedList.description} onChange={handleChange} />

          <br/>
          <br/>

          <label>Edit Hero IDs:</label>
          <input type="text" name="ids" value={editedList.ids} onChange={handleChange} />

          <br/>
          <br/>

          <label>Edit Visibility:</label>
          <div>
            <input
              type="radio"
              id="editPrivateVisibility"
              name="isPublic"
              value="private"
              checked={!editedList.isPublic}
              onChange={handleChange}
            />
            <label htmlFor="editPrivateVisibility">Private</label>
          </div>

          <div>
            <input
              type="radio"
              id="editPublicVisibility"
              name="isPublic"
              value="public"
              checked={editedList.isPublic}
              onChange={handleChange}
            />
            <label htmlFor="editPublicVisibility">Public</label>
          </div>

          <button onClick={handleMakeChanges}>Make Changes</button>
          <button onClick={handleDiscardChanges} class="btn-left-margin">Discard Changes</button>
        </div>
      ) : (
        <>
          <h3>{listName}</h3>
          <p>Last Modified: {lastModified}</p>
          <p>Creator's Nickname: {nickname}</p>
          <p>Average Rating: {averageRating}</p>
          <p>Number of Heroes: {ids.split(',').length}</p>

          {/* Additional rendering for heroes based on ids */}
          {detailedInfo && (
            <div>
              <h4>Detailed Information:</h4>
              {description && <p>Description: {description}</p>}
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
          <button onClick={handleEditList} className="edit-list-button" class="btn-left-margin">
            {isEditing ? 'Discard Changes' : 'Edit List'}
          </button>
        </>
      )}
    </div>
  );
};

export default YourListItem;
