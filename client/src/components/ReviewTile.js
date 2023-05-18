import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ReviewTile = ({ reviewBody, username, reviewId, bookId }) => {
    const [errors, setErrors] = useState([]);
    const deleteReview = async () => {
        try {
            const response = await fetch(`/api/v1/books/${bookId}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });
            if (!response.ok) {
                const errorBody = await response.json();
                const newError = translateServerErrors(errorBody);
                return setErrors(newError);
            } else {
                window.location.reload(true);
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`);
        }
    };

    return (
        <div className="review-tile">
            <h3 className="cell">{reviewBody}</h3>
            <h5>Submitted by: {username}</h5>
            <div className="remove-review small-5">
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={deleteReview}
                    className='review-trash-icon'
                />
            </div>
        </div>
    )
}

export default ReviewTile;