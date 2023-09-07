import React from "react";

function ReasonModal({ reason }) {
  return (
    <section>
      <input type="checkbox" id="reasonPopup" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box flex flex-col max-h-[30rem] overflow-auto  bg-white">
          <div>
            <div className="w-full flex items-center justify-between">
              <h4 className="text-md font-semibold">Request reason</h4>
              <label
                htmlFor="reasonPopup"
                className="cursor-pointer h-8 w-8 bg-secondaryLight rounded-full flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-errorColor text-sm">
                  close
                </span>
              </label>
            </div>
            <div className="w-full mt-4">
              <p className="mt-3">{reason}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReasonModal;
