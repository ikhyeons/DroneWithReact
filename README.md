# DroneWithReact
텔로드론 + 리액트 앱 연결
------
사용스택 : <img src="https://img.shields.io/badge/React-545454?style=flat-square&logo=react&logoColor=0094F5"/> <img src="https://img.shields.io/badge/Styled-Component-545454?style=flat-square&logo=styled-components&logoColor=0094F5"/> <img src="https://img.shields.io/badge/Node.js-545454?style=flat-square&logo=Node.js&logoColor=0094F5"/> <img src="https://img.shields.io/badge/Socket.io-545454?style=flat-square&logo=Socket.io&logoColor=0094F5"/>  <img src="https://img.shields.io/badge/Python-545454?style=flat-square&logo=Python&logoColor=0094F5"/>
------
Reference / 
 * https://www.youtube.com/watch?v=JzFvGf7Ywkk&t=1021s&ab_channel=WesBos
 * https://www.youtube.com/watch?v=ozMwRq-IT2w&t=4s&ab_channel=WesBos
------
에러관리 ↓
   * 텔로드론이 배달오고나서 바로 파이썬과 연결시도했는데 연결이 커맨드 입력이 안됬음('command' 커맨드 입력으로 sdk모드로 전환은 됬는데 이후 다른 takeoff 라던지 커맨드 입력이 안됨 error값 리턴)
   <br /> → 핸드폰 앱으로 드론이랑 연결해서 비행하고 나니까 해결되서 바로 적용됨. 와이파이를 연결해서 내부 펌웨어 업데이트가 필요했나봄.

   * 드론 영상 udp 통신 관련해서 데이터를 웹 백으로 보낼 때 1460크기 까지만 송신할 수 있음. 이걸 웹으로 구현할 수 있는지 확인이 필요할 듯. / 11 28
   
   * 드론 영상 코덱을 못찾아서 실패 / python GUI 커트롤러 생성 / 12. 5
------
캡디 종료

완성 영상
<img src="./images/tello.gif" />
