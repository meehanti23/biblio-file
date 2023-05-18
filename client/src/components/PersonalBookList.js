import React, { useState, useEffect } from 'react';
import PersonalBookTile from './PersonalBookTile';
import axios from 'axios';
import translateServerErrors from '../services/translateServerErrors';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const PersonalBookList = (props) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/v1/books?q=${encodeURIComponent(searchTerm)}`);
      if (response.status === 200) {
        const book = response.data.book;
        books.push(book)
        setShowModal(false);
        window.location.reload(false);
      } else {
        translateServerErrors(response.data.errors);
      }
    } catch (error) {
      setShowModal(true);
      console.error('Error in search:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getBooks = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      if (response.status === 200) {
        setBooks(response.data.user.books);
      } else {
        console.error('Error in search:', response.data.error);
      }
    } catch (error) {
      console.error('Error in search:', error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const mappedBooks = books.map((book) => {
    return (
      <PersonalBookTile
        key={book.id}
        id={book.id}
        title={book.title}
        authors={book.authors}
        categories={book.categories}
        smallImage={book.smallImage}
      />
    );
  });

  const handleSearchAndClose = (event) => {
    handleSearch()
    setShowModal(false)
  }

  return (
    <div className="primary home-box grid-x">
      <h1 className="cell page-title">
        <FontAwesomeIcon className="book-icon" icon={faBookOpen} />
        Book Shelf
        <FontAwesomeIcon className="book-icon" icon={faBookOpen} />
        </h1>
      <div className="add-book-wrapper cell">
        <button className="button add-book-button" onClick={() => setShowModal(true)}>
          Add a Book
        </button>
      </div>
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
        <form onSubmit={handleSearchAndClose} className='search-bar'>
          <input type="text" value={searchTerm} onChange={handleInputChange} />
          <button type="submit" className='search-button'>Search Google Books</button>
        </form>
        <div className="search-criteria">
            <h3>Search By Book Title</h3>
            <h4>Search <b>IS NOT</b> case-sensitive</h4>
            <h4>Search <b>IS</b> space and spelling-sensitive</h4>
            <h4>Press Return or Search Button to enter query</h4>
        </div>
      </Modal>
      {mappedBooks}
    </div>
  );
};

export default PersonalBookList;
