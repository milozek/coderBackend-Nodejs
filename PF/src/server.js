import http from "http";
import config from "./config/config.js";
import app from "./app.js";
import { initChat } from "./socketChat.js";
import { initMongo } from "./db/mongodb.js";
import { logger } from "./config/logger.js";
const PORT = config.port;
console.log("Listening on port: ", PORT);
const server = http.createServer(app);

await initMongo(server);
initChat(server);

server.listen(PORT, () => {
  logger.info(`The server is properly listening on port: ${PORT}`);
});
