import React, { useState } from 'react';
import axios from 'axios';
import PercentageCircle from './PercentageCircle';
import WaitingDots from './WaitingDots';
import '../styles/URLSending.css';
import { Modal } from './Modal';

const URLSending = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [siteName, setSiteName] = useState('');
  const [credibility, setCredibility] = useState({});
  const [averageCredibility, setAverageCredibility] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting URL:', url);

    const urlRegex = /^(ftp|http|https):\/\/(?:www\.)?(?:stirileprotv\.ro|observatornews\.ro|activenews\.ro|b1tv\.ro|digi24\.ro|libertatea\.ro|romaniatv\.net|evz\.ro|hotnews.ro)(?:\/[^ "]+)?$/;

    if (!urlRegex.test(url)) {
      console.log('Invalid URL detected');
      setArticleTitle('');
      setSiteName('');
      setCredibility({});
      setAverageCredibility(null);
      setError('Textul inserat nu este un URL valid!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/receive_url', { url, category });
      console.log('URL trimis cu succes');
      const responseData = response.data;
      console.log('Received data:', responseData);
      setArticleTitle(responseData.article_title);
      setSiteName(responseData.site_name);
      setCredibility(responseData.credibility);

      // Calculate the average credibility score
      const scores = Object.values(responseData.credibility).map(model => model.percentage);
      const average = scores.reduce((a, b) => a + b, 0) / scores.length;
      setAverageCredibility(average);

      onSubmit(url);
      setUrl('');
      setCategory('');
      setError('');
    } catch (error) {
      console.error("Eroare la trimiterea URL-ului: ", error);
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

  return (
    <form id='urlForm' className='urlForm' onSubmit={handleSubmit}>
      <label>Introduceţi URL-ul unei ştiri aici:</label>
      <input
        className='urlInput'
        type='text'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder='https://stiri.ro'
      />
      <br />
      <label>Selecteaza categoria articolului:</label>
      <select
        className='categorySelect'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=''>Selectează categoria</option>
        <option value='covid'>COVID-19</option>
        <option value='incalzire'>Încălzire Globală</option>
        <option value='politica'>Politică</option>
        <option value='sanatate'>Sănătate</option>
        <option value='social'>Social</option>
      </select>
      <br />
      <button type="submit" className='submitURL'>Trimite către verificare</button>
      <div className='results-container'>
        {loading && <WaitingDots />}
        {error && <p className='error'>{error}</p>}
        {articleTitle && <p className='articleTitle'><b>Titlul articolului: </b>{articleTitle}</p>}
        {siteName && <p className='articleSite'><b>De pe site-ul: </b>{siteName}</p>}
        {averageCredibility !== null && (
          <>
            <p><b>Credibilitatea medie: </b></p>
            <br />
            <PercentageCircle percentage={averageCredibility.toFixed(2)} circleWidth="200" />
          </>
        )}
        {Object.keys(credibility).length > 0 && (
          <div>
            <button onClick={handleDetailsClick} className='detailsBtn'>
              {modalOpen ? 'Ascunde detalii' : 'Arată detalii'}
            </button>
            {modalOpen && (
              <Modal onClose={handleModalClose}>
                <h1>Detalii Credibilitate</h1>
                {Object.entries(credibility).map(([model, details]) => (
                  <div key={model}>
                    <h2>{model}</h2>
                    <p><b>Procent: </b>{details.percentage.toFixed(2)}%</p>
                    <p><b>Acurateţe: </b>{details.accuracies.toFixed(2)}</p>
                    <p><b>Probabilități:</b> {details.probabilities.map((prob, index) => {
                        const label = index === 0 ? 'Probabilitea ca ştirea să fie falsă' : 'Probabilitea ca ştirea să fie adevărată';
                        return `${label}: ${prob.toFixed(2)}`;
                    }).join(', ')}</p>
                    <p><b>Explicație: </b>{details.explanation}</p>
                  </div>
                ))}
              </Modal>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default URLSending;
