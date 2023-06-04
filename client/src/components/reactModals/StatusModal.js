import React from "react";
import Modal from 'react-modal';

const StatusModal = ({ selectedStatus, showModal, handleStatusChange, handleSubmitStatus, setShowModal }) => {
    return (
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
            <form onSubmit={handleSubmitStatus} className='search-bar'>
                <button type="submit" className='search-button'>Submit Status</button>
            </form>
            <p className='status-button-text'>Keep track of your reading status with this book!</p>
            </Modal>
    )
}

export default StatusModal