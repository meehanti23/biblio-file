import React from "react";
import axios from "axios";

const getBooks = async (selectedSortingOption) => {
      try {
        const response = await axios.get('/api/v1/users');
        if (response.status === 200) {
          let sortedBooks = response.data.user.books.slice();
          switch (selectedSortingOption) {
            case 'A-Z':
              sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
              break;
            case 'Z-A':
              sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
              break;
            case 'Shortest':
              sortedBooks.sort((a, b) => a.pageCount - b.pageCount);
              break;
            case 'Longest':
              sortedBooks.sort((a, b) => b.pageCount - a.pageCount);
              break;
            case 'Newest':
              sortedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              break;
            case 'Oldest':
              sortedBooks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
              break;
            default:
              break;
          }
          return sortedBooks;
        } else {
          console.error('Error in search:', response.data.error);
        }
      } catch (error) {
        console.error('Error in search:', error);
      }
};

export default getBooks