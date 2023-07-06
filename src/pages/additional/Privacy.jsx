import React, { useEffect, useRef } from "react";

function Privacy() {
  const text = "hellow";
  const textRef = useRef();

  useEffect(() => {
    if (text) {
      textRef.current.innerHTML = text;
    }
  }, [text]);

  return (
    <div className="">
      <div className="flex items-center gap-6">
        <h4 className="text-2xl font-bold text-black font-mont">
          Privacy Policy
        </h4>
        <button type="button" data-hs-overlay="#privacy-modal">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="edit">
              <path
                id="Vector"
                d="M16 22.0723H6C3.582 22.0723 2.25 20.7403 2.25 18.3223V8.32227C2.25 5.90427 3.582 4.57227 6 4.57227H9C9.414 4.57227 9.75 4.90827 9.75 5.32227C9.75 5.73627 9.414 6.07227 9 6.07227H6C4.423 6.07227 3.75 6.74527 3.75 8.32227V18.3223C3.75 19.8993 4.423 20.5723 6 20.5723H16C17.577 20.5723 18.25 19.8993 18.25 18.3223V15.3223C18.25 14.9083 18.586 14.5723 19 14.5723C19.414 14.5723 19.75 14.9083 19.75 15.3223V18.3223C19.75 20.7403 18.418 22.0723 16 22.0723Z"
                fill="#F3BDB6"
              />
              <path
                id="Vector_2"
                d="M20.5691 7.40247L18.6791 9.28248L15.0391 5.64249L16.9191 3.75248C17.4891 3.18248 18.3991 3.1825 18.9691 3.7425L20.5791 5.35248C21.1391 5.92248 21.1391 6.83247 20.5691 7.40247Z"
                fill="#F3BDB6"
              />
              <path
                id="Vector_3"
                opacity="0.4"
                d="M18.68 9.28207L11.61 16.3221H8V12.7121L15.04 5.64209L18.68 9.28207Z"
                fill="#F3BDB6"
              />
            </g>
          </svg>
        </button>
      </div>
      {text && (
        <>
          <div ref={textRef}></div>
        </>
      )}
    </div>
  );
}

export default Privacy;
