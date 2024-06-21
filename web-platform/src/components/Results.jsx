import React from 'react';
import PercentageCircle from './PercentageCircle';
import WaitingDots from './WaitingDots';

const Results = ({ loading, error, articleTitle, siteName, averageCredibility, testResults, handleDetailsClick, handleFeedbackClick, modalOpen, feedbackModalOpen }) => {
  return (
    <div className='results-container'>
      {loading && <WaitingDots />}
      {error && <p className='error'>{error}</p>}
      {articleTitle && <p className='article-title'><b>Titlul articolului: </b>{articleTitle}</p>}
      {siteName && <p className='article-site'><b>De pe site-ul: </b>{siteName}</p>}
      {averageCredibility !== null && (
        <>
          <p><b>Credibilitatea medie: </b></p>
          <br />
          <PercentageCircle percentage={averageCredibility.toFixed(2)} circleWidth="200" />
        </>
      )}
      {Object.keys(testResults).length > 0 && (
        <div>
          <button onClick={handleDetailsClick} className='details-btn'>
            {modalOpen ? 'Ascunde detalii' : 'Arată detalii'}
          </button>
          <button onClick={handleFeedbackClick} className='feedback-btn'>
            {feedbackModalOpen ? 'Închide formular' : 'Oferă un feedback'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;
