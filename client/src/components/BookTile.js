import React from 'react';

const BookTile = ({ title, description, categories, authors, pageCount, smallImage}) => {
  return (
    <div className='book-tile home-box small-5 primary'>
      <h2>{title}</h2>
      <p>Authors: {authors}</p>
      <p>Category: {categories}</p>
      <img src={smallImage} />
    </div>
  );
};

export default BookTile;
