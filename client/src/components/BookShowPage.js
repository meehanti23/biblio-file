import React, { useState, useEffect } from "react";

const BookShowPage = (props) => {
    const [book, setBook] = useState({
        title: "",
        authors: "",
        pageCount: "",
        description: "",
        categories: "",
        smallImage: "",
        largeImage: ""
    });

    const getBook = async () => {
        try {
            const bookId = props.match.params.id;
            const response = await fetch(`/api/v1/books/${bookId}`);
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw(error);
            }
            const bookData = await response.json();
            setBook(bookData.book);
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`);
        }
    };

    useEffect(() => {
        getBook();
    }, []);

    let pageCountSection;
    if (book.pageCount) {
        pageCountSection = <h4 className="cell show-text">Page Count: {book.pageCount}</h4>
    }

    return (
        <div className="primary home-box grid-x container">
            <h1 className="cell show-text">{book.title}</h1>
            <h3 className="cell show-text">By: {book.authors}</h3>
            <h4 className="cell show-text">Genre: {book.categories}</h4>
            {pageCountSection}
            <p className="description">{book.description}</p>
            <img className="show-image" src={book.largeImage} alt={book.title} />
        </div>
    )
}

export default BookShowPage;