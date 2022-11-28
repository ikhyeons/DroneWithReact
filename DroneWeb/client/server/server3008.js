//-------------------------------------------------------------socket.io //프론와 파이썬 간 명령어
var app = require('express')() //노드 익스프레스를 이용한 서버 구축
const ws = require('ws')
var hserver = require('http').createServer(app) // http server를 socket.io server로 변환한다
const io = require('socket.io')(hserver, {
  cors: {
    origin: '*',
    credentials: true,
  },
})
hserver.listen(3007, function () {
  console.log('Socket IO Sserver listening on port 3003')
})
const websocket = new ws.Server({ port: 3009 })

//--------------------------------------------------------------라이브러리, 기본 설정
//UDP통신 datagram
const dgram = require('dgram')
const dserver = dgram.createSocket('udp4')
//---------------------------------------------------------------웹 코드
//----------------------------------------------------------------파썬 연결 코드
//클라이언트로부터 메시지 수신 시
dserver.bind(11111, '0.0.0.0')

let videoBuffer = []
let counter = 0

io.on('connection', (socket) => {
  dserver.on('message', (msg, remote_info) => {
    let buffer = Buffer.from(msg)
    if (buffer.indexOf(Buffer.from([0, 0, 0, 1])) !== -1) {
      counter++
      if (counter === 3) {
        let temp = Buffer.concat(videoBuffer)
        counter = 0
        socket.emit('video', temp)
        videoBuffer.length = 0
      }
      videoBuffer.push(buffer)
    } else {
      videoBuffer.push(buffer)
    }
  })
})

dserver.on('error', (err) => {
  console.log('drone video error', err)
  video.close()
})

dserver.on('connection', () => {
  console.log('someone Connected')
})

//서버 start시
dserver.on('listening', () => {
  const address = dserver.address()
  console.log(`dserver listening ${address.address}:${address.port}`)
  dserver.send('node dserver is running...', 9000, '127.0.0.1', () => {})
})

io.on('connection', (socket) => {
  socket.on('frontCommand', (rcv) => {
    console.log(rcv)
    dserver.send(rcv, 9000, '127.0.0.1', () => {})
  })
})
