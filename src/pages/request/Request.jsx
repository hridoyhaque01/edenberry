import React from "react";
import RequestTabs from "../../components/shared/tabs/RequestTabs";
import Title from "../../components/shared/titles/Title";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestTable from "../../components/tables/RequestTable";
import {
  fetchMidWives,
  updateMidWives,
} from "../../features/midwives/midWiveSlice";

function Request() {
  const { isLoading, isError, midwives, isSuccess } = useSelector(
    (state) => state.midwives
  );

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

  if (isLoading) {
    midwiveContent = <div>Loading...</div>;
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
      ></RequestTable>
    );
  }

  useEffect(() => {
    dispatch(fetchMidWives());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchMidWives());
    }
  }, [isSuccess]);

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
          <RequestTable dropdownMenus={dropdownMenus}></RequestTable>
        </div>
      </div>
    </div>
  );
}

export default Request;
