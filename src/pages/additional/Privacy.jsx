import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditButton from "../../components/shared/button/EditButton";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import SearchLoader from "../../components/shared/loaders/SearchLoader";

function Privacy() {
  const {
    isLoading,
    isError,
    privacyPolicies,
    isRequestLoading,
    isResponseError,
    isSuccess,
  } = useSelector((state) => state.privacyPolicies);

  const [showLoader, setShowLoader] = useState(true);

  const errorNotify = () =>
    toast.error("Privacy policy update failed!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = () =>
    toast.info("Privacy policy update successfull", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (isResponseError) {
      errorNotify();
    } else if (isSuccess) {
      infoNotify();
    }
  }, [isResponseError, isSuccess]);

  console.log(isSuccess);

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
    content = <div className="p-3">Something went wrong!</div>;
  } else if (!isLoading && !isError && !privacyPolicies?._id) {
    content = <div className="p-3">No data found!</div>;
  } else if (!isLoading && !isError && privacyPolicies?._id) {
    console.log(privacyPolicies);
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
      {isRequestLoading && <RequestLoader></RequestLoader>}
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default Privacy;
