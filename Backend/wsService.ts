import { eventMap } from "./constant";
import { WsMessage } from "./types";

class WsService {
  static ws: WebSocket;
  static ID_INVERVAL: any = null;

  constructor() {
    if (WsService.ws) {
      return WsService.ws;
    }
  }

  static initWsService(ws: any) {
    this.ws = ws;
  }

  static handleRandomNumber(payload: any) {
    if (payload === "start") {
      if (this.ID_INVERVAL) return;
      this.ID_INVERVAL = setInterval(() => {
        const random = Math.floor(Math.random() * 100000);
        const data: WsMessage = {
          eventName: eventMap.GET_RANDOM_NUMBER,
          payload: random,
        };
        this.ws.send(JSON.stringify(data));
      }, 1500);
    }
    if (payload === "stop") {
      if (this.ID_INVERVAL) {
        clearInterval(this.ID_INVERVAL);
      }
      this.ID_INVERVAL = null;
    }
  }

  static abc(payload: any) {
    console.log("hello abc");
  }
}

export default WsService;
