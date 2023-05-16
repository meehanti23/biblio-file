import React from 'react';

const BookTile = ({ title, authors, smallImage}) => {
    let titleInfo
    if (title) {
        titleInfo = <h2>{title}</h2>
    }

    let authorInfo
    if (authors) {
        authorInfo = <h4>Authors: {authors}</h4>
    }

    return (
        <div className='book-tile home-box small-3 primary'>
        {titleInfo}
        {authorInfo}
        <img src={smallImage} className='tile-thumbnail'/>
        </div>
    );
};

export default BookTile;
