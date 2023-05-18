import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const ReviewForm = ({ postReview, errors }) => {
    const [newReview, setNewReview] = useState({
        reviewBody: "",
    })

    const handleInputChange = (event) => {
        setNewReview({
            ...newReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postReview(newReview);
        clearForm()
    }

    const clearForm = () => {
        setNewReview({
            reviewBody: "",
        })
    }

    return (
        <div className="grid-container">
            <div className="grid-x grid-margin-x">
                <div className="cell small-12">
                    <h1>Write a Review</h1>
                    <ErrorList errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <label> 
                            Add Comment:
                            <input
                                name="reviewBody"
                                type="text"
                                onChange={handleInputChange}
                                value={newReview.reviewBody}
                            />
                        </label>
                        <div className="button-group">
                            <input className="button" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;
