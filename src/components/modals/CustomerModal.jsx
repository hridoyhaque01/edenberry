import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
// import { updateUserData } from "../../features/users/usersSlice";
import axios from "axios";
import { useEffect } from "react";
import {
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../features/users/usersSlice";
import getCompresedImage from "../../utils/getCompresedImage";
import { avater } from "../../utils/getImages";
import { default as getFormattedDate } from "../../utils/getIsoDateString";
import ConfirmationModal from "./ConfirmationModal";

// eslint-disable-next-line react/prop-types
export default function CustomerModal({
  userData,
  errorNotify,
  infoNotify,
  setIsReuestLoading,
}) {
  const {
    babysName,
    customerNote: initialNote,
    pregnancyDueDate,
    email,
    fileUrl,
    partnerName,
    firstName,
    lastName,
    apparelSize,
    billingCity,
    billingZip,
    phoneNumber,
    shippingAddress1,
    shippingAddress2,
    babysBirthday,
    midwifeName,
    midwifeId,
    country,
    concerns,
  } = userData || {};

  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [babyBirthDate, setBabyBirthDate] = useState(null);
  const [midwife, setMidwife] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [midwives, setMidwives] = useState([]);
  const profileRef = useRef();
  const noteRef = useRef();
  const sizeRef = useRef();
  const dispatch = useDispatch();
  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setProfile(file);
      const imageURL = URL.createObjectURL(file);
      setProfilePreview(imageURL);
    } else {
      setProfile(null);
    }
  };

  const handleProfileDelete = () => {
    profileRef.current.value = "";
    setProfile(null);
    setProfilePreview(null);
  };

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const partnerName = form.partnerName.value;
    const babysName = form.babysName.value;
    const email = form.email.value;
    const apparelSize = form.apparelSize.value;
    const phoneNumber = form.phone.value;
    const data = {
      firstName,
      lastName,
      customerNote,
      partnerName,
      babysName,
      email,
      apparelSize,
      phoneNumber,
      pregnancyDueDate: dueDate,
      babysBirthday: babyBirthDate,
    };
    const formData = new FormData();
    let file = null;

    setIsReuestLoading(true);

    if (profile) {
      file = await getCompresedImage(profile);
      formData.append(`files`, file);
    }
    formData.append("data", JSON.stringify(data));
    dispatch(updateUser({ id: userData?._id, formData }))
      .unwrap()
      .then((res) => {
        dispatch(fetchUsers())
          .unwrap()
          .then((res) => {
            setIsReuestLoading(false);
            infoNotify("User update successfull");
          });
      })
      .catch((error) => {
        setIsReuestLoading(false);
        errorNotify("User update failed");
      });
  };

  const handleBilling = async (event) => {
    event.preventDefault();
    const form = event.target;
    const shippingAddress1 = form.shippingAddress1.value;
    const shippingAddress2 = form.shippingAddress2.value;
    const billingCity = form.billingCity.value;
    const billingZip = form.billingZip.value;
    const country = form.country.value;
    const data = {
      shippingAddress1,
      shippingAddress2,
      billingCity,
      billingZip,
      country,
    };
    const formData = new FormData();
    setIsReuestLoading(true);

    try {
      formData.append("data", JSON.stringify(data));
      await dispatch(updateUser({ id: userData?._id, formData }));
      await dispatch(fetchUsers());
      setIsReuestLoading(false);
      infoNotify("Update shipping  successfull");
    } catch (error) {
      console.log(error);
      setIsReuestLoading(false);
      errorNotify("update shipping failed");
    }
  };

  const handleAssignedMidwife = async (event) => {
    event.preventDefault();
    const splitMidwife = midwife?.split("-");
    const midwifeName = splitMidwife[0];
    const midwifeId = splitMidwife[1];
    const data = { midwifeName, midwifeId };
    setIsReuestLoading(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
      await dispatch(updateUser({ id: userData?._id, formData }));
      await dispatch(fetchUsers());
      setIsReuestLoading(false);
      infoNotify("Assign midwife successfull");
    } catch (error) {
      console.log(error);
      setIsReuestLoading(false);
      infoNotify("Assign midwife failed");
    }
  };

  const handleUserDelete = async () => {
    setIsReuestLoading(true);
    true;

    dispatch(deleteUser(userData?._id))
      .unwrap()
      .then((res) => {
        dispatch(fetchUsers());
        infoNotify("Delete user successfull");
        setIsReuestLoading(false);
      })
      .catch((err) => {
        console.log(err);
        errorNotify("Delete user failed");
        setIsReuestLoading(false);
      });
  };

  const handleDate = (event) => {
    const value = event.target.value;
    setDueDate(value);
  };

  const handleBabyBirthday = (event) => {
    const value = event.target.value;
    setBabyBirthDate(value);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1200) {
      setCustomerNote(value);
    }
  };

  const fetchBookingMidwives = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/midwives`
      );
      const result = await response?.data;
      setMidwives(result);
      console.log(result);
    } catch (error) {
      setMidwives([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      noteRef.current.value = initialNote || "";
      sizeRef.current.value = apparelSize || "";
      setCustomerNote(initialNote);
      setDueDate(pregnancyDueDate);
      setBabyBirthDate(babysBirthday);
      setProfilePreview(fileUrl);
      const midwife =
        midwifeName && midwifeId ? `${midwifeName}-${midwifeId}` : "";
      setMidwife(midwife);
      fetchBookingMidwives();
    }
  }, [userData?._id]);

  return (
    <>
      <div
        id="hs-scroll-inside-body-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-hidden "
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all max-w-screen-xl m-3 sm:mx-auto h-[calc(100%-3.5rem)]">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight shadow-sm rounded-xl relative">
            <div className="p-8 overflow-y-auto">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-dark">Account</h2>
                  <p className="text-base text-blackHigh mt-2">
                    This information can be edited from your profile page.
                  </p>
                </div>
                <div className=" ">
                  <button
                    type="button"
                    className="hs-dropdown-toggle h-8 w-8 flex items-center justify-center bg-secondaryLight rounded-full"
                    data-hs-overlay="#hs-scroll-inside-body-modal"
                    // onClick={handleClose}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="#FF6B6B"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between my-11">
                <div className="flex items-center gap-4">
                  <img
                    src={profilePreview || avater}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="text-black leading-5">
                      {firstName + " " + lastName}
                    </h4>
                    <p className="text-xs text-blackHigh mt-2">{email}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-11">
                <form
                  action="#"
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmitProfile}
                >
                  {/* profile  */}
                  <div className="flex flex-col gap-5 ">
                    <span className="text-xs font-semibold text-black capitalize">
                      PROFILE PICTURE
                    </span>
                    <div className="flex flex-col-reverse">
                      <input
                        type="file"
                        className="h-1 w-1 opacity-0  "
                        id="profile"
                        ref={profileRef}
                        onChange={handleProfileChange}
                        name="profile"
                      />
                      <div
                        className={`w-full border border-fadeMid flex justify-between rounded-md overflow-hidden bg-transparent`}
                      >
                        <div className="w-full flex items-center justify-between px-3 text-darkSemi">
                          {profile ? (
                            <>
                              <span className="select-none">
                                {profile?.name?.length > 90
                                  ? profile?.name?.slice(0, 90) + "..."
                                  : profile?.name}
                              </span>
                              <button
                                type="button"
                                className="flex items-center relative z-50"
                                onClick={handleProfileDelete}
                              >
                                <span className="material-symbols-outlined text-lg text-errorColor">
                                  cancel
                                </span>
                              </button>
                            </>
                          ) : (
                            <span className="text-sm text-fadeSemi">
                              Select profile picture
                            </span>
                          )}
                        </div>
                        <label
                          htmlFor="profile"
                          className={`py-3 px-4 inline-flex font-mont text-sm text-black border-l border-fadeSemi cursor-pointer`}
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* names  */}
                  <div className="grid grid-cols-2 gap-6 items-center ">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        First name
                      </span>
                      <input
                        required
                        id="firstname"
                        type="text"
                        placeholder="Enter first name..."
                        name="firstName"
                        className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
                        defaultValue={firstName}
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        last name
                      </span>
                      <input
                        required
                        id="lastname"
                        type="text"
                        placeholder="Enter last name..."
                        name="lastName"
                        className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
                        defaultValue={lastName}
                      />
                    </div>
                  </div>
                  {/* customer notes */}
                  <div className="flex flex-col gap-5">
                    <label
                      htmlFor="customernote"
                      className="text-xs font-mont font-semibold text-black capitalize"
                    >
                      customer notes
                    </label>
                    <div>
                      <textarea
                        id="customernote"
                        name="customerNote"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md resize-none h-32 text-sm placeholder:text-fadeSemi text-black"
                        placeholder="Enter customer note..."
                        value={customerNote}
                        onChange={(e) => handleChange(e)}
                        ref={noteRef}
                      ></textarea>
                      <p className="text-darkMid text-xs text-right">
                        ({customerNote?.length || 0}/1200)
                      </p>
                    </div>
                  </div>

                  {/* father and baby name  */}
                  <div className="grid grid-cols-2 gap-6 items-center  ">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Father’s Name
                      </span>
                      <input
                        id="partnerName"
                        type="text"
                        placeholder="Enter father name..."
                        name="partnerName"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                        defaultValue={partnerName}
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Baby’s Name
                      </span>
                      <input
                        id="babysName"
                        type="text"
                        placeholder="Enter Baby name..."
                        name="babysName"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                        defaultValue={babysName}
                      />
                    </div>
                  </div>
                  {/* email name  */}
                  <div className="flex flex-col gap-5">
                    <label
                      htmlFor="email"
                      className="text-xs font-mont font-semibold text-black capitalize"
                    >
                      email
                    </label>
                    <input
                      required
                      id="email"
                      type="email"
                      placeholder="Enter email address..."
                      name="email"
                      className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                      defaultValue={email}
                    />
                  </div>
                  {/* phone number  */}
                  <div className="flex flex-col gap-5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-mont font-semibold text-black capitalize"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="number"
                      placeholder="Enter phone number..."
                      name="phone"
                      className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                      defaultValue={phoneNumber}
                    />
                  </div>

                  {/* Due Date  */}
                  <div className="grid grid-cols-2 gap-6 items-center  ">
                    {dueDate ? (
                      <div className="flex flex-col gap-5">
                        <span className="text-xs font-mont font-semibold text-black capitalize">
                          Due Date
                        </span>
                        <input
                          id="dueDate"
                          type="date"
                          name="dueDate"
                          value={getFormattedDate(dueDate)}
                          onChange={(e) => handleDate(e)}
                          className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black`}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        <span className="text-xs font-mont font-semibold text-black capitalize">
                          Baby's Birthday
                        </span>
                        <input
                          id="dueDate"
                          type="date"
                          name="dueDate"
                          value={getFormattedDate(babyBirthDate)}
                          onChange={(e) => handleBabyBirthday(e)}
                          className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black`}
                        />
                      </div>
                    )}

                    {/* apparelSize */}
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Apparel Size
                      </span>
                      <div className="relative">
                        <select
                          className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                          name="apparelSize"
                          defaultValue={apparelSize}
                          ref={sizeRef}
                        >
                          <option value="" disabled>
                            Select Apparel size
                          </option>
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>
                          <option value="XL">XL</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* apparelSize */}
                  </div>
                  {/*                   
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-mont font-semibold text-black capitalize">
                      Assigned Midwife
                    </span>
                    <div className="relative w-full">
                      <input
                        type="text"
                        defaultValue={coachName}
                        placeholder="No coach assigned"
                        readOnly
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                      />
                    </div>
                  </div> */}

                  <div className="flex items-center justify-end mt-6">
                    <button
                      className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
                      type="submit"
                      data-hs-overlay="#hs-scroll-inside-body-modal"
                    >
                      Save & Update
                    </button>
                  </div>
                </form>

                <form action="" onSubmit={handleAssignedMidwife}>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Concerns
                      </span>
                      <div className="flex items-center gap-4">
                        {concerns?.map((concern, i) => (
                          <span
                            className="bg-aqua text-black capitalize inline-flex px-6 py-2.5 rounded-lg text-xs"
                            key={i}
                          >
                            {concern}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* apparelSize */}
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Assigned Midwife
                      </span>
                      <div className="relative">
                        <select
                          className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                          name="apparelSize"
                          value={midwife}
                          onChange={(e) => setMidwife(e.target.value)}
                        >
                          <option value="" disabled>
                            Select midwife coach
                          </option>
                          {midwives?.map((midwive) => (
                            <option
                              value={`${midwive?.name}-${midwive?._id}`}
                              key={midwive?._id}
                            >
                              {midwive?.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                      <button
                        className={`w-60 py-4  text-white text-sm font-mont font-semibold rounded-xl bg-secondaryColor`}
                        type="submit"
                        data-hs-overlay="#hs-scroll-inside-body-modal"
                      >
                        Save & Update
                      </button>
                    </div>
                  </div>
                </form>

                <form onSubmit={handleBilling}>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-black ">
                      SHIPPING ADDRESS
                    </h2>
                    {/* street name one  */}
                    <div className="flex flex-col gap-2 mt-1">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Street Name 1
                      </span>
                      <div>
                        <input
                          className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md outline-none"
                          name="shippingAddress1"
                          placeholder="Street name..."
                          defaultValue={shippingAddress1}
                        />
                      </div>
                    </div>
                    {/* street 2 name one  */}
                    <div className="flex flex-col gap-2 mt-1">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Street Name 2
                      </span>
                      <div>
                        <input
                          className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md outline-none"
                          name="shippingAddress2"
                          placeholder="Street name..."
                          defaultValue={shippingAddress2}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-mont font-semibold text-black capitalize">
                          City
                        </span>
                        <div>
                          <input
                            className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md outline-none"
                            name="billingCity"
                            placeholder="City name..."
                            defaultValue={billingCity}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <span className="text-xs font-mont font-semibold text-black capitalize">
                          Zip Code
                        </span>
                        <div>
                          <input
                            className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md outline-none"
                            name="billingZip"
                            placeholder="Zip code..."
                            defaultValue={billingZip}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Country  */}
                    <div className="flex flex-col gap-2 mt-1">
                      <span className="text-xs font-mont font-semibold text-black capitalize">
                        Country
                      </span>
                      <div>
                        <input
                          className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md outline-none"
                          name="country"
                          placeholder="Country name..."
                          defaultValue={country || "USA"}
                        />
                      </div>
                    </div>

                    {/* submit button  */}
                    <div className="flex items-center justify-between mt-6">
                      <label
                        htmlFor="confirmationPopup"
                        className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
                      >
                        Delete User
                      </label>
                      <button
                        className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
                        type="submit"
                        data-hs-overlay="#hs-scroll-inside-body-modal"
                      >
                        Save & Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <ConfirmationModal
              handleStatus={handleUserDelete}
              status="Delete"
              modalClose="#hs-scroll-inside-body-modal"
            ></ConfirmationModal>
          </div>
        </div>
      </div>
    </>
  );
}
//
