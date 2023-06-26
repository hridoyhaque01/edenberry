import React from "react";
import AditionalTabs from "../../components/shared/tabs/AditionalTabs";
import Title from "../../components/shared/titles/Title";

function Products() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <AditionalTabs></AditionalTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          aditional data
        </div>
      </div>
    </div>
  );
}

export default Products;
