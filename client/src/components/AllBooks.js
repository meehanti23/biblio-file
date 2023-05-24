import React, { useState, useEffect } from "react";
import BookTile from "./BookTile";
import axios from "axios";

const AllBooks = (props) => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
        const response = await axios.get('/api/v1/books/library');
        if (response.status === 200) {
            setBooks(response.data.books);
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
        return <BookTile 
            key={book.id} 
            id={book.id} 
            title={book.title} 
            authors={book.authors} 
            smallImage={book.smallImage}
            username={book.username}
            />;
    });

    return (
        <div className="primary all-books-box grid-x container">
            <h1 className="cell page-title">What is Everyone Reading?</h1>
            {mappedBooks}
        </div>
    )
}

export default AllBooks;