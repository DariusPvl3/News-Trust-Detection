import React from 'react';
import { Modal } from './Modal';
import FeedbackForm from './FeedbackForm';

const FeedbackModal = ({ feedbackModalOpen, handleFeedbackModalClose, rating, setRating, starHover, setStarHover, email, setEmail, comments, setComments, handleFeedbackSubmit }) => {
  return (
    <Modal onClose={handleFeedbackModalClose}>
      <FeedbackForm
        rating={rating}
        setRating={setRating}
        starHover={starHover}
        setStarHover={setStarHover}
        email={email}
        setEmail={setEmail}
        comments={comments}
        setComments={setComments}
        handleFeedbackSubmit={handleFeedbackSubmit}
      />
    </Modal>
  );
};

export default FeedbackModal;
