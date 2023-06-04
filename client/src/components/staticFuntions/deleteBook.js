import React from "react";

const deleteBook = async (id) => {
    try {
        const response = await fetch(`/api/v1/books/${id}`, {
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
            window.location.reload();
        }
    } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
    }
};

export default deleteBook