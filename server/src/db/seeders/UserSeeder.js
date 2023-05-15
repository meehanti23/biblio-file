import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "johnDoe22@email.com",
                password: "12345"
            },
            { 
                email: "sallyseashell@email.com", 
                password: "54321" 
            },
            { 
                email: "Mary301@email.com", 
                password: "24689" 
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