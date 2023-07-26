import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrivacy,
  updatePrivacy,
} from "../../features/privacy/privacySlice";

function PrivacyPolicyModal() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.privacyPolicies);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const privacyPolicyLink = form.privacyPolicyLink.value;
    const formData = new FormData();
    formData.append("data", JSON.stringify({ privacyPolicyLink }));
    dispatch(updatePrivacy({ token: userData?.token, formData }));
    form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchPrivacy());
    }
  }, [isSuccess, dispatch]);
  return (
    <div
      id="privacy-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[44rem] z-20 bg-white h-auto overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              Edit Privacy Policy
            </span>
            <button
              type="button"
              className="flex items-center justify-center max-w-max text-white"
              data-hs-overlay="#privacy-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="w-full p-8">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-mont font-semibold text-black capitalize">
                  Privacy policy Link
                </span>
                <input
                  required
                  type="text"
                  placeholder="Enter privacy policy link"
                  name="privacyPolicyLink"
                  className="w-full outline-none border border-fadeMid bg-transparent p-3 rounded-md text-sm placeholder:text-fadeSemi text-black"
                />
              </div>
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-secondaryColor px-6 py-3 text-white font-semibold capitalize rounded-md"
                  data-hs-overlay="#privacy-modal"
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyModal;
