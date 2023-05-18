import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

const ReviewTile = ({ reviewBody, username, reviewId, bookId, currentUser }) => {
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [review, setReview] = useState({
        reviewBody: reviewBody
    });

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

    const renderDeleteIcon = () => {
        if (currentUser && currentUser.username === username) {
          return (
            <FontAwesomeIcon
                icon={faTrash}
                onClick={deleteReview}
                className="review-trash-icon"
            />
          );
        }
        return null;
        };
        
        const editReview = () => {
            setShouldRedirect({ status: true, reviewId, bookId });
        }

        if (shouldRedirect) {
            return <Redirect to={`/books/${bookId}/reviews/${reviewId}/edit`} />
        }
        
        const renderEditIcon = () => {
            if (currentUser && currentUser.username === username) {
                return (
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        onClick={editReview}
                        className="review-edit-icon"
                    />
                )
            }
            return null;
        }

    return (
        <div className="review-tile">
            <h3 className="cell">{reviewBody}</h3>
            <h5>Submitted by: {username}</h5>
            <div className="review-icons">
                {renderDeleteIcon()}
                {renderEditIcon()}
            </div>
        </div>
    )
}

export default ReviewTile;