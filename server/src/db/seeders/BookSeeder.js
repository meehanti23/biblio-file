import { Book, User } from "../../models/index.js";

class BookSeeder {
    static async seed() {
        const john = await User.query().findOne({ email: "johnDoe22@email.com" })
        const sally = await User.query().findOne({ email: "sallyseashell@email.com" })
        const mary = await User.query().findOne({ email: "Mary301@email.com" })
        const booksData = [
            {
                title: "Farewell to Arms",
                author: "Ernest Hemingway",
                userId: john.id
            },
            {
                title: "Dandelion Wine",
                author: "Ray Bradbury",
                userId: sally.id
            },
            {
                title: "Of Mice and Men",
                author: "John Steinbeck",
                userId: mary.id
            },
            {
                title: "It",
                author: "Stephen King",
                userId: john.id
            },
            {
                title: "Count of Monte Cristo",
                author: "Alexandre Dumas",
                userId: sally.id
            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                userId: mary.id
            },
        ]
        for (const singleBookData of booksData) {
            const currentBook = await Book.query().findOne({ title: singleBookData.title })
            if (!currentBook) {
                await Book.query().insert(singleBookData)
            }
        }
    }
}

export default BookSeeder
