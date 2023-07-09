import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditButton from "../../components/shared/button/EditButton";
import SearchLoader from "../../components/shared/loaders/SearchLoader";

function Privacy() {
  const { isLoading, isError, privacyPolicies } = useSelector(
    (state) => state.privacyPolicies
  );

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [showLoader]);

  let content = null;

  if (isLoading) {
    content = <SearchLoader />;
  } else if (!isLoading && isError) {
    content = <div className="text-errorColor">Something went wrong!</div>;
  } else if (!isLoading && !isError && !privacyPolicies?._id) {
    content = <div className="">No data found!</div>;
  } else if (!isLoading && !isError && privacyPolicies?._id) {
    if (showLoader) {
      content = <SearchLoader />;
    } else {
      content = (
        <iframe
          src={privacyPolicies?.privacyPolicyLink}
          frameBorder="0"
          className="w-full h-full"
        />
      );
    }
  }

  return (
    <div className="h-full relative">
      <div className="h-full w-full border border-fadeReg">{content}</div>
      <div className="absolute bottom-4 right-8">
        <EditButton popup="#privacy-modal" />
      </div>
    </div>
  );
}

export default Privacy;
