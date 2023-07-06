import React from "react";
import CoachTabs from "../../components/shared/tabs/CoachTabs";
import Title from "../../components/shared/titles/Title";
import CoachTable from "../../components/tables/CoachTable";
import AddCoach from "./AddCoach";

function Coach() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <CoachTabs></CoachTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <CoachTable></CoachTable>
        </div>

        <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <AddCoach></AddCoach>
        </div>
      </div>
    </div>
  );
}

export default Coach;
