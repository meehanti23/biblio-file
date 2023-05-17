import React from 'react';
import { Link } from 'react-router-dom';

const BookTile = ({ title, authors, smallImage, username, id }) => {
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
            <div className="book-name"><Link to={`/books/${id}`}>{titleInfo}</Link></div>
            {authorInfo}
            <img src={smallImage} className='tile-thumbnail'/>
            <h5>Submitted By: {username}</h5>
        </div>
    );
};

export default BookTile;
