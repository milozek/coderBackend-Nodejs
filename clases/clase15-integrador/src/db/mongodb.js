import mongoose from "mongoose"

const URI = ""

export const init = async () => {
    try {
        await mongoose.connect(URI)
        console.log("db connected")
    } catch (error) {
        console.error(error)
    }
}
