import mongoose from "mongoose"
import config from "../config/config.js"

export const init = async () => {
    try {
        const URI = config.mongodbUri
        await mongoose.connect(URI)
        console.log("Database connected")
    } catch (error) {
        console.error("Error in connecting to database", error.message)
    }
}
