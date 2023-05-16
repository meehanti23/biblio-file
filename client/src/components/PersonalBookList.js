import React, { useState, useEffect } from 'react';
import PersonalBookTile from './PersonalBookTile';
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
            const data = response.data.books[0].volumeInfo;
            await axios.post('/api/v1/books', { title: data.title, authors: data.authors, pageCount: data.pageCount, description: data.description, categories: data.categories, imageLinks: data.imageLinks});
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
        return <PersonalBookTile 
            key={book.id} 
            id={book.id} 
            title={book.title} 
            authors={book.authors} 
            pageCount={book.pageCount}
            categories={book.categories}
            description={book.description}
            smallImage={book.smallImage}
            largeImage={book.largeImage}
            />;
    });

    return (
        <div className="primary home-box grid-x">
        <h1 className="cell">Book Shelf</h1>
        <form className="cell" onSubmit={handleSearch}>
            <input type="text" value={searchTerm} onChange={handleInputChange} />
            <button type="submit">Search</button>
        </form>
            {mappedBooks}
        </div>
    );
};

export default PersonalBookList;
