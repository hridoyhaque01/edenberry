import React from "react";

function ReasonModal({ reason }) {
  return (
    <section>
      <input type="checkbox" id="reasonPopup" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box flex flex-col items-center justify-center  bg-white">
          <div className=" flex items-center justify-end w-full">
            <label htmlFor="reasonPopup" className="cursor-pointer">
              <span className="material-symbols-outlined text-errorColor">
                close
              </span>
            </label>
          </div>
          <div className="w-full">
            <h4 className="text-md font-semibold">Request reason</h4>
            <p className="mt-3">{reason}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReasonModal;
