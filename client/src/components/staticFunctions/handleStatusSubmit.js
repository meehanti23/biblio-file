import React from "react";

const handleStatusSubmit = async (id, setNewBookStatus, setErrors, selectedStatus) => {
    try {
        const response = await fetch(`/api/v1/books/${id}`, {
            method: 'PATCH',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ bookStatus: selectedStatus })
        });
        if (!response.ok) {
            const errorBody = await response.json();
            const newError = translateServerErrors(errorBody);
            return setErrors(newError);
        } else {
            const responseBody = await response.json();
            const updatedStatus = responseBody.bookStatus;
            setNewBookStatus(updatedStatus);
            window.location.reload();
        }
    } catch (error) {
        console.error(`Error in fetch: ${error.message}`);
    }
}

export default handleStatusSubmit