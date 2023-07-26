import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../../components/shared/loaders/RequestLoader";
import { register } from "../../../features/auth/authSlice";

const Register = () => {
  const { isLoading, isRegisterError, isRegisterSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isStrong, setIsStrong] = useState(false);

  const notify = (message) =>
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

  function checkPasswordStrength(event) {
    const password = event.target.value;
    console.log(password);
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

  const handleRegistration = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    const timestamp = Date.now().toString();

    if (password !== confirmpassword) {
      notify("Password does not match!");
      return;
    } else {
      const data = {
        firstName,
        lastName,
        email,
        password,
        status: "active",
        permissions: [
          "services",
          "coach",
          "products",
          "staffs",
          "request",
          "additional",
        ],
        timestamp,
      };
      console.log(data);
      dispatch(register(data));
    }
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/login");
    } else if (isRegisterError) {
      notify("Something went wrong!");
    }
  }, [isRegisterSuccess, isRegisterError]);

  return (
    <section className="h-screen bg-authBg bg-no-repeat bg-cover bg-whiteSemi flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <div className="text-center mb-10">
          <h4 className="text-3xl text-primaryColor">Welcome back!</h4>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-bold mt-2">
            Register Admin
          </h1>
        </div>
        <div className="flex items-center justify-center py-12 px-10 bg-whiteHigh rounded-lg w-[476px]">
          <form
            className="flex flex-col w-full gap-4 "
            onSubmit={handleRegistration}
          >
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                First Name
              </p>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full text-black"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Last Name
              </p>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full text-black"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Your E-mail
              </p>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full text-black"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Password
              </p>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full text-black"
                autoComplete="off"
                onChange={(e) => checkPasswordStrength(e)}
              />
              {!isStrong && (
                <p className="text-[10px]">
                  must contain more than 7 character with uppercase, lowercase,
                  symble and number
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Confirm Password
              </p>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Enter confirm password"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full text-black"
                autoComplete="off"
              />
            </div>

            <button
              className="mt-4 mb-6 py-3.5 rounded-full bg-primaryColor text-whiteHigh border-0 "
              type="submit"
              disabled={isLoading || !isStrong}
            >
              {/* <img className="w-12" src={loginBtn} alt="login button" /> */}
              Register
            </button>
          </form>
        </div>
      </div>
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
      {isLoading && <RequestLoader></RequestLoader>}
    </section>
  );
};

export default Register;
