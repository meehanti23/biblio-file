import React from "react";
import axios from "axios";
import translateServerErrors from "../../services/translateServerErrors";

const handleBookSearch = async ({ searchTerm, books, book, setShowModal, setSearchError }) => {
    try {
      const response = await axios.get(`/api/v1/books?q=${encodeURIComponent(searchTerm)}`);
      if (response.status === 200) {
        book = response.data.book;
        books.push(book)
        setShowModal(false);
        window.location.reload(false);
      } else {
        translateServerErrors(response.data.errors);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setShowModal(true);
        setSearchError('Book is already on your shelf.')
      } else {
        setShowModal(true);
        setSearchError('Book not found. Please try again.')
      }
    }
};

export default handleBookSearch;