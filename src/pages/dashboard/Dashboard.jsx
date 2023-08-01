import React from "react";
import DashboardTabs from "../../components/shared/tabs/DashboardTabs";
import CustomerTable from "../../components/tables/CustomerTable";
import Sales from "./Sales";

function Dashboard() {
  // const { userData } = useSelector((state) => state.auth);

  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <DashboardTabs></DashboardTabs>
      <div className="mt-3 h-full">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <Sales></Sales>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden h-full"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <CustomerTable></CustomerTable>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
