import React from "react";
import ReasonModal from "../../components/modals/ReasonModal";
import RequestTabs from "../../components/shared/tabs/RequestTabs";
import Title from "../../components/shared/titles/Title";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import RequestTable from "../../components/tables/RequestTable";
import {
  fetchMidWives,
  updateMidWives,
} from "../../features/midwives/midWiveSlice";
import {
  fetchSeekHelps,
  updateSeekHelp,
} from "../../features/seekHelps/seekHelpsSlice";

function Request() {
  const { isLoading, isError, midwives, isSuccess } = useSelector(
    (state) => state.midwives
  );
  const [reason, setReason] = useState("");

  const {
    isLoading: isSeekHelpLoading,
    isError: isSeekHelpError,
    seekHelps,
    isSuccess: isSeekHelpSuccess,
  } = useSelector((state) => state.seekHelps);

  const dispatch = useDispatch();
  const dropdownMenus = {
    activeAction: "pending",
    bgColor: "bg-secondaryLight",
    textColor: "text-redColor",
    actions: [
      {
        actionName: "approve",
        action: "approved",
        textColor: "text-greenColor",
      },
      {
        actionName: "denied",
        action: "denied",
        textColor: "text-redColor",
      },
    ],
  };

  // decide what to do

  let midwiveContent = null;
  let seekHelpContent = null;

  if (isLoading) {
    midwiveContent = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    midwiveContent = (
      <div className="text-errorColor">Something went wrong!</div>
    );
  } else if (!isLoading && !isError && midwives?.length === 0) {
    midwiveContent = <div>No data found!</div>;
  } else if (!isLoading && !isError && midwives?.length > 0) {
    midwiveContent = (
      <RequestTable
        dispatchFun={updateMidWives}
        data={midwives}
        dropdownMenus={dropdownMenus}
        setReason={setReason}
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
        dispatchFun={updateSeekHelp}
        data={seekHelps}
        dropdownMenus={dropdownMenus}
        setReason={setReason}
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
      <Title></Title>
      <RequestTabs></RequestTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          {midwiveContent}
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          {seekHelpContent}
        </div>
      </div>
      <div>
        <ReasonModal reason={reason}></ReasonModal>
      </div>
    </div>
  );
}

export default Request;
