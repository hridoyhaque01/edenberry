import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../../components/shared/loaders/RequestLoader";

const ForgetPasword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useParams();
  const navigate = useNavigate();
  const [isStrong, setIsStrong] = useState(false);

  function checkPasswordStrength(event) {
    const password = event.target.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLength = password.length >= 8;
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasLength &&
      hasSpecialSymbol
    ) {
      setIsStrong(true);
    } else {
      setIsStrong(false);
    }
  }

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

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      return errorNotify("password doesn't match");
    }
    const data = {
      email: email,
      newPassword: password,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    setIsLoading(true);

    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/reset`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (result.ok) {
        const data = await result.json();
        const modifiedCount = data.modifiedCount;
        if (modifiedCount > 0) {
          infoNotify("password update successfull!");
          navigate("/login");
          form.reset();
        } else {
          errorNotify("Failed to update Password");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      errorNotify("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen bg-authBg bg-no-repeat bg-cover bg-whiteSemi w-full px-6 font-ubuntu">
      <div className="w-full h-full px-6 flex items-center justify-center overflow-hidden ">
        <div className="">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-bold mt-2">
              Reset Your Password
            </h1>
          </div>

          <div className=" w-full max-w-[30rem] py-12 px-6 sm:px-10 rounded-lg bg-white shadow-sm mx-auto">
            <form
              className="flex flex-col w-full gap-4 "
              onSubmit={handleLogin}
            >
              <div>
                <p className="text-sm text-pureBlackColor font-bold mb-2">
                  New Password
                </p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full p-3 rounded-md"
                  autoComplete="off"
                  onChange={(e) => checkPasswordStrength(e)}
                />
                {!isStrong && (
                  <p className="text-[10px]">
                    must contain more than 7 character with uppercase,
                    lowercase, symble and number
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-pureBlackColor font-bold mb-2">
                  Confirm Password
                </p>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full p-3 rounded-md"
                  autoComplete="off"
                />
              </div>

              <button
                className="mt-4 mb-6 py-3.5 rounded-full bg-primaryColor text-white border-0 font-bold"
                type="submit"
                disabled={isLoading || !isStrong}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
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
        {isLoading && <RequestLoader></RequestLoader>}
      </div>
    </section>
  );
};

export default ForgetPasword;
