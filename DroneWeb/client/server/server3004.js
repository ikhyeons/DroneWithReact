//-------------------------------------------------------------socket.io

var app = require("express")(); //노드 익스프레스를 이용한 서버 구축
var hserver = require("http").createServer(app); // http server를 socket.io server로 변환한다
const io = require("socket.io")(hserver, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
hserver.listen(3003, function () {
  console.log("Socket IO Sserver listening on port 3003");
});
//--------------------------------------------------------------라이브러리, 기본 설정
//UDP통신 datagram
const dgram = require("dgram");
const dserver = dgram.createSocket("udp4");
//---------------------------------------------------------------웹 코드
//----------------------------------------------------------------파이썬 연결 코드
//클라이언트로부터 메시지 수신 시
dserver.on("message", (msg, remote_info) => {
  console.log(
    `dserver got: ${msg.toString("utf8")} from ${remote_info.address}:${remote_info.port}`
  );
});

dserver.on("connection", () => {
  console.log("someone Connected");
});

dserver.bind(3004, "localhost");

//서버 start시
dserver.on("listening", () => {
  const address = dserver.address();
  console.log(`dserver listening ${address.address}:${address.port}`);
  dserver.send("node dserver is running...", 9000, "127.0.0.1", () => {});
});

io.on("connection", (socket) => {
  socket.on("frontCommand", (rcv) => {
    dserver.send(rcv, 9000, "127.0.0.1", () => {});
  });
});
