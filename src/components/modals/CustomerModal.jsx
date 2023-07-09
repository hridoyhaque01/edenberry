import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateUserData } from "../../features/users/usersSlice";
import { useEffect } from "react";
import { fetchUsers, updateUser } from "../../features/users/usersSlice";
import dateFormater from "../../utils/dateFormater";
import getIsoDateString from "../../utils/getIsoDateString";
import RequestLoader from "../shared/loaders/RequestLoader";

// eslint-disable-next-line react/prop-types
export default function CustomerModal({ userData }) {
  // const { userData } = useSelector((state) => state.users);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [profile, setProfile] = useState(null);
  const profileRef = useRef();
  const [document, setDcument] = useState(null);
  const documentRef = useRef();
  const dispatch = useDispatch();
  const [mealOneData, setMealOneData] = useState([]);
  const [mealTwoData, setMealTwoData] = useState([]);
  const [mealThreeData, setMealThreeData] = useState([]);

  const { isRequestLoading, isResponseError, isSuccess } = useSelector(
    (state) => state.users
  );

  const {
    babyName,
    customerNote,
    dueDate,
    email,
    fileUrl,
    fatherName,
    firstName,
    lastName,
    apparelSize,
    phoneNumber,
    productsFour,
    productsOne,
    productsThree,
    productsTwo,
  } = userData || {};

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setProfile(file);
    } else {
      setProfile(null);
    }
  };

  const handleProfileDelete = () => {
    profileRef.current.value = "";
    setProfile(null);
  };

  const handleDocumentChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setDcument(file);
    } else {
      setDcument(null);
    }
  };

  const handleDocumentDelete = () => {
    documentRef.current.value = "";
    setDcument(null);
  };

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    const form = event.target;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const customerNote = form.customerNote.value;
    const fatherName = form.fatherName.value;
    const babyName = form.babyName.value;
    const email = form.email.value;
    const phoneNumber = form.phone.value;
    const apparelSize = form.apparelSize.value;
    const dueDate = dateFormater(form.dueDate.value);
    const product1 = form.product1.value;
    const shipdate1 = dateFormater(form.shipdate1.value);
    const trackingNo1 = form.trackingNo1.value;
    const product2 = form.product2.value;
    const shipdate2 = dateFormater(form.shipdate2.value);
    const trackingNo2 = form.trackingNo2.value;
    const product3 = form.product3.value;
    const shipdate3 = dateFormater(form.shipdate3.value);
    const trackingNo3 = form.trackingNo3.value;
    const product4 = form.product4.value;
    const shipdate4 = dateFormater(form.shipdate4.value);
    const trackingNo4 = form.trackingNo4.value;

    const productsOne = {
      prductName: product1,
      shipmentDate: shipdate1,
      tackingNumber: trackingNo1,
    };
    const productsTwo = {
      prductName: product2,
      shipmentDate: shipdate2,
      tackingNumber: trackingNo2,
    };
    const productsThree = {
      prductName: product3,
      shipmentDate: shipdate3,
      tackingNumber: trackingNo3,
    };
    const productsFour = {
      prductName: product4,
      shipmentDate: shipdate4,
      tackingNumber: trackingNo4,
    };

    const data = {
      firstName,
      lastName,
      customerNote,
      fatherName,
      babyName,
      email,
      apparelSize,
      phoneNumber,
      dueDate,
      productsOne,
      productsTwo,
      productsThree,
      productsFour,

      status: "active",
    };
    const formData = new FormData();

    if (profile) {
      formData.append(`files`, profile);
    }
    if (document) {
      formData.append(`files`, document);
    }
    formData.append("data", JSON.stringify(data));

    dispatch(updateUser({ id: userData?._id, formData }));
  };

  const handleMealTwoPlaning = (e) => {
    if (e.target.checked) {
      setMealTwoData([...mealTwoData, e?.target?.name]);
    } else {
      const index = mealTwoData?.indexOf(e?.target?.name);
      if (index !== -1) {
        mealTwoData?.splice(index, 1);
      }
    }
  };

  const handleMealOnePlaning = (e) => {
    if (e.target.checked) {
      setMealOneData([...mealOneData, e?.target?.name]);
    } else {
      const index = mealOneData?.indexOf(e?.target?.name);
      if (index !== -1) {
        mealOneData?.splice(index, 1);
      }
    }
  };

  const handleMealThreePlaning = (e) => {
    if (e.target.checked) {
      setMealThreeData([...mealThreeData, e?.target?.name]);
    } else {
      const index = mealThreeData?.indexOf(e?.target?.name);
      if (index !== -1) {
        mealThreeData?.splice(index, 1);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchUsers());
    }
  });

  return (
    <>
      <div
        id="hs-scroll-inside-body-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-hidden "
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all max-w-screen-xl m-3 sm:mx-auto h-[calc(100%-3.5rem)]">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight shadow-sm rounded-xl ">
            <div className="text-right py-3 px-4">
              <button
                type="button"
                className="hs-dropdown-toggle "
                data-hs-overlay="#hs-scroll-inside-body-modal"
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
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            <div className="p-8 pt-0 overflow-y-auto">
              <div>
                <h2 className="text-2xl font-bold text-dark">Account</h2>
                <p className="text-base text-blackHigh mt-2">
                  This information can be edited from your profile page.
                </p>
              </div>

              <div className="flex items-center justify-between my-11">
                <div className="flex items-center gap-4">
                  <img
                    src={fileUrl}
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
                <div>
                  <button
                    type="button"
                    className="text-secondaryColor text-sm"
                    onClick={() => setComponentDisabled((prev) => !prev)}
                  >
                    Edit Profile
                  </button>
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
                    <span className="text-xs font-semibold text-black">
                      PROFILE PICTURE
                    </span>
                    <div className="flex flex-col-reverse">
                      <input
                        type="file"
                        className="h-1 w-1 opacity-0  "
                        disabled={componentDisabled}
                        id="profile"
                        ref={profileRef}
                        onChange={handleProfileChange}
                        name="profile"
                      />
                      <div
                        className={`w-full border border-fadeMid flex justify-between rounded-md overflow-hidden ${
                          componentDisabled ? "bg-disabled" : "bg-transparent"
                        }`}
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
                                disabled={componentDisabled}
                              >
                                <span className="material-symbols-outlined text-lg text-errorColor">
                                  cancel
                                </span>
                              </button>
                            </>
                          ) : (
                            <span>Name of the fille</span>
                          )}
                        </div>
                        <label
                          htmlFor="profile"
                          className={`py-3 px-4 inline-flex font-mont text-sm text-black border-l border-fadeSemi ${
                            componentDisabled ? "" : "cursor-pointer"
                          }`}
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* names  */}
                  <div className="grid grid-cols-2 gap-6 items-center ">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black">
                        First name
                      </span>
                      <input
                        required
                        id="firstname"
                        type="text"
                        placeholder="first name here..."
                        name="firstName"
                        className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black ${
                          componentDisabled ? "bg-disabled" : "bg-transparent"
                        }`}
                        readOnly={componentDisabled ? true : false}
                        defaultValue={firstName}
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black">
                        last name
                      </span>
                      <input
                        required
                        id="lastname"
                        type="text"
                        placeholder="last name here..."
                        name="lastName"
                        className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black ${
                          componentDisabled ? "bg-disabled" : "bg-transparent"
                        }`}
                        readOnly={componentDisabled ? true : false}
                        defaultValue={lastName}
                      />
                    </div>
                  </div>
                  {/* customer notes */}
                  <div className="flex flex-col gap-5">
                    <label
                      htmlFor="customernote"
                      className="text-xs font-mont font-semibold text-black"
                    >
                      customer notes
                    </label>
                    <div>
                      <textarea
                        required
                        id="customernote"
                        name="customerNote"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md resize-none h-32 text-sm placeholder:text-fadeSemi text-black"
                        placeholder="customer note here..."
                        defaultValue={customerNote}
                      ></textarea>
                      <p className="text-darkMid text-xs text-right">
                        (45/12000)
                      </p>
                    </div>
                  </div>

                  {/* father and baby name  */}
                  <div className="grid grid-cols-2 gap-6 items-center  ">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black">
                        Father’s Name
                      </span>
                      <input
                        required
                        id="fatherName"
                        type="text"
                        placeholder="father name here..."
                        name="fatherName"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                        defaultValue={fatherName}
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black">
                        Baby’s Name
                      </span>
                      <input
                        required
                        id="babyName"
                        type="text"
                        placeholder="baby name here..."
                        name="babyName"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                        defaultValue={babyName}
                      />
                    </div>
                  </div>
                  {/* email name  */}
                  <div className="flex flex-col gap-5">
                    <label
                      htmlFor="email"
                      className="text-xs font-mont font-semibold text-black"
                    >
                      email
                    </label>
                    <input
                      required
                      id="email"
                      type="email"
                      placeholder="email address here..."
                      name="email"
                      className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                      defaultValue={email}
                    />
                  </div>
                  {/* phone number  */}
                  <div className="flex flex-col gap-5">
                    <label
                      htmlFor="phone"
                      className="text-xs font-mont font-semibold text-black"
                    >
                      Phone Number
                    </label>
                    <input
                      required
                      id="phone"
                      type="number"
                      placeholder="phone number here..."
                      name="phone"
                      className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                      defaultValue={phoneNumber}
                    />
                  </div>

                  {/* Due Date  */}
                  <div className="grid grid-cols-2 gap-6 items-center  ">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-mont font-semibold text-black">
                        Due Date
                      </span>
                      <input
                        required
                        id="dueDate"
                        type="date"
                        name="dueDate"
                        value={getIsoDateString(dueDate)}
                        onChange={() => console.log(dueDate)}
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span
                        htmlFor="apparelSize"
                        className="text-xs font-mont font-semibold text-black"
                      >
                        Apparel Size
                      </span>
                      <input
                        required
                        id="apparelSize"
                        type="number"
                        placeholder="apparel size here..."
                        name="apparelSize"
                        className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                        defaultValue={apparelSize}
                      />
                    </div>
                  </div>

                  {/* document  */}
                  <div className="flex flex-col gap-5 ">
                    <span className="text-xs font-semibold text-black">
                      Upload Document
                    </span>
                    <div className="flex flex-col-reverse">
                      <input
                        type="file"
                        className="h-1 w-1 opacity-0  "
                        disabled={componentDisabled}
                        name="document"
                        id="document"
                        ref={documentRef}
                        onChange={handleDocumentChange}
                      />
                      <div
                        className={`w-full border border-fadeMid flex justify-between rounded-md overflow-hidden ${
                          componentDisabled ? "bg-disabled" : "bg-transparent"
                        }`}
                      >
                        <div className="w-full flex items-center justify-between px-3 text-darkSemi">
                          {document ? (
                            <>
                              <span className="select-none">
                                {document?.name?.length > 90
                                  ? document?.name?.slice(0, 90) + "..."
                                  : document?.name}
                              </span>
                              <button
                                type="button"
                                className="flex items-center relative z-50"
                                onClick={handleDocumentDelete}
                                disabled={componentDisabled}
                              >
                                <span className="material-symbols-outlined text-lg text-errorColor">
                                  cancel
                                </span>
                              </button>
                            </>
                          ) : (
                            <span className="text-sm font-mont ">
                              Name of the fille
                            </span>
                          )}
                        </div>
                        <label
                          htmlFor="document"
                          className={`py-3 px-4 inline-flex font-mont text-sm text-black border-l border-fadeSemi ${
                            componentDisabled ? "" : "cursor-pointer"
                          }`}
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* products  */}

                  <div className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-xl font-semibold text-black">
                        PRODUCT SHIPMENT
                      </h2>
                    </div>
                    <div className="grid grid-cols-4  gap-4">
                      <div className="col-span-2">
                        <span className="text-sm text-blackHigh">Product</span>
                      </div>
                      <div>
                        <span className="text-sm text-blackHigh">
                          Ship Date
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-blackHigh">
                          Tracking Number
                        </span>
                      </div>
                      {/* product one  */}

                      <div className="relative col-span-2">
                        <select
                          className="w-full bg-transparent p-2.5 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                          name="product1"
                          defaultValue={productsOne?.prductName}
                          required
                        >
                          <option value="selected" disabled>
                            select product
                          </option>
                          <option value="Belly Wrap">Belly Wrap</option>
                          <option value="Postpartum kit">Postpartum kit</option>
                          <option value="Mommy Care">Mommy Care</option>
                          <option value="Complete Hospital Bag">
                            Complete Hospital Bag
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div>
                        <input
                          required
                          name="shipdate1"
                          type="date"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          value={getIsoDateString(productsOne?.shipmentDate)}
                          onChange={() =>
                            console.log(productsOne?.shipmentDate)
                          }
                        />
                      </div>
                      <div>
                        <input
                          required
                          type="number"
                          placeholder="tracking number here..."
                          name="trackingNo1"
                          className="w-full outline-none border border-fadeMid bg-transparent p-3 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          defaultValue={productsOne?.tackingNumber}
                        />
                      </div>
                      {/* product two  */}
                      <div className="relative col-span-2">
                        <select
                          className="w-full bg-transparent p-2.5 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                          name="product2"
                          defaultValue={productsTwo?.prductName}
                          required
                        >
                          <option value="selected" disabled>
                            select product
                          </option>
                          <option value="Belly Wrap">Belly Wrap</option>
                          <option value="Postpartum kit">Postpartum kit</option>
                          <option value="Mommy Care">Mommy Care</option>
                          <option value="Complete Hospital Bag">
                            Complete Hospital Bag
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div>
                        <input
                          required
                          name="shipdate2"
                          type="date"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          defaultValue={getIsoDateString(
                            productsTwo?.shipmentDate
                          )}
                        />
                      </div>
                      <div>
                        <input
                          required
                          type="number"
                          placeholder="tracking number here..."
                          name="trackingNo2"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          defaultValue={productsTwo?.tackingNumber}
                        />
                      </div>
                      {/* product three  */}
                      <div className="relative col-span-2">
                        <select
                          className="w-full bg-transparent p-2.5 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                          name="product3"
                          defaultValue={productsThree?.prductName}
                          required
                        >
                          <option value="selected" disabled>
                            select product
                          </option>
                          <option value="Belly Wrap">Belly Wrap</option>
                          <option value="Postpartum kit">Postpartum kit</option>
                          <option value="Mommy Care">Mommy Care</option>
                          <option value="Complete Hospital Bag">
                            Complete Hospital Bag
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div>
                        <input
                          required
                          name="shipdate3"
                          type="date"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          value={getIsoDateString(productsThree?.shipmentDate)}
                          onChange={() =>
                            console.log(productsThree?.shipmentDate)
                          }
                        />
                      </div>
                      <div>
                        <input
                          required
                          type="number"
                          placeholder="tracking number here..."
                          name="trackingNo3"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          defaultValue={productsThree?.tackingNumber}
                        />
                      </div>
                      {/* product four  */}
                      <div className="relative col-span-2">
                        <select
                          className="w-full bg-transparent p-2.5 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                          name="product4"
                          defaultValue={productsFour?.prductName}
                          required
                        >
                          <option value="selected" disabled>
                            select product
                          </option>
                          <option value="Belly Wrap">Belly Wrap</option>
                          <option value="Postpartum kit">Postpartum kit</option>
                          <option value="Mommy Care">Mommy Care</option>
                          <option value="Complete Hospital Bag">
                            Complete Hospital Bag
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                          <span className="material-symbols-outlined">
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div>
                        <input
                          required
                          name="shipdate4"
                          type="date"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          value={getIsoDateString(productsFour?.shipmentDate)}
                          onChange={() =>
                            console.log(productsFour?.shipmentDate)
                          }
                        />
                      </div>
                      <div>
                        <input
                          required
                          type="number"
                          placeholder="tracking number here..."
                          name="trackingNo4"
                          className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
                          defaultValue={productsFour?.tackingNumber}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      disabled={isRequestLoading}
                      className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
                      type="submit"
                    >
                      Save & Update
                    </button>
                  </div>

                  {isResponseError && (
                    <div className="text-errorColor">Something went wrong!</div>
                  )}
                </form>

                <form>
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      MEAL PLANING
                    </h2>
                    <div className="mt-5">
                      <div className="grid grid-cols-3 gap-4 mb-2">
                        <div className="">
                          <span className="text-sm font-semibold text-blackHigh">
                            Dieters Restrictions for self
                          </span>
                        </div>
                        <div className="">
                          <span className="text-sm font-semibold text-blackHigh">
                            Dieters Restrictions for self
                          </span>
                        </div>
                        <div className="">
                          <span className="text-sm font-semibold text-blackHigh">
                            Dieters Restrictions for children
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 ">
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <div className="flex items-center gap-1 pb-2">
                            <input
                              type="checkbox"
                              name="Vegan"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox "
                              id="VeganOne"
                            />
                            <label htmlFor="VeganOne">Vegan</label>
                          </div>
                          <div className="flex items-center gap-1 py-2">
                            <input
                              type="checkbox"
                              name="Vegetarian"
                              id="VegetarianOne"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                            />
                            <label htmlFor="VegetarianOne">Vegetarian</label>
                          </div>
                          <div className="flex items-center gap-1 pt-2">
                            <input
                              type="checkbox"
                              name="Gluten Free"
                              id="GlutenOne"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                            />
                            <label htmlFor="GlutenOne">Gluten Free</label>
                          </div>
                        </div>
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <div className="flex items-center gap-1 pb-2">
                            <input
                              type="checkbox"
                              name="Vegan"
                              onChange={handleMealTwoPlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                              id="VeganTwo"
                            />
                            <label htmlFor="VeganTwo">Vegan</label>
                          </div>
                          <div className="flex items-center gap-1 py-2">
                            <input
                              type="checkbox"
                              name="Vegetarian"
                              id="VegetarianTwo"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                            />
                            <label htmlFor="VegetarianTwo">Vegetarian</label>
                          </div>
                          <div className="flex items-center gap-1 pt-2">
                            <input
                              type="checkbox"
                              name="Gluten Free"
                              id="GlutenTwo"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                            />
                            <label htmlFor="GlutenTwo">Gluten Free</label>
                          </div>
                        </div>
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <div className="flex items-center gap-1 pb-2">
                            <input
                              type="checkbox"
                              name="Vegan"
                              onChange={handleMealThreePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                              id="VeganThree"
                            />
                            <label htmlFor="VeganThree">Vegan</label>
                          </div>
                          <div className="flex items-center gap-1 py-2">
                            <input
                              type="checkbox"
                              name="Vegetarian"
                              id="VegetarianThree"
                              onChange={handleMealThreePlaning}
                              className="inline-flex items-center  text-blackHigh bg-white checkbox"
                            />
                            <label htmlFor="VegetarianThree">Vegetarian</label>
                          </div>
                          <div className="flex items-center gap-1 pt-2">
                            <input
                              type="checkbox"
                              name="Gluten Free"
                              id="GlutenThree"
                              onChange={handleMealThreePlaning}
                              className="inline-flex items-center  text-blackHigh checkbox"
                            />
                            <label htmlFor="GlutenThree">Gluten Free</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <div>
                      <button
                        type="submit"
                        className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                      >
                        Save & Update
                      </button>
                    </div>
                  </div>
                </form>

                <form>
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      COACH ASSIGNMENT
                    </h2>

                    <div className="mt-5">
                      <div className="grid grid-cols-4 gap-4 mb-2">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Midwife Concierge
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="asssignmentOne"
                              required
                            >
                              <option value="midwife concierge">
                                Midwife Concierge
                              </option>
                              <option value="lactation coach">
                                Lactation Coach
                              </option>
                              <option value="postpartum therapist">
                                Postpartum Therapist
                              </option>
                              <option value="infant sleep coach">
                                Infant Sleep Coach
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Lactation Coach
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="asssignmentTwo"
                              required
                            >
                              <option value="midwife concierge">
                                Midwife Concierge
                              </option>
                              <option value="lactation coach">
                                Lactation Coach
                              </option>
                              <option value="postpartum therapist">
                                Postpartum Therapist
                              </option>
                              <option value="infant sleep coach">
                                Infant Sleep Coach
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Postpartum Therapist
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="asssignmentThree"
                              required
                            >
                              <option value="midwife concierge">
                                Midwife Concierge
                              </option>
                              <option value="lactation coach">
                                Lactation Coach
                              </option>
                              <option value="postpartum therapist">
                                Postpartum Therapist
                              </option>
                              <option value="infant sleep coach">
                                Infant Sleep Coach
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Infant Sleep Coach
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="asssignmentFour"
                              required
                            >
                              <option value="midwife concierge">
                                Midwife Concierge
                              </option>
                              <option value="lactation coach">
                                Lactation Coach
                              </option>
                              <option value="postpartum therapist">
                                Postpartum Therapist
                              </option>
                              <option value="infant sleep coach">
                                Infant Sleep Coach
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <div>
                      <button
                        type="submit"
                        className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                      >
                        Save & Update
                      </button>
                    </div>
                  </div>
                </form>

                <form>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-semibold text-black">
                        SHIPPING ADDRESS
                      </h2>
                      {/* street name one  */}
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 1
                        </span>
                        <div>
                          <input
                            className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md"
                            name="shippingStreetOne"
                            placeholder="street name here..."
                          />
                        </div>
                      </div>
                      {/* street name two  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 2
                        </span>

                        <div className="relative">
                          <select
                            className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                            name="shippingStreetTwo"
                            required
                          >
                            <option value="place one">place one</option>
                            <option value="place two">place two</option>
                            <option value="place three">place three</option>
                            <option value="place four">place four</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                            <span className="material-symbols-outlined">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* city and zip code  */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            City
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="shippingCity"
                              required
                            >
                              <option value="demo city one">
                                demo city one
                              </option>
                              <option value="demo city two">
                                demo city two
                              </option>
                              <option value="demo city three">
                                demo city three
                              </option>
                              <option value="demo city four">
                                demo city four
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Zip Code
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="shippingZipCode"
                              required
                            >
                              <option value="1200">1200</option>
                              <option value="1201">1201</option>
                              <option value="1202">1202</option>
                              <option value="1203">1203</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Country  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Country
                        </span>
                        <div className="relative">
                          <select
                            className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                            name="shippingCountry"
                            required
                          >
                            <option value="australia">Australia</option>
                            <option value="colombia">Colombia</option>
                            <option value="cuba">Cuba</option>
                            <option value="canada">Canada</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                            <span className="material-symbols-outlined">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-xl font-semibold text-black">
                        BILLING ADDRESS
                      </h2>
                      {/* street name one  */}
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 1
                        </span>
                        <div>
                          <input
                            className="py-3 text-darkSemi placeholder:text-blackSemi px-2 w-full bg-transparent border border-fadeMid rounded-md"
                            name="billingStreetOne"
                            placeholder="street name here..."
                          />
                        </div>
                      </div>
                      {/* street name two  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 2
                        </span>
                        <div className="relative">
                          <select
                            className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                            name="billingStreetTwo"
                            required
                          >
                            <option value="place one">place one</option>
                            <option value="place two">place two</option>
                            <option value="place three">place three</option>
                            <option value="place four">place four</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                            <span className="material-symbols-outlined">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* city and zip code  */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            City
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="billingCity"
                              required
                            >
                              <option value="demo city one">
                                demo city one
                              </option>
                              <option value="demo city two">
                                demo city two
                              </option>
                              <option value="demo city three">
                                demo city three
                              </option>
                              <option value="demo city four">
                                demo city four
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Zip Code
                          </span>
                          <div className="relative">
                            <select
                              className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                              name="billingZipCode"
                              required
                            >
                              <option value="1200">1200</option>
                              <option value="1201">1201</option>
                              <option value="1202">1202</option>
                              <option value="1203">1203</option>
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                              <span className="material-symbols-outlined">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Country  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          City
                        </span>
                        <div className="relative">
                          <select
                            className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                            name="billingCountry"
                            required
                          >
                            <option value="australia">Australia</option>
                            <option value="colombia">Colombia</option>
                            <option value="cuba">Cuba</option>
                            <option value="canada">Canada</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                            <span className="material-symbols-outlined">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex flex-col gap-2 mt-1">
                        <span className="text-sm font-semibold text-blackHigh">
                          Country
                        </span>
                        <ReactFlagsSelect
                          selected={billingCountry}
                          onSelect={(code) => setBillingContry(code)}
                          countries={["fi", "GB", "IE", "IT", "NL", "SE"]}
                        ></ReactFlagsSelect>
                      </div> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {isRequestLoading && <RequestLoader></RequestLoader>}
      </div>
    </>
  );
}
//
