import TicketDaoMongoDB from "../dao/ticket.dao.js"

export default class TicketService {
    static findById(cid) {
        return TicketDaoMongoDB.findById(cid)
    }

    static generateTicket(body) {

        return TicketDaoMongoDB.generateTicket(body)
    }
}
