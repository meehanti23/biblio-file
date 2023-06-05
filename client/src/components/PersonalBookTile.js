import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import deleteBook from './staticFunctions/deleteBook';
import handleStatusSubmit from './staticFunctions/handleStatusSubmit';
import StatusModal from './reactModals/StatusModal';

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
    
    const handleSubmitStatus = async (event) => {
        event.preventDefault();
        handleStatusSubmit(id, setNewBookStatus, setErrors, selectedStatus);
        setNewBookStatus(updatedStatus);
    }

    return (
        <div className='personal-tile home-box small-5 primary'>
            <div className="book-name"><Link to={`/books/${id}`}>{titleInfo}</Link></div>
            {authorInfo}
            {categoryInfo}
            {bookStatusInfo}
            <img src={smallImage} className='tile-image'/>
            <button className="edit-book-status" onClick={() => setShowModal(true)}>Edit Status</button>
            <StatusModal
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
                handleSubmitStatus={handleSubmitStatus}
                setShowModal={setShowModal}
                showModal={showModal}
            />
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
