import React, { useState, useEffect } from "react";
import BookTile from "./BookTile";

const BookList = (props) => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
            const response = await fetch("/api/v1/books");
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw error;
            }
            const data = await response.json();
            setBooks(data.books);
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const mappedBooks = books.map((book) => {
        return (
            <BookTile
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
            />
        );
    });

    return (
        <div className='primary home-box grid-x'>
            <h1 className="cell">Book Shelf</h1>
            {mappedBooks}
        </div>
    )
}

export default BookList;