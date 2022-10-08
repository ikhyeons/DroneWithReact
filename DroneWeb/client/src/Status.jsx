import React, { useState } from "react";
import Battery from "./Battery";

function Status(prop) {
  const { status, battery } = prop;
  return (
    <div
      style={{
        width: "500px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <div>
        <p>전방 기울기 : {status.pitch}</p>
        <p>측방 기울기 : {status.roll}</p>
        <p>현재 각도 : {status.yaw}</p>
        <p>높이 : {status.height}</p>
      </div>
      <Battery battery={battery} status={status} />
    </div>
  );
}

export default Status;
