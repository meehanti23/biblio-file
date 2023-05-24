import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import translateServerErrors from '../services/translateServerErrors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PersonalBookTile = ({ title, id, categories, authors, smallImage}) => {
    const [errors, setErrors] = useState([]);

    let titleInfo
    if (title) {
        titleInfo = <h3 className='author-tile'>{title}</h3>
    }
    let categoryInfo
    if (categories) {
        categoryInfo = <p>Category: {categories}</p>
    }
    let authorInfo
    if (authors) {
        authorInfo = <h4>Authors: {authors}</h4>
    }

    const deleteBook = async () => {
        try {
            const response = await fetch(`/api/v1/books/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            if (!response.ok) {
                const errorBody = await response.json();
                const newError = translateServerErrors(errorBody);
                return setErrors(newError);
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    }; 

    return (
        <div className='personal-tile home-box small-5 primary'>
            <div className="book-name"><Link to={`/books/${id}`}>{titleInfo}</Link></div>
            {authorInfo}
            {categoryInfo}
            <img src={smallImage} className='tile-image'/>
            <div className="remove-book">
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={deleteBook}
                    className='trash-icon'
                />
            </div>
        </div>
    );
};

export default PersonalBookTile;
