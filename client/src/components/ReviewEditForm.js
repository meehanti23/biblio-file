import React, { useState, useEffect } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import { Redirect } from "react-router-dom";

const SaladEditForm = (props) => {
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [newReviewBody, setNewReviewBody] = useState({
        reviewBody: ""
    });

    const handleInputChange = event => {
        setNewReviewBody({
            ...newReviewBody,
            [event.currentTarget.name]: event.currentTarget.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        patchReview();
    };

    const { bookId } = props.match.params;
    
    if (shouldRedirect) {
        return <Redirect to={`/books/${bookId}`} />;
    }

    const patchReview = async () => {
        const newBookReview = newReviewBody.reviewBody;
        const reviewId = props.match.params.reviewId;
        const bookId = props.match.params.bookId;
        try {
            const response = await fetch(`/api/v1/books/${bookId}/reviews/${reviewId}`, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ reviewBody: newBookReview })
            });
            if (!response.ok) {
                const errorBody = await response.json();
                const newError = translateServerErrors(errorBody);
                return setErrors(newError);
            }
            else {
                const responseBody = await response.json();
                const updatedReview = responseBody.review;
                setNewReviewBody(updatedReview);
                setShouldRedirect({ status: true, bookId });
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    return (
        <div className="edit-form">
            <h3>Edit your Comment Here:</h3>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <textarea
                    className="input-field"
                    name="reviewBody"
                    onChange={handleInputChange}
                    value={newReviewBody.reviewBody}
                    rows={3}
                    cols={50}
                />
                <div className = "edit-form-buttons">  
                    <input className='button edit-submit' type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default SaladEditForm;