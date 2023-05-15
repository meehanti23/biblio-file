/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import BookSeeder from "./seeders/BookSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding users...") 
    await UserSeeder.seed()

    console.log("seeding books...")
    await BookSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder