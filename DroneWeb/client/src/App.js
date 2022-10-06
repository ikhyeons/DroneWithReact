function App() {
  return (
    <div className="App">
      <div>
        <button>전진</button>
        <button>후진</button>
        <button>좌측이동</button>
        <button>우측이동</button>
        <button>좌회전</button>
        <button>우회전</button>
        <button>상승</button>
        <button>하강</button>
      </div>
      <div>
        <button>좌측플립</button>
        <button>우측플립</button>
      </div>
      <div>
        <button>시동</button>
        <button>이륙</button>
        <button>착륙</button>
      </div>

      <p>connection : true</p>
      
      <div>
        전방 기울기 : 5
        측방 기울기 : 10
        현재 각도 :  15
        높이 : 20
        배터리 양 :  99 
      </div>


      {/*좌회전, 우회전 / 상승, 하강 / 전진, 후진 / 좌측이동, 우측이동 / 좌측플립, 우측플립 / 시동 / 이륙, 착륙*/}
      {/*연결여부*/}
      {/*스테이터스 → 전, 측, 중 기울기 / 높이 / 배터리 량*/}
    </div>
  );
}

export default App;
