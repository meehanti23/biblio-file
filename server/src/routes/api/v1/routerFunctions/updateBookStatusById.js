import { GoogleBook } from "../../../../models/index.js";

async function updateBookStatusById(req, res) {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { bookStatus } = req.body;
    try {
      const bookToUpdate = await GoogleBook.query().findById(bookId);
      if (bookToUpdate.userId === userId) {
        const updatedBook = await GoogleBook.query().patchAndFetchById(bookId, { bookStatus });
        return res.status(200).json({ book: updatedBook });
      } else {
        return res.status(403).json({ error: 'You are not authorized to update this book.' });
      }
    } catch (error) {
      console.error('Error in updating book:', error);
      return res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
}

export default updateBookStatusById;