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

    if (shouldRedirect) {
        return <Redirect to={`/books/${bookId}/reviews/${reviewId}`} />;
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
                const updatedReview = responseBody.reviewBody;
                setNewReviewBody(updatedReview);
                shouldRedirect({ status: true, reviewId: reviewId });
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    return(
        <>
            <h1>Edit Form</h1>
            <ErrorList errors={errors} />
            <form onSubmit={handleSubmit}>
                <label>Review Body:</label>
                <input
                    name="reviewBody"
                    type="text"
                    onChange={handleInputChange}
                    value={newReviewBody.reviewBody}
                />
                <input className='button' type="submit" value="Submit" />
            </form>
        </>
    )
}

export default SaladEditForm;