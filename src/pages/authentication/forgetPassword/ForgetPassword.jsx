import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../../components/shared/loaders/RequestLoader";

const ForgetPasword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const formData = new FormData();
    formData.append("data", JSON.stringify({ email }));
    setIsLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/reset`, {
        method: "POST",
        body: formData,
      });
      setIsLoading(false);
      infoNotify("Request sent successfully");
      event.target.reset();
    } catch (error) {
      setIsLoading(false);
      errorNotify("Request failed");
    }
  };

  return (
    <section className="h-screen bg-authBg bg-no-repeat bg-cover bg-whiteSemi w-full px-6">
      <div className="w-full h-full px-6 flex items-center justify-center overflow-hidden ">
        <div className="">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-bold mt-2">
              Reset Your Password
            </h1>
          </div>

          <div className=" w-full max-w-[30rem] py-12 px-10 rounded-lg bg-white shadow-sm mx-auto">
            <form
              className="flex flex-col w-full gap-4 "
              onSubmit={handleSubmit}
            >
              <div>
                <p className="text-sm text-pureBlackColor font-bold mb-2">
                  Your E-mail
                </p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full"
                />
              </div>
              <button
                className="mt-4 mb-6 py-3.5 rounded-full bg-primaryColor text-whiteHigh border-0 "
                type="submit"
                disabled={isLoading}
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
        {isLoading && <RequestLoader></RequestLoader>}
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
    </section>
  );
};

export default ForgetPasword;
