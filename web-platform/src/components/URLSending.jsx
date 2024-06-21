import React, { useState } from 'react';
import axios from 'axios';
import URLForm from './URLForm';
import Results from './Results';
import DetailsModal from './DetailsModal';
import FeedbackModal from './FeedbackModal';
import '../styles/URLSending.css';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import validNewsWebsites from './validNewsURLs';

const URLSending = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [siteName, setSiteName] = useState('');
  const [testResults, setTestResults] = useState({});
  const [averageCredibility, setAverageCredibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [rating, setRating] = useState(5); 
  const [starHover, setStarHover] = useState(null);
  const [email, setEmail] = useState(''); 
  const [comments, setComments] = useState('');
  const [error, setError] = useState(null);

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!url.trim()) {
      showErrorToast('Vă rugăm să introduceți un URL.');
      return;
    }
  
    if (!category) {
      showErrorToast('Vă rugăm să selectați o categorie.');
      return;
    }
  
    if (!validNewsWebsites.test(url)) {
      setArticleTitle('');
      setSiteName('');
      setTestResults({});
      setAverageCredibility(null);
      showErrorToast('Ne pare rău, acest URL nu este suportat!');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:8000/receive_url', { url, category });
      const responseData = response.data;
      setArticleTitle(responseData.article_title);
      setSiteName(responseData.site_name);
      setTestResults(responseData.test_results);
  
      const scores = Object.values(responseData.test_results).map(model => model.percentage);
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      setAverageCredibility(average);
  
      onSubmit(url);
      setUrl('');
      setCategory('');
    } catch (error) {
      showErrorToast("Eroare la trimiterea URL-ului: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFeedbackClick = (e) => {
    e.preventDefault();
    setFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setFeedbackModalOpen(false);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (rating === null) {
        showErrorToast('Vă rugăm să selectați un rating.');
        return;
    }

    if (!email) {
        showErrorToast('Vă rugăm să introduceți un email.');
        return;
    }

    try {
        const feedbackData = {
            rating,
            email,
            comments,
            article_title: articleTitle,
            site_name: siteName,
            average_credibility: averageCredibility,
        };
        const response = await axios.post('http://localhost:8000/submit_feedback', feedbackData);
        toast.success('Feedback trimis cu succes!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    } catch (error) {
        showErrorToast('Eroare la trimiterea feedback-ului!');
    }

    setFeedbackModalOpen(false);  
  };

  return (
    <div>
      <URLForm url={url} setUrl={setUrl} category={category} setCategory={setCategory} handleSubmit={handleSubmit} />
        <Results 
          loading={loading} 
          error={error} 
          articleTitle={articleTitle} 
          siteName={siteName} 
          averageCredibility={averageCredibility} 
          testResults={testResults} 
          handleDetailsClick={handleDetailsClick} 
          handleFeedbackClick={handleFeedbackClick} 
          modalOpen={modalOpen} 
          feedbackModalOpen={feedbackModalOpen} 
        />
      {modalOpen && <DetailsModal modalOpen={modalOpen} handleModalClose={handleModalClose} testResults={testResults} />}
      {feedbackModalOpen && 
        <FeedbackModal 
          feedbackModalOpen={feedbackModalOpen} 
          handleFeedbackModalClose={handleFeedbackModalClose} 
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
      }
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default URLSending;
