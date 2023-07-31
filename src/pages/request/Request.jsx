import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReasonModal from "../../components/modals/ReasonModal";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import RequestTabs from "../../components/shared/tabs/RequestTabs";
import RequestTable from "../../components/tables/RequestTable";

import ConfirmationModal from "../../components/modals/ConfirmationModal";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import {
  fetchMidWives,
  updateMidWives,
} from "../../features/midwives/midWiveSlice";
import {
  fetchSeekHelps,
  updateSeekHelp,
} from "../../features/seekHelps/seekHelpsSlice";

function Request() {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [data, setData] = useState({});
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

  const testData = [
    {
      id: 1,
      firstName: "best",
    },
    {
      id: 2,
      firstName: "best",
    },
  ];

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

  const [reason, setReason] = useState("");
  const { isLoading, isError, midwives, isSuccess } = useSelector(
    (state) => state.midwives
  );

  const updateMidwive = async () => {
    setIsRequestLoading(true);
    try {
      await dispatch(updateMidWives({ id: data?.id, status: data?.status }));
      setIsRequestLoading(false);
      infoNotify(`${data?.status} successfull`);
    } catch (error) {
      console.log(error);
      setIsRequestLoading(false);
      errorNotify(`${data?.status} failed`);
    }
  };

  const updateSeekHelps = async () => {
    setIsRequestLoading(true);
    try {
      await dispatch(updateSeekHelp({ id: data?.id, status: data?.status }));
      setIsRequestLoading(false);
      infoNotify(`${data?.status} successfull`);
    } catch (error) {
      console.log(error);
      setIsRequestLoading(false);
      errorNotify(`${data?.status} failed`);
    }
  };

  const {
    isLoading: isSeekHelpLoading,
    isError: isSeekHelpError,
    seekHelps,
    isSuccess: isSeekHelpSuccess,
  } = useSelector((state) => state.seekHelps);

  const dispatch = useDispatch();

  // decide what to do

  let midwiveContent = null;
  let seekHelpContent = null;

  if (isLoading) {
    midwiveContent = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    midwiveContent = (
      <div className="text-errorColor">Something went wrong!</div>
    );
  } else if (!isLoading && !isError && testData?.length === 0) {
    midwiveContent = <div>No data found!</div>;
  } else if (!isLoading && !isError && testData?.length > 0) {
    midwiveContent = (
      <RequestTable
        dispatchFun={updateMidwive}
        data={testData}
        setReason={setReason}
        errorNotify={errorNotify}
        infoNotify={infoNotify}
        setIsRequestLoading={setIsRequestLoading}
        setData={setData}
        type="midwive"
      ></RequestTable>
    );
  }

  if (isSeekHelpLoading) {
    seekHelpContent = <SearchLoader></SearchLoader>;
  } else if (!isSeekHelpLoading && isSeekHelpError) {
    midwiveContent = (
      <div className="text-errorColor">Something went wrong!</div>
    );
  } else if (
    !isSeekHelpLoading &&
    !isSeekHelpError &&
    seekHelps?.length === 0
  ) {
    seekHelpContent = <div>No data found!</div>;
  } else if (!isLoading && !isError && seekHelps?.length > 0) {
    seekHelpContent = (
      <RequestTable
        dispatchFun={updateSeekHelps}
        data={seekHelps}
        setReason={setReason}
        errorNotify={errorNotify}
        infoNotify={infoNotify}
        setIsRequestLoading={setIsRequestLoading}
        setData={setData}
        type="seekHelp"
      ></RequestTable>
    );
  }

  useEffect(() => {
    if (isSeekHelpSuccess) {
      dispatch(fetchSeekHelps());
    }
  }, [isSeekHelpSuccess, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchMidWives());
    }
  }, [isSuccess, dispatch]);

  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <RequestTabs></RequestTabs>
      <div className="mt-3 h-full">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className="h-full"
        >
          {midwiveContent}
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden h-full"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          {seekHelpContent}
        </div>
      </div>
      <div>
        <ReasonModal reason={reason}></ReasonModal>
        <ConfirmationModal
          status={data?.status}
          handleStatus={
            data?.type === "midwive" ? updateMidwive : updateSeekHelps
          }
        ></ConfirmationModal>
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
      {isRequestLoading && <RequestLoader></RequestLoader>}
    </div>
  );
}

export default Request;
