import React from 'react';
import '../styles/Article.css';

const Article = ({ post }) => {
  const formatText = (text) => {
    const boldPattern = /^(\d+\.\s.*?:)/;
    const parts = text.split(boldPattern);

    return parts.map((part, index) => {
      if (boldPattern.test(part)) {
        return <strong key={index}>{part}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className='article'>
      <h1>{post.title}</h1>
      <img src={post.titleImg} alt={post.title} className='article-image' />
      <div className='article-content'>
        {post.content.map((block, index) => {
          if (block.type === 'text') {
            return <p key={index}>{formatText(block.value)}</p>;
          } else if (block.type === 'image') {
            return <img key={index} src={block.src} alt={block.alt} className='content-image' />;
          } else if (block.type === 'section') {
            return <h2 key={index}>{block.value}</h2>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Article;
