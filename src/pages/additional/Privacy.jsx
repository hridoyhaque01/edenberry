import React, { useEffect, useRef } from "react";

function Privacy() {
  const text = "";
  const textRef = useRef();

  useEffect(() => {
    console.log(text);
    textRef.current.innerHTML = text;
  }, [text]);

  return <div ref={textRef}></div>;
}

export default Privacy;
