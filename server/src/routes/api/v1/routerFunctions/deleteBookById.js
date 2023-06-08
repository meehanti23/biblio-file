import { GoogleBook } from "../../../../models/index.js";

async function deleteBookById(req, res) {
    const bookId = req.params.id;
    const userId = req.user.id;
    try {
      const bookToDelete = await GoogleBook.query().findById(bookId);
      if (bookToDelete.userId === userId) {
        await GoogleBook.query().deleteById(bookId);
        return res.status(200).json({ message: 'Book deleted successfully.' });
      } else {
        return res.status(403).json({ error: 'You are not authorized to delete this book.' });
      }
    } catch (error) {
      console.error('Error in deleting book:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the book.' });
    }
}

export default deleteBookById;