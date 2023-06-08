import { GoogleBook } from "../../../../models/index.js";

async function getUserLibrary(req, res) {
    try {
        const books = await GoogleBook.query().orderBy('createdAt', 'desc');
        return res.status(200).json({ books });
    } catch (error) {
        console.error('Error in getting books:', error);
        return res.status(500).json({ error: 'An error occurred while getting books.' });
    }
}

export default getUserLibrary;