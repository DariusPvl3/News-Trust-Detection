import React from 'react';
import { IoMdStar } from "react-icons/io";

const FeedbackForm = ({ rating, setRating, starHover, setStarHover, email, setEmail, comments, setComments, handleFeedbackSubmit }) => {
  return (
    <form className='feedback-form' onSubmit={handleFeedbackSubmit}>
      <h1>Oferă un Feedback</h1>
      <label>Cât de satisfacut/ă sunteţi privind predicţia?</label>
      <div className='rating-container'>
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={index} className="star-label">
              <input
                type='radio'
                name='rating'
                value={currentRating}
                checked={currentRating === rating}
                onChange={() => setRating(currentRating)}  
              />
              <IoMdStar 
                className='star' 
                size={30}
                color={currentRating <= (starHover || rating) ? "#ffc107" : "#e4e5e9"} 
                onMouseEnter={() => setStarHover(currentRating)}
                onMouseLeave={() => setStarHover(null)}
              />
            </label>
          );
        })}
      </div>
      <label>Email (obligatoriu):</label>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='email-input'
        placeholder='exemplu@email.com'
        required
      />
      <label>Comentarii adiționale (opțional):</label>
      <textarea
        value={comments}
        className='comment-box'
        onChange={(e) => setComments(e.target.value)}
      />
      <button type="submit" className='send-feedback'>Trimite Feedback</button>
    </form>
  );
};

export default FeedbackForm;
