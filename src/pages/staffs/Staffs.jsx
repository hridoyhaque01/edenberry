import React from "react";
import { useSelector } from "react-redux";
import StaffModal from "../../components/modals/StaffModal";
import StaffTabs from "../../components/shared/tabs/StaffTabs";
import StaffTable from "../../components/tables/StaffsTable";
import AddStaff from "./AddStaff";

function Staffs() {
  const { activeStaff } = useSelector((state) => state.admins);

  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <StaffTabs></StaffTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <StaffTable></StaffTable>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <AddStaff></AddStaff>
        </div>
      </div>
      <div>
        <StaffModal staff={activeStaff}></StaffModal>
      </div>
    </div>
  );
}

export default Staffs;
