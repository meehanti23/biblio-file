import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                username: "Gandalf",
                email: "gandalf@thegrey.com",
                password: "1ring"
            },
            { 
                username: "Frodo",
                email: "frodo@baggins.com", 
                password: "1ring" 
            },
            { 
                username: "Samwise",
                email: "samwise@gamgee.com", 
                password: "1ring" 
            },
            {
                username: "Sauron",
                email: "sauron@onering.com",
                password: "1ring"
            },
            {
                username: "Gollum",
                email: "gollum@precious.com",
                password: "1ring"
            }
        ]
        for (const singleUserData of usersData) {
            const currentUser = await User.query().findOne({ email: singleUserData.email })
            if (!currentUser) {
                await User.query().insert(singleUserData)
            }
        }
    }
}

export default UserSeeder