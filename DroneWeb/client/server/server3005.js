var app = require("express")(); //노드 익스프레스를 이용한 서버 구축
var hserver = require("http").createServer(app); // http server를 socket.io server로 변환한다
const io = require("socket.io")(hserver, {
  cors: {
    origin: "*",
    credentials: true,
  },
}); 
hserver.listen(3005, function () {
  console.log("Socket IO Sserver listening on port 3005");
});

//UDP통신 datagram
const dgram = require("dgram");
const dserver = dgram.createSocket("udp4");
//---------------------------------------------------------------웹 코드
//클라이언트로부터 메시지 수신 시
io.on("connection", (socket) => {
  dserver.on("message", (msg, remote_info) => { //파이썬에서 프론트로 상태 전송
    socket.emit("droneStatus", msg);
  });
});

dserver.on("connection", () => {
  console.log("someone Connected");
});

dserver.bind(8890, "0.0.0.0");

//서버 start시
dserver.on("listening", () => {
  const address = dserver.address();
  console.log(`dserver listening ${address.address}:${address.port}`);
});