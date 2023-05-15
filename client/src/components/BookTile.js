import React from 'react';

const BookTile = (props) => {
  return (
    <div>
      <h2>{bookData.volumeInfo.title}</h2>
      <p>Author: {bookData.volumeInfo.authors.join(', ')}</p>
      <p>Publisher: {bookData.volumeInfo.publisher}</p>
    </div>
  );
};

export default BookTile;
