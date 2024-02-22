import StudentModel from "../models/student.model.js"

export default class Students {
    static get() {
        return StudentModel.find()
    }
    static async getById(sid) {
        const student = await StudentModel.findById(sid)
        if (!student) {
            throw new Error("Not found")
        }
        return student
    }
    static async create(data) {
        const student = await StudentModel.create(data)
        console.log(`success: ${student.id}`)
        return student
    }
    static async updateById(sid, data) {
        const student = await StudentModel.updateById(sid)
        console.log(`success: ${student.id}`)
        return student
    }
    static async deleteById(sid) {
        const student = await StudentModel.deleteById(sid)
        console.log(`success: ${student.id}`)
        return student
    }
}
