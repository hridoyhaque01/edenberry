import React from "react";
import DashboardTabs from "../../components/shared/tabs/DashboardTabs";
import Title from "../../components/shared/titles/Title";
import CustomerTable from "../../components/tables/CustomerTable";
import Sales from "./Sales";
import Stockes from "./Stockes";

function Dashboard() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <DashboardTabs></DashboardTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <Sales></Sales>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <CustomerTable></CustomerTable>
        </div>
        <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <Stockes></Stockes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
