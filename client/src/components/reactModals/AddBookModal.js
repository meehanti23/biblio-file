import React from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const AddBookModal = ({ showModal, setShowModal, searchTerm, handleInputChange, modalError, handleSearchAndClose }) => {
    return (
        <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Add a Book"
            className="modal-box"
            >
            <FontAwesomeIcon
                className="close"
                icon={faCircleXmark}
                onClick={() => setShowModal(false)}
            />
            {modalError}
            <form onSubmit={handleSearchAndClose} className='search-bar'>
            <input type="text" value={searchTerm} onChange={handleInputChange} />
            <button type="submit" className='search-button'>Search Google Books</button>
            </form>
            <div className="search-criteria">
                <h3 className='search-info'>Search By Book Title</h3>
                <h4 className='search-info'>Search <b>IS NOT</b> case-sensitive</h4>
                <h4 className='search-info'>Search <b>IS</b> space and spelling-sensitive</h4>
                <h4 className='search-info'>Press Return or Search Button to enter query</h4>
            </div>
        </Modal>
    )
}

export default AddBookModal