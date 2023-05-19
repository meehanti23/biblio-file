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
        <div className="grid-container review-form">
            <div className="grid-x grid-margin-x">
                <div className="cell small-12">
                    <h1><b>Thoughts?</b></h1>
                    <ErrorList errors={errors} />
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="reviewBody"
                            id="reviewBody"
                            placeholder="Write your review here..."
                            value={newReview.reviewBody}
                            onChange={handleInputChange}
                            rows={4}
                        />
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
