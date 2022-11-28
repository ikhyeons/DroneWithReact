import Controller from './Controller'
import Status from './Status'
import { useState, useEffect } from 'react'
import ConnectionPoto from './ConnectionPoto'
import { io } from 'socket.io-client'
const socket = io('ws://localhost:3005', { transports: ['websocket'] })

function App() {
  const [connection, setConnection] = useState(true)
  const [status, setStatus] = useState({
    pitch: 0,
    roll: 0,
    yaw: 0,
    height: 0,
    battery: 0,
  })

  const ab2str = function (buf) {
    //Array buffer를 스트링으로 변경
    var arrayBuffer = new Uint8Array(buf)
    var s = String.fromCharCode.apply(null, arrayBuffer)
    decodeURIComponent(s)
    return s
  }
  useEffect(() => {
    socket.on('droneStatus', (msg) => {
      let inData = ab2str(msg).split(';')
      setStatus({
        pitch: -inData[0].slice(6),
        roll: inData[1].slice(5),
        yaw: inData[2].slice(4),
        height: inData[9].slice(2),
        battery: inData[10].slice(4),
      })
    })
  }, [])

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between' }}
      className="App"
    >
      <Controller />
      <ConnectionPoto status={status} connection={connection} />
      <Status status={status} setStatus={setStatus} />
    </div>
  )
}

export default App
