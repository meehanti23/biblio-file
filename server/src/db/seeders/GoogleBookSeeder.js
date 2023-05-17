import { GoogleBook, User } from "../../models/index.js";
import axios from "axios";

class GoogleBookSeeder {
    static async seed() {
        const gandalf = await User.query().findOne({ username: "Gandalf" });
        const frodo = await User.query().findOne({ username: "Frodo" });
        const samwise = await User.query().findOne({ username: "Samwise" });
        const sauron = await User.query().findOne({ username: "Sauron" });
        const gollum = await User.query().findOne({ username: "Gollum" });
        const googleBooksData = [
            {
                title: "The Great Gatsby",
                userId: gandalf.id,
                username: gandalf.username
            },
            {
                title: "The Catcher in the Rye",
                userId: frodo.id,
                username: frodo.username
            },
            {
                title: "The Grapes of Wrath",
                userId: samwise.id,
                username: samwise.username
            },
            {
                title: "To Kill a Mockingbird",
                userId: sauron.id,
                username: sauron.username
            },
            {
                title: "The Color Purple",
                userId: gollum.id,
                username: gollum.username
            },
            {
                title: "Ulysses",
                userId: gandalf.id,
                username: gandalf.username
            },
            {
                title: "Beloved",
                userId: frodo.id,
                username: frodo.username
            },
            {
                title: "The Lord of the Flies",
                userId: samwise.id,
                username: samwise.username
            },
            {
                title: "1984",
                userId: sauron.id,
                username: sauron.username
            },
            {
                title: "The Sound and the Fury",
                userId: gollum.id,
                username: gollum.username
            },
            {
                title: "Lolita",
                userId: gandalf.id,
                username: gandalf.username
            },
            {
                title: "The Hobbit",
                userId: frodo.id,
                username: frodo.username
            },
            {
                title: "On the Road",
                userId: samwise.id,
                username: samwise.username
            },
            {
                title: "Catch-22",
                userId: sauron.id,
                username: sauron.username
            },
            {
                title: "The Call of the Wild",
                userId: gollum.id,
                username: gollum.username
            },
            {
                title: "Fight Club",
                userId: gandalf.id,
                username: gandalf.username
            },
            {
                title: "For Whom the Bell Tolls",
                userId: frodo.id,
                username: frodo.username
            }
        ]
        for (const singleGoogleBookData of googleBooksData) {
            const title = singleGoogleBookData.title;
            const username = singleGoogleBookData.username;
            const userId = singleGoogleBookData.userId;
            const apiKey = process.env.GOOGLE_API_KEY;
            const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}`;
            const response = await axios.get(requestUrl);
            const body = response.data.items[0].volumeInfo;
            const categoryArray = Array.isArray(body.categories) ? body.categories : [body.categories];
            const categories = categoryArray.join(', ');
            const authorsArray = Array.isArray(body.authors) ? body.authors : [body.authors];
            const authors = authorsArray.join(', ');
            await GoogleBook.query().insert({ title: body.title, authors: authors, pageCount: body.pageCount, description: body.description, categories: categories, smallImage: body.imageLinks.smallThumbnail, largeImage: body.imageLinks.thumbnail, username: username, userId: userId });

        }
}
}

export default GoogleBookSeeder;