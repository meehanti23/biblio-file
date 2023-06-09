import React, { useState, useEffect } from "react";
import translateServerErrors from "../services/translateServerErrors";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const BookShowPage = (props) => {
    const [errors, setErrors] = useState([]);
    const [reviews, setReviews] = useState([])
    const [book, setBook] = useState({
        title: "",
        authors: "",
        pageCount: "",
        description: "",
        categories: "",
        smallImage: "",
        largeImage: "",
        reviews: []
    });

    const postReview = async (reviewPayload) => {
        try {
            const bookId = props.match.params.id;
            const response = await fetch(`/api/v1/books/${bookId}/reviews`, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(reviewPayload)
            });
            if (!response.ok) {
                if (response.status === 422) {
                    const errorBody = await response.json();
                    const newErrors = translateServerErrors(errorBody.errors.data);
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw(error);
                } 
            }
            else {
                const body = await response.json();
                setErrors([])
                return setReviews([
                    ...reviews,
                    body.reviewBody
                ]);
            }
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`);
        }
    }

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
            setReviews(bookData.book.reviews);
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

    let ReviewFormSection;
    if (props.user) {
        ReviewFormSection = 
            <ReviewForm 
                postReview={postReview}
                errors={errors}
            />
    }

    let loginPrompt

    if (!props.user) {
        loginPrompt = <h4 className="cell show-text">Sign in to leave a review!</h4>
    }

    return (
        <div className="primary show-box grid-x container">
            <h1 className="cell show-text">{book.title}</h1>
            <h3 className="cell show-text">By: {book.authors}</h3>
            <h4 className="cell show-text">Genre: {book.categories}</h4>
            {pageCountSection}
            <p className="description">{book.description}</p>
            <img className="show-image" src={book.largeImage} alt={book.title} />
            {ReviewFormSection}
            {loginPrompt}
            <ReviewList reviews={reviews} saladId={book.id} currentUser={props.user}/>
        </div>
    )
}

export default BookShowPage;