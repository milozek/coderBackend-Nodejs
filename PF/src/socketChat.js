import { Server } from "socket.io";
import MessageModel from "./dao/models/message.models.js";

let io;

export const initChat = (httpServer) => {
  io = new Server(httpServer);

  io.on("connection", async (socketClient) => {
    try {
      const messages = await MessageModel.find();

      socketClient.emit("conversation", messages);
    } catch (error) {
      console.log("Error while getting messages:", error);
    }

    socketClient.on("new-message", async (newMessage) => {
      try {
        await MessageModel.create(newMessage);
        const menssages = await MessageModel.find({});
        io.emit("conversation", menssages);
      } catch (error) {
        console.error("Error while saving the new message:", error);
      }
    });
  });
};
