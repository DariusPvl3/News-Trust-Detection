import React from 'react';
import { Modal } from './Modal';
import PercentageCircle from './PercentageCircle';

const DetailsModal = ({ modalOpen, handleModalClose, testResults }) => {
  return (
    <Modal onClose={handleModalClose}>
      <h1>Detalii privind rezultatul credibilităţii</h1>
      <div className='details-modal'>
        {Object.entries(testResults).map(([model, details]) => (
          <div key={model}>
            <h2>{model}</h2>
            <div className='circles-div'>
              <div className="one-detail">
                <p><b>Credibilitate calculată: </b></p>
                <PercentageCircle percentage={details.percentage.toFixed(2)} circleWidth="150"/>
              </div>
              <div className="one-detail">
                <p><b>Acurateţe Model: </b></p>
                <PercentageCircle percentage={details.accuracies.toFixed(2) * 100} circleWidth="150"/>
              </div>
            </div>
            <p><b>Explicație model: </b>{details.explanation}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default DetailsModal;
