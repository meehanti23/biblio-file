import React, { useState, useEffect } from 'react';
import BookTile from './BookTile';
import axios from 'axios';

const PersonalBookList = (props) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/v1/books?q=${encodeURIComponent(searchTerm)}`);
      if (response.status === 200) {
        setBooks(response.data.books);
          const volumeID = response.data.volumeID;
          await axios.post('/api/v1/books', { volumeID } );
      } else {
        console.error('Error in search:', response.data.error);
      }
    } catch (error) {
      console.error('Error in search:', error);
    }
  };
  
  const handleInputChange = (e) => { 
    setSearchTerm(e.target.value);
  };

  const getBooks = async () => {
    try {
      const response = await axios.get('/api/v1/books/library');
      if (response.status === 200) {
        const books = response.data.books;
        for (const book of books) {
          const volumeID = book.volumeID;
          console.log(volumeID);
          const bookResponse = await axios.get(`/api/v1/books/${volumeID}`);
          if (bookResponse.status === 200) {
            const retrievedBook = bookResponse.data.book;
            console.log(retrievedBook);
            // Handle the retrieved book data as needed
          } else {
            console.error('Error in getting book:', bookResponse.data.error);
          }
        }
      } else {
        console.error('Error in getting books:', response.data.error);
      }
    } catch (error) {
      console.error('Error in getting books:', error);
    }
  };
  
  

useEffect(() => {
    getBooks();
}, []);

  

//   const mappedBooks = books.map((book) => {
//     return <BookTile key={book.id} id={book.id} title={book.title} author={book.author} />;
//   });

  return (
    <div className="primary home-box grid-x">
      <h1 className="cell">Book Shelf</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default PersonalBookList;
