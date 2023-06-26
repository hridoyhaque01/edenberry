import React from "react";
import RequestTabs from "../../components/shared/tabs/RequestTabs";
import Title from "../../components/shared/titles/Title";

import RequestTable from "../../components/tables/RequestTable";
import data from "../../utils/data.json";

function Request() {
  const { midwifeConcierge, helpSupports } = data || {};

  const filterMidwifeData = midwifeConcierge?.filter(
    (item) => item?.status === "pending"
  );
  const filterHelpSupports = helpSupports?.filter(
    (item) => item?.status === "pending"
  );

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
          <RequestTable
            data={filterMidwifeData}
            dropdownMenus={dropdownMenus}
          ></RequestTable>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <RequestTable
            data={filterHelpSupports}
            dropdownMenus={dropdownMenus}
          ></RequestTable>
        </div>
      </div>
    </div>
  );
}

export default Request;
