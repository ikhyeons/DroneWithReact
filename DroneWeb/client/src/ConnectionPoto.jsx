import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const socket2 = io('ws://localhost:3007')

function ConnectionPoto(prop) {
  const { connection } = prop
  const [vdo, setVdo] = useState('')

  useEffect(() => {
    socket2.on('video', (msg) => {
      console.log(msg)
      setVdo(msg)
    })
  }, [])

  let canvasRef = useRef()

  return (
    <div>
      <p>connection : {connection === true ? 'true' : 'false'}</p>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ConnectionPoto
