import Controller from "./Controller";
import Status from "./Status";
import { useState } from "react";
import ConnectionPoto from "./ConnectionPoto";

function App() {
  const [connection, setConnection] = useState(true);
  const [battery, setBettery] = useState(50);
  const [status, setStatus] = useState({
    pitch: 0,
    roll: 0,
    yaw: 0,
    height: 0,
  });
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between" }}
      className="App"
    >
      <Controller />
      <ConnectionPoto status={status} connection={connection} />
      <Status battery={battery} status={status} />
    </div>
  );
}

export default App;
