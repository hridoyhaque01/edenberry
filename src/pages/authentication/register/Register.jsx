import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../../features/auth/authSlice";

const Register = () => {
  const [matchError, setMatchError] = useState(false);
  const { isLoading, isError, isRegisterSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;

    if (password !== confirmpassword) {
      return setMatchError(true);
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
      };
      dispatch(register(data));
    }
  };

  useEffect(() => {
    if (isRegisterSuccess) {
      navigate("/login");
    }
  }, [isRegisterSuccess]);

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
                placeholder="first name here..."
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Last Name
              </p>
              <input
                type="text"
                name="lastName"
                placeholder="last name here..."
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Your E-mail
              </p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Password
              </p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full"
                autoComplete="off"
              />
            </div>
            <div>
              <p className="text-sm text-pureBlackColor font-bold mb-2">
                Confirm Password
              </p>
              <input
                type="password"
                name="confirmpassword"
                placeholder="confirm password here"
                required
                className="input bg-transparent border border-darkSemi focus:outline-none w-full"
                autoComplete="off"
              />
            </div>
            {/* <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                placeholder="Password"
                className=" bg-whiteLow "
              />
              <p className="text-blackSemi">Remeber me</p>
            </div> */}
            <button
              className="mt-4 mb-6 py-3.5 rounded-full bg-primaryColor text-whiteHigh border-0 "
              type="submit"
              disabled={isLoading}
            >
              {/* <img className="w-12" src={loginBtn} alt="login button" /> */}
              Register
            </button>

            {matchError && (
              <p className="text-errorColor">password does not match</p>
            )}
            {isError && <p className="text-errorColor">something wen wrong!</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
