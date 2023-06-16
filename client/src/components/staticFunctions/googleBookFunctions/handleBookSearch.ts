import * as React from "react";
import axios from "axios";
const translateServerErrors = require("../../../services/translateServerErrors");

const handleBookSearch = async ({
  searchTerm,
  books,
  book,
  setShowModal,
  setSearchError,
}: {
  searchTerm: string;
  books: Array<any>;
  book: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  try {
    const response = await axios.get(`/api/v1/books?q=${encodeURIComponent(searchTerm)}`);
    if (response.status === 200) {
      book = response.data.book;
      books.push(book);
      setShowModal(false);
      window.location.reload();
    } else {
      translateServerErrors(response.data.errors);
    }
  } catch (error) {
    const response = await axios.get(`/api/v1/books?q=${encodeURIComponent(searchTerm)}`);
    if (response.status === 422) {
      setShowModal(true);
      setSearchError("Book is already on your shelf.");
    } else {
      setShowModal(true);
      setSearchError("Book not found. Please try again.");
    }
  }
};

export default handleBookSearch;
