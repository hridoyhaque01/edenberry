import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReasonModal from "../../components/modals/ReasonModal";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import RequestTabs from "../../components/shared/tabs/RequestTabs";
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
  const [reason, setReason] = useState("");

  const { isLoading, isError, midwives, isSuccess } = useSelector(
    (state) => state.midwives
  );

  const {
    isLoading: isSeekHelpLoading,
    isError: isSeekHelpError,
    seekHelps,
    isSuccess: isSeekHelpSuccess,
  } = useSelector((state) => state.seekHelps);

  const dispatch = useDispatch();

  console.log(midwives);

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
      </div>
    </div>
  );
}

export default Request;
