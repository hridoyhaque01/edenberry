import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../features/auth/authSlice";

const ForgetPasword = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, userData } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const data = {
      email,
      password,
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (userData?.token) {
      navigate("/");
    }
  }, [userData?.token]);

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
              onSubmit={handleLogin}
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
              <div>
                <p className="text-sm text-pureBlackColor font-bold mb-2">
                  New Password
                </p>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full"
                  autoComplete="off"
                />
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
                  className="input bg-transparent border border-fadeReg focus:outline-none w-full"
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
                Reset Password
              </button>

              {isError && <p>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPasword;
