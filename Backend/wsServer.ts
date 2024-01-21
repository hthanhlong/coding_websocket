import { WebSocketServer } from "ws";
import { WsMessage } from "./types";
import WsService from "./wsService";
import { eventMap } from "./constant";

const PORT = 8080;
const wss = new WebSocketServer({
  port: PORT,
  host: "localhost",
  verifyClient: (info, done) => {
    if (info.origin !== "http://localhost:5173") {
      done(false, 401, "Unauthorized"); // reject connection
      return;
    }
    done(true); // accept connection
  },
});

wss.on("listening", () => {
  console.log(`WebSocket server is listening on port ${PORT}`);
});

wss.on("connection", function connection(ws) {
  WsService.initWsService(ws);
  ws.on("error", console.error);
  ws.on("message", (data) => {
    const result: WsMessage = JSON.parse(data.toString());
    const { eventName, payload } = result;
    if (eventName === eventMap.GET_RANDOM_NUMBER) {
      WsService.handleRandomNumber(payload);
    }
    // todo: add more event
    if (eventName === eventMap.ABC) {
      WsService.abc(payload);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
