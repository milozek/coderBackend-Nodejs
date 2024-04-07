import ticketModel from "./models/ticket.model.js";

export default class TicketDaoMongoDB {
    static findById(cid) {
        return ticketModel.findById(cid)
    }

    static generateTicket(body) {

        return ticketModel.create({ ...body })
    }
}
