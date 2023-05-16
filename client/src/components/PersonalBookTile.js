import React from 'react';
import { Link } from 'react-router-dom';

const PersonalBookTile = ({ title, id, categories, authors, smallImage}) => {
    let titleInfo
    if (title) {
        titleInfo = <h2>{title}</h2>
    }
    let categoryInfo
    if (categories) {
        categoryInfo = <p>Category: {categories}</p>
    }
    let authorInfo
    if (authors) {
        authorInfo = <h4>Authors: {authors}</h4>
    }

    return (
        <div className='personal-tile home-box small-5 primary'>
        <div className="book-name"><Link to={`/books/${id}`}>{titleInfo}</Link></div>
        {authorInfo}
        {categoryInfo}
        <img src={smallImage} className='tile-image'/>
        </div>
    );
};

export default PersonalBookTile;
