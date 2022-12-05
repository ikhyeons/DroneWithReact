import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Toggle from './Toggle'
import { io } from 'socket.io-client'

const socket = io('ws://localhost:3003', { transports: ['websocket'] })

const SROLTbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
`

const SGFBbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: blue;
`

const SGLRbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: blue;
`

const SEbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: red;
`

const STLRbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: lightgreen;
`

const SUDbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: skyblue;
`

const SFLRbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: green;
`

const Scontroller = styled.div``

function Controller() {
  const [lastCommand, setLastCommand] = useState('')

  useEffect(() => {
    socket.on('backData', (arg) => {
      console.log(arg)
    })
  }, [])

  return (
    <Scontroller>
      <div>
        <SROLTbutton
          onClick={() => {
            setLastCommand('Take Off')
            socket.emit('frontCommand', 'takeoff')
          }}
        >
          이륙
        </SROLTbutton>
        <SROLTbutton
          onClick={() => {
            setLastCommand('Land')
            socket.emit('frontCommand', 'land')
          }}
        >
          착륙
        </SROLTbutton>
        <Toggle />
      </div>

      <div>
        <STLRbutton
          onClick={() => {
            setLastCommand('Turn Left 45º ')
            socket.emit('frontCommand', 'ccw 45')
          }}
        >
          좌회전
        </STLRbutton>
        <SGFBbutton
          onClick={() => {
            setLastCommand('Go Forward 40')
            socket.emit('frontCommand', 'forward 120')
          }}
        >
          전진
        </SGFBbutton>
        <STLRbutton
          onClick={() => {
            setLastCommand('Turn Right 45º ')
            socket.emit('frontCommand', 'cw 45')
          }}
        >
          우회전
        </STLRbutton>
        <SUDbutton
          onClick={() => {
            setLastCommand('Up 40')
            socket.emit('frontCommand', 'up 150')
          }}
        >
          상승
        </SUDbutton>
      </div>
      <div>
        <SGLRbutton
          onClick={() => {
            setLastCommand('Go Left 40')
            socket.emit('frontCommand', 'left 40')
          }}
        >
          좌측이동
        </SGLRbutton>
        <SEbutton
          onClick={() => {
            setLastCommand('Emergency')
            socket.emit('frontCommand', 'emergency')
          }}
        >
          비상정지
        </SEbutton>
        <SGLRbutton
          onClick={() => {
            setLastCommand('Go Right 40')
            socket.emit('frontCommand', 'right 40')
          }}
        >
          우측이동
        </SGLRbutton>
      </div>

      <div>
        <SFLRbutton
          onClick={() => {
            setLastCommand('Flip Left')
            socket.emit('frontCommand', 'flip l')
          }}
        >
          좌측플립
        </SFLRbutton>
        <SGFBbutton
          onClick={() => {
            setLastCommand('Go Back 20')
            socket.emit('frontCommand', 'back 20')
          }}
        >
          후진
        </SGFBbutton>
        <SFLRbutton
          onClick={() => {
            setLastCommand('Flip Right')
            socket.emit('frontCommand', 'flip r')
          }}
        >
          우측플립
        </SFLRbutton>
        <SUDbutton
          onClick={() => {
            setLastCommand('Down 20')
            socket.emit('frontCommand', 'down 30')
          }}
        >
          하강
        </SUDbutton>
      </div>
      <p>마지막 명령 : {lastCommand}</p>
    </Scontroller>
  )
}

export default Controller
