import React from "react";
import "react-quill/dist/quill.snow.css";
import PrivacyPolicyModal from "../../components/modals/PrivacyPolicyModal";
import AditionalTabs from "../../components/shared/tabs/AditionalTabs";
import Title from "../../components/shared/titles/Title";
import Privacy from "./Privacy";

function Products() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <AditionalTabs></AditionalTabs>
      <div className="h-full">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className="h-full"
        >
          <Privacy></Privacy>
        </div>
      </div>
      <PrivacyPolicyModal></PrivacyPolicyModal>
    </div>
  );
}

export default Products;
