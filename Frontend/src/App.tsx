import { useEffect, useRef, useState } from "react";
import { eventMap } from "./constant";

function App() {
  const [number, setNumber] = useState(0);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080");
    wsRef.current?.addEventListener("open", () => {
      console.log("Connected to server");
    });
    wsRef.current?.addEventListener("message", (event) => {
      if (!event.data) return;
      const { eventName, payload } = JSON.parse(event.data);
      if (eventName === eventMap.GET_RANDOM_NUMBER) {
        setNumber(payload);
      }
    });

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const getData = () => {
    wsRef.current?.send(
      JSON.stringify({
        eventName: eventMap.GET_RANDOM_NUMBER,
        payload: "start",
      })
    );
  };

  const stopGettingData = () => {
    wsRef.current?.send(
      JSON.stringify({
        eventName: eventMap.GET_RANDOM_NUMBER,
        payload: "stop",
      })
    );
  };

  return (
    <>
      <div>
        receive Data from Server <span>{number}</span>
      </div>
      <button onClick={getData}>get Data</button>
      <button onClick={stopGettingData}>stop geting Data</button>
    </>
  );
}

export default App;
