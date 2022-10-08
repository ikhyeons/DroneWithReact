import React from "react";
import styled from "styled-components";

function ConnectionPoto(prop) {
  const { connection } = prop;
  return (
    <div>
      <p>connection : {connection === true ? "true" : "false"}</p>
      <img
        src="https://t1.daumcdn.net/cfile/tistory/9905E9455DE5D69813"
        alt="gd"
      />
    </div>
  );
}

export default ConnectionPoto;
