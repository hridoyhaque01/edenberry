import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../features/auth/authSlice";

const Login = () => {
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

  console.log(userData);

  console.log(isLoading);

  return (
    <section className="h-screen bg-authBg bg-no-repeat bg-cover bg-whiteSemi flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <div className="text-center mb-10">
          <h4 className="text-3xl text-primaryMain">Welcome back!</h4>
          <h1 className="text-5xl text-pureBlackColor font-bold">
            Login to continue
          </h1>
        </div>
        <div className="flex items-center justify-center py-12 px-10 bg-whiteHigh rounded-lg w-[476px]">
          <form className="flex flex-col w-full gap-4 " onSubmit={handleLogin}>
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                placeholder="Password"
                className=" bg-whiteLow "
              />
              <p className="text-blackSemi">Remeber me</p>
            </div>
            <button
              className="btn normal-case mt-4 mb-6 rounded-full bg-primaryMain text-whiteHigh border-0 hover:bg-primaryMain"
              type="submit"
              disabled={isLoading}
            >
              {/* <img className="w-12" src={loginBtn} alt="login button" /> */}
              Login
            </button>

            <div className="text-center">
              <Link to="/" className="text-lg text-primaryMain font-bold">
                Forget Password?
              </Link>
            </div>
            {isError && <p>{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
