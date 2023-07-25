import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import { addAdmin, fetchAdmin } from "../../features/admin/adminSlice";

export default function AddStaff() {
  const dispatch = useDispatch();
  const { isRequestLoading, isResponseError, isSuccess } = useSelector(
    (state) => state.admins
  );

  const { userData } = useSelector((state) => state.auth);
  const formRef = useRef();
  const [permissions, setPermissions] = useState([]);

  const handleCheckbox = (event) => {
    if (event?.target?.checked) {
      setPermissions([...permissions, event.target.name]);
    } else {
      const index = permissions?.indexOf(event.target.name);
      if (index !== -1) {
        permissions?.splice(index, 1);
      }
    }
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName?.value;
    const lastName = form.lastName?.value;
    const email = form.email?.value;
    const password = form.password?.value;

    if (permissions?.length === 0) {
      notify("Please select permissons");
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      status: "active",
      permissions,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    dispatch(addAdmin({ token: userData?.token, data }));
  };

  useEffect(() => {
    if (isSuccess) {
      formRef.current.reset();
      dispatch(fetchAdmin(userData?.token));
    }
  }, [dispatch, isSuccess, userData?.token]);

  return (
    <section className="pb-10">
      <div className="p-8 border border-blueLight rounded-xl shadow-sm">
        <h4 className="text-xl font-mont font-bold text-black">Add users</h4>

        <form
          action=""
          className="flex flex-col gap-6 mt-11"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {/* names  */}
          <div className="grid grid-cols-2 gap-6 items-center ">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black capitalize">
                First name
              </span>
              <input
                required
                type="text"
                placeholder="Enter first name"
                name="firstName"
                className={`w-full outline-none border border-fadeMid  bg-transparent p-3 rounded-md text-sm placeholder:text-fadeSemi text-black `}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black capitalize">
                last name
              </span>
              <input
                required
                type="text"
                placeholder="Enter last name"
                name="lastName"
                className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
              />
            </div>
          </div>

          {/* email name  */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-mont font-semibold text-black capitalize">
              email
            </span>
            <input
              required
              type="email"
              placeholder="Enter email address"
              name="email"
              className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
            />
          </div>

          {/* phone number  */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-mont font-semibold text-black capitalize">
              password
            </span>
            <input
              required
              type="password"
              placeholder="Enter password"
              name="password"
              className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
            />
          </div>

          {/* role  */}
          <div className="text-left ">
            <p className="font-semibold text-xs text-blackHigh">Permissions</p>

            <div className="flex items-center gap-10 mt-6">
              <div className="flex items-center gap-2 text-blackHigh">
                <input
                  type="checkbox"
                  name="services"
                  id="services"
                  className="checkbox"
                  onChange={handleCheckbox}
                  defaultChecked={permissions?.includes("services")}
                />
                <label className="cursor-pointer" htmlFor="services">
                  Services
                </label>
              </div>
              <div className="flex items-center gap-2 text-blackHigh">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="coach"
                  id="coach"
                  onChange={handleCheckbox}
                  defaultChecked={permissions?.includes("coach")}
                />
                <label className="cursor-pointer" htmlFor="coach">
                  Coach
                </label>
              </div>
              <div className="flex items-center gap-2 text-blackHigh">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="products"
                  id="staffProducts"
                  onChange={handleCheckbox}
                  defaultChecked={permissions?.includes("products")}
                />
                <label className="cursor-pointer" htmlFor="staffProducts">
                  Products
                </label>
              </div>
              <div className="flex items-center gap-2 text-blackHigh">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="staffs"
                  id="staffs"
                  onChange={handleCheckbox}
                  defaultChecked={permissions?.includes("staffs")}
                />
                <label className="cursor-pointer" htmlFor="staffs">
                  Staffs
                </label>
              </div>
              <div className="flex items-center gap-2 text-blackHigh">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="request"
                  id="request"
                  onChange={handleCheckbox}
                  defaultChecked={permissions?.includes("request")}
                />
                <label className="cursor-pointer" htmlFor="request">
                  Request
                </label>
              </div>
              <div className="flex items-center gap-2 text-blackHigh">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="additional"
                  id="additional"
                  onChange={handleCheckbox}
                  defaultChecked={permissions?.includes("additional")}
                />
                <label className="cursor-pointer" htmlFor="additional">
                  Additional
                </label>
              </div>
            </div>
          </div>
          {/* submit button  */}
          <div className="flex items-center justify-end mt-6">
            <button
              disabled={isRequestLoading}
              className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
              type="submit"
            >
              Save & Update
            </button>
          </div>
        </form>
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
      {isResponseError && (
        <div className="text-errorColor">Something went wrong!</div>
      )}
      {isRequestLoading && <RequestLoader></RequestLoader>}
    </section>
  );
}
