import React, { useState } from "react";
import styled from "styled-components";

const Sbox = styled.div`
  position: relative;
  height: 100px;
  width: 50px;
  border: 3px solid black;
  background: green;
`;
const Sdiv = styled.div`
  perspective: 500px;
`;
const Sgage = styled.div`
  position: absolute;
  bottom: 0px;
  height: ${(prop) => prop.battery}%;
  width: 100%;
  background: lightgreen;
`;

const Pdiv = styled.div`
  transform: rotateX(${(prop) => prop.pitch}deg);
  perspective: 500px;
`;
const Rdiv = styled.div`
  transform: rotateY(${(prop) => prop.roll}deg);
  perspective: 500px;
`;
const Ydiv = styled.div`
  transform: rotate(${(prop) => prop.yaw}deg);
  perspective: 500px;
`;

function Battery(prop) {
  const { status } = prop;

  return (
    <Sdiv>
      <div>
        <p>배터리 양 : {status.battery}</p>
        <Sbox>
          <Sgage battery={status.battery}></Sgage>
        </Sbox>
      </div>

      <Pdiv pitch={status.pitch}>
        <Rdiv roll={status.roll}>
          <Ydiv yaw={status.yaw}>
            <img
              width="340"
              src="https://cdn-icons-png.flaticon.com/512/5524/5524149.png"
              alt="gd"
            />
          </Ydiv>
        </Rdiv>
      </Pdiv>
    </Sdiv>
  );
}

export default Battery;
