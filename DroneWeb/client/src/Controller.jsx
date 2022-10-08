import React, { useState } from "react";
import styled from "styled-components";
import Toggle from "./Toggle";

const SROLTbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
`;

const SGFBbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: blue;
`;

const SGLRbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: blue;
`;

const SEbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: red;
`;

const STLRbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: lightgreen;
`;

const SUDbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: skyblue;
`;

const SFLRbutton = styled.button`
  width: 150px;
  height: 100px;
  margin: 5px;
  background: green;
`;

const Scontroller = styled.div``;

function Controller() {
  const [lastCommand, setLastCommand] = useState("");

  return (
    <Scontroller>
      <div>
        <SROLTbutton
          onClick={() => {
            setLastCommand("Take Off");
          }}
        >
          이륙
        </SROLTbutton>
        <SROLTbutton
          onClick={() => {
            setLastCommand("Land");
          }}
        >
          착륙
        </SROLTbutton>
        <Toggle />
      </div>

      <div>
        <STLRbutton
          onClick={() => {
            setLastCommand("Turn Left");
          }}
        >
          좌회전
        </STLRbutton>
        <SGFBbutton
          onClick={() => {
            setLastCommand("Go Foward");
          }}
        >
          전진
        </SGFBbutton>
        <STLRbutton
          onClick={() => {
            setLastCommand("Turn Right");
          }}
        >
          우회전
        </STLRbutton>
        <SUDbutton
          onClick={() => {
            setLastCommand("Up");
          }}
        >
          상승
        </SUDbutton>
      </div>
      <div>
        <SGLRbutton
          onClick={() => {
            setLastCommand("Go Left");
          }}
        >
          좌측이동
        </SGLRbutton>
        <SEbutton
          onClick={() => {
            setLastCommand("Emergency");
          }}
        >
          비상정지
        </SEbutton>
        <SGLRbutton
          onClick={() => {
            setLastCommand("Go Right");
          }}
        >
          우측이동
        </SGLRbutton>
      </div>

      <div>
        <SFLRbutton
          onClick={() => {
            setLastCommand("Flip Left");
          }}
        >
          좌측플립
        </SFLRbutton>
        <SGFBbutton
          onClick={() => {
            setLastCommand("Go Back");
          }}
        >
          후진
        </SGFBbutton>
        <SFLRbutton
          onClick={() => {
            setLastCommand("Flip Right");
          }}
        >
          우측플립
        </SFLRbutton>
        <SUDbutton
          onClick={() => {
            setLastCommand("Down");
          }}
        >
          하강
        </SUDbutton>
      </div>
      <p>마지막 명령 : "{lastCommand}"</p>
    </Scontroller>
  );
}

export default Controller;
