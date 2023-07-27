import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin, updateAdmin } from "../../features/admin/adminSlice";

function StaffModal({ staff, infoNotify, errorNotify, setLoading }) {
  const {
    _id: id,
    email,
    firstName,
    lastName,
    permissions: staffPermissions,
  } = staff || {};
  const dispatch = useDispatch();
  const [isStrong, setIsStrong] = useState(false);
  const { userData } = useSelector((state) => state.auth);
  const [password, setPassword] = useState();
  const [permissions, setPermissions] = useState([]);

  const handleCheckbox = (event) => {
    if (event?.target?.checked) {
      setPermissions((prevPermissions) => [
        ...prevPermissions,
        event.target.name,
      ]);
    } else {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== event.target.name)
      );
    }
  };

  function checkPasswordStrength(event) {
    const password = event.target.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLength = password.length >= 8;
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    setPassword(password);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName?.value;
    const lastName = form.lastName?.value;
    const email = form.email?.value;
    const password = form.password?.value;

    const data = {
      firstName,
      lastName,
      email,

      permissions,
    };

    if (password && !isStrong) {
      return errorNotify("Password not strong");
    } else if (password && isStrong) {
      data.password = password;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      await dispatch(updateAdmin({ token: userData?.token, formData, id }));
      await dispatch(fetchAdmin(userData?.token));
      infoNotify("Update staff successfull");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorNotify("Update staff failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (staffPermissions?.length > 0) {
      setPermissions(staffPermissions);
    }
  }, [staffPermissions]);

  return (
    <div
      id="staff-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[50rem] z-20 bg-white h-[calc(100%-8rem)] overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              Update Staff Data
            </span>
            <button
              type="button"
              className="flex items-center justify-center max-w-max text-white"
              data-hs-overlay="#staff-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="w-full p-8">
            <form
              action=""
              className="flex flex-col gap-6 mt-11"
              onSubmit={handleSubmit}
            >
              {/* names  */}
              <div className="grid grid-cols-2 gap-6 items-center ">
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-mont font-semibold text-black">
                    First name
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className={`w-full outline-none border border-fadeMid  bg-transparent p-3 rounded-md text-sm placeholder:text-fadeSemi text-black `}
                    defaultValue={firstName}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-mont font-semibold text-black">
                    last name
                  </span>
                  <input
                    required
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
                    defaultValue={lastName}
                  />
                </div>
              </div>

              {/* email name  */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-mont font-semibold text-black">
                  email
                </span>
                <input
                  required
                  type="email"
                  placeholder="Enter email address"
                  name="email"
                  className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                  defaultValue={email}
                />
              </div>

              {/* phone number  */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-mont font-semibold text-black">
                  password
                </span>
                <div>
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                    onChange={(e) => checkPasswordStrength(e)}
                  />
                  {!isStrong && (
                    <p className="text-[12px] mt-1">
                      must contain more than 7 character with uppercase,
                      lowercase, symble and number
                    </p>
                  )}
                </div>
              </div>

              {/* Permissions  */}
              <div className="text-left ">
                <p className="font-semibold text-xs text-blackHigh">
                  Permissions
                </p>

                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-2 text-blackHigh">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="services"
                      id="editservices"
                      onChange={handleCheckbox}
                      checked={permissions?.includes("services")}
                    />
                    <label className="cursor-pointer" htmlFor="editservices">
                      Services
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-blackHigh">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="coach"
                      id="editcoach"
                      onChange={handleCheckbox}
                      checked={permissions?.includes("coach")}
                    />
                    <label className="cursor-pointer" htmlFor="editcoach">
                      Coach
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-blackHigh">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="products"
                      id="products"
                      onChange={handleCheckbox}
                      checked={permissions?.includes("products")}
                    />
                    <label className="cursor-pointer" htmlFor="products">
                      Products
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-blackHigh">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="staffs"
                      id="editstaffs"
                      onChange={handleCheckbox}
                      checked={permissions?.includes("staffs")}
                    />
                    <label className="cursor-pointer" htmlFor="editstaffs">
                      Staffs
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-blackHigh">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="request"
                      id="editrequest"
                      onChange={handleCheckbox}
                      checked={permissions?.includes("request")}
                    />
                    <label className="cursor-pointer" htmlFor="editrequest">
                      Request
                    </label>
                  </div>
                  <div className="flex items-center gap-2 text-blackHigh">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="additional"
                      id="editadditional"
                      onChange={handleCheckbox}
                      checked={permissions?.includes("additional")}
                    />
                    <label className="cursor-pointer" htmlFor="editadditional">
                      additional
                    </label>
                  </div>
                </div>
              </div>
              {/* submit button  */}
              <div className="flex items-center justify-end mt-6">
                <button
                  className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
                  type="submit"
                  data-hs-overlay={
                    password && !isStrong ? "edsds" : "#staff-modal"
                  }
                >
                  Save & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffModal;
