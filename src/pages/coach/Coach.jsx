import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoachTabs from "../../components/shared/tabs/CoachTabs";
import ApprovedCoachTable from "../../components/tables/ApprovedCoachTable";
import CoachTable from "../../components/tables/CoachTable";
import AddCoach from "./AddCoach";

function Coach() {
  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <CoachTabs></CoachTabs>
      <div className="mt-3 h-full">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className="h-full"
        >
          <CoachTable
            infoNotify={infoNotify}
            errorNotify={errorNotify}
          ></CoachTable>
        </div>

        <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <AddCoach
            errorNotify={errorNotify}
            infoNotify={infoNotify}
          ></AddCoach>
        </div>
        <div
          id="tabs-with-underline-4"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-4"
        >
          <ApprovedCoachTable
            errorNotify={errorNotify}
            infoNotify={infoNotify}
          ></ApprovedCoachTable>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Coach;
