import React from "react";
import "react-quill/dist/quill.snow.css";
import PrivacyPolicyModal from "../../components/modals/PrivacyPolicyModal";
import AditionalTabs from "../../components/shared/tabs/AditionalTabs";
import Privacy from "./Privacy";

function Additional() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
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

export default Additional;
