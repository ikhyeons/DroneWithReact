//--------------------------------------------------------------------------라이브러리, 기본 설정
//웹 익스프레스
const express = require('express')
const port = 3001;
const app = express()
//UDP통신 datagram
const dgram = require('dgram')
const server = dgram.createSocket('udp4');
//---------------------------------------------------------------------------웹 코드
//백 포트 개방
app.listen(port, ()=>{
    console.log(`port started with ${port}`)
})
//인덱스 페이지 라우팅
app.get('/',(req,res)=>{
    res.send('ㅎㅇ2')
})
//----------------------------------------------------------------------------파이썬 연결 코드
  //클라이언트로부터 메시지 수신 시
  server.on('message', (msg, remote_info) => {
    console.log(`server got: ${msg} from ${remote_info.address}:${remote_info.port}`);
  });

  server.on('connection', () => {
    console.log('someone Connected');
  });

  server.bind(port, 'localhost');

  //서버 start시
  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
    server.send('messege', 9000, 'localhost', ()=>{
      console.log('send this')
    })
  });

  

