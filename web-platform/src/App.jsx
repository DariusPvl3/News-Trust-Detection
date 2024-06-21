import React, { useState } from 'react';
import useLocalStorage from "use-local-storage";
import URLSending from './components/URLSending';
import './styles/App.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { About } from './components/About';
import Posts from './components/Posts';
import { Home } from './components/Home';
import Article from './components/Article'; // Import the new Article component
import { postsData } from './components/postsData'; // Import the postsData

const App = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const handleSubmit = (url) => {
    console.log('Se trimite URL-ul...', url);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className='App' data-theme={isDark ? "dark" : "light"}>
      <div className='content-wrap'>
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='check' element={<URLSending onSubmit={handleSubmit} />} />
          <Route path='about' element={<About />} />
          <Route path='posts' element={<Posts />} />
          {postsData.map((post, index) => (
            <Route
              key={index}
              path={post.path}
              element={<Article post={post} />}
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
