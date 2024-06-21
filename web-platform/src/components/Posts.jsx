import React from 'react';
import '../styles/Cards.css';
import CardItem from './CardItem';
import { postsData } from './postsData';

const Posts = () => {
  return (
    <div className='cards'>
      <h1>Articole informative privind ştirile false şi dezinformarea</h1>
      <div className="cards-container">
        <div className="cards-wrapper">
          <ul className="cards-items">
            {postsData.map((post, index) => (
              <CardItem
                key={index}
                titleImg={post.titleImg}
                title={post.title}
                label={post.label}
                path={post.path}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Posts;
