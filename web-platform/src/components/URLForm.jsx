import React from 'react';

const URLForm = ({ url, setUrl, category, setCategory, handleSubmit }) => {
  return (
    <form id='urlForm' className='url-form' onSubmit={handleSubmit}>
      <label>Introduceţi URL-ul unei ştiri aici:</label>
      <input
        className='url-input'
        type='text'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder='https://stiri.ro'
      />
      <br />
      <label>Selectează categoria articolului:</label>
      <select
        className='category-select'
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
      <button type="submit" className='submit-url'>Trimite către verificare</button>
    </form>
  );
};

export default URLForm;
