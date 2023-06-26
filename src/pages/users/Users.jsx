import React from "react";
import UserTabs from "../../components/shared/tabs/UsersTabs";
import Title from "../../components/shared/titles/Title";
import UsersTable from "../../components/tables/UsersTable";
import AddUser from "./AddUser";

function Users() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <UserTabs></UserTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <UsersTable></UsersTable>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <AddUser></AddUser>
        </div>
      </div>
    </div>
  );
}

export default Users;
