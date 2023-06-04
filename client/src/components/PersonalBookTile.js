import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import translateServerErrors from '../services/translateServerErrors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import deleteBook from './staticFuntions/deleteBook';

const PersonalBookTile = ({ title, id, categories, authors, smallImage, bookStatus }) => {
    const [errors, setErrors] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newBookStatus, setNewBookStatus] = useState('');

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

    let bookStatusInfo
    if (bookStatus !== '') {
        bookStatusInfo = <p>Status: {bookStatus}</p>
    }
    
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
      };    

    const handleStatusSubmit = async () => {
        try {
            const response = await fetch(`/api/v1/books/${id}`, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ bookStatus: selectedStatus })
            });
            if (!response.ok) {
                const errorBody = await response.json();
                const newError = translateServerErrors(errorBody);
                return setErrors(newError);
            } else {
                const responseBody = await response.json();
                const updatedStatus = responseBody.bookStatus;
                setNewBookStatus(updatedStatus);
                window.location.reload();
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    }

    return (
        <div className='personal-tile home-box small-5 primary'>
            <div className="book-name"><Link to={`/books/${id}`}>{titleInfo}</Link></div>
            {authorInfo}
            {categoryInfo}
            {bookStatusInfo}
            <img src={smallImage} className='tile-image'/>
            <button className="edit-book-status" onClick={() => setShowModal(true)}>Edit Status</button>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Edit Status"
                className="status-modal-box"
            >
            <div className="status-buttons">
                <label className="status-buttons">
                    <input
                    type="radio"
                    name="bookStatus"
                    value="Reading Now"
                    className='status-button'
                    checked={selectedStatus === 'Reading Now'}
                    onChange={handleStatusChange}
                    />
                    Reading Now
                </label>
                <label className="status-buttons">
                    <input
                    type="radio"
                    name="bookStatus"
                    value="Have Read"
                    className='status-button'
                    checked={selectedStatus === 'Have Read'}
                    onChange={handleStatusChange}
                    />
                    Have Read
                </label>
                <label className="status-buttons">
                    <input
                    type="radio"
                    name="bookStatus"
                    value="Going to Read"
                    className='status-button'
                    checked={selectedStatus === 'Going to Read'}
                    onChange={handleStatusChange}
                    />
                    Going to Read
                </label>
                <label className="status-buttons">
                    <input
                    type="radio"
                    name="bookStatus"
                    value="Not Sure Yet"
                    className='status-button'
                    checked={selectedStatus === 'Not Sure Yet'}
                    onChange={handleStatusChange}
                    />
                    Not Sure Yet
                </label>
            </div>
            <form onSubmit={handleStatusSubmit} className='search-bar'>
                <button type="submit" className='search-button'>Submit Status</button>
            </form>
            <p className='status-button-text'>Keep track of your reading status with this book!</p>
            </Modal>
            <div className="remove-book">
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={deleteBook.bind(this, id)}
                    className='trash-icon'
                />
            </div>
        </div>
    );
};

export default PersonalBookTile;
