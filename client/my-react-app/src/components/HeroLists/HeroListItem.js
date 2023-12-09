// HeroListItem.js
import React, { useState, useEffect } from 'react';
import './HeroListItem.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

const HeroListItem = ({ list }) => {
  const { listName, lastModified, nickname, ids, averageRating, description } = list;
  const [detailedInfo, setDetailedInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [isLeavingReview, setIsLeavingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

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

  const handleLeaveReview = () => {
    setIsLeavingReview(!isLeavingReview);
  };

  const handleDiscardReview = () => {
    setIsLeavingReview(false);
    // Reset review form fields
    setRating(0);
    setComment('');
  };

//   const handleSubmitReview = () => {
//     // TODO: Handle submitting review logic
//     // For now, just log the rating and comment
//     console.log('Rating:', rating);
//     console.log('Comment:', comment);

//     // Reset review form fields
//     setRating(0);
//     setComment('');

//     // Hide the review form
//     setIsLeavingReview(false);
//   };

  const handleSubmitReview = async () => {
    try {
    //   // Get the email of the logged-in user from Firebase
    //   const user = auth.currentUser;

    //   if (!user) {
    //     console.error('User not logged in');
    //     return;
    //   }

    //   const email = user.email;

    //   // Get the user's nickname from the backend
    //   const nicknameResponse = await fetch(`http://localhost:8080/api/nickname/${email}`);

    //   if (!nicknameResponse.ok) {
    //     console.error('Error fetching nickname:', nicknameResponse.statusText);
    //     return;
    //   }

    //   const nicknameData = await nicknameResponse.json();
    //   const listCreatorNickname = nicknameData.nickname;

      // Get the updated information from the editedList state
    //   const { listName, rating, comment } = editedList;

      // Call the backend to add the review
      const addReviewResponse = await fetch('http://localhost:8080/api/secure/addreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listName,
          nickname,
          rating,
          comment,
        }),
      });

      if (addReviewResponse.ok) {
        console.log('Review added successfully');

        // Reset review form fields
        setRating(0);
        setComment('');

        // Hide the review form
        setIsLeavingReview(false);
      } else {
        console.error('Error adding review:', addReviewResponse.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
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

      {user && (
        <>
          <button onClick={handleLeaveReview} className="leave-review-button" class="btn-left-margin">
            {isLeavingReview ? 'Discard Review' : 'Leave a Review'}
          </button>
            <br/>
            <br/>
          {isLeavingReview && (
            <div>

              <label>Rating (0-5):</label>
              <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />

              <br />
              <br />

              <label>Comment:</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

              <br />
              <br />

              <button onClick={handleSubmitReview}>Submit Review</button>
              {/* <button onClick={handleDiscardReview} class="btn-left-margin">Discard Review</button> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HeroListItem;
