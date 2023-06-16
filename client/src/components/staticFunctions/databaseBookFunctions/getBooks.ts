import axios from "axios";

interface Book {
  title: string;
  pageCount: number;
  createdAt: string;
}

const getBooks = async (selectedSortingOption: string): Promise<Book[] | void> => {
  try {
    const response = await axios.get('/api/v1/users');
    if (response.status === 200) {
      let sortedBooks: Book[] = response.data.user.books.slice();
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
          sortedBooks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'Oldest':
          sortedBooks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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

export default getBooks;