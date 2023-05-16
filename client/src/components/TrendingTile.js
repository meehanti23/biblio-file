import React from 'react';
import { Link } from 'react-router-dom';

const TrendingTile = ({ title, author, image, link }) => {
    return (
        <div className=' home-box cell primary trending-tile grid-x'>
            <div className="trending-image-container small-2">
                <img src={image} className='trending-image'/>
            </div>
            <div className='trending-details'>
                <h5>{title}</h5>
                <h6>Authors: {author}</h6>
                <a href={`https://www.goodreads.com${link}`} className='trending-link'>View on Goodreads</a>
            </div>
        </div>
    )
}

export default TrendingTile;