import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoach,
  fetchCoaches,
  updateCoach,
} from "../../features/coach/coachSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { user } from "../../utils/getImages";
import ConfirmationModal from "./ConfirmationModal";

function CoachModal({ errorNotify, infoNotify, setIsRequestLoading }) {
  const [profile, setProfile] = useState(null);
  const profileRef = useRef();
  const [profilePreview, setProfilePreview] = useState(null);
  const [bio, setBio] = useState("");
  const bioRef = useRef();
  const categoryRef = useRef();
  const { isLoading } = useSelector((state) => state.coaches);
  const dispatch = useDispatch();
  const { coachData } = useSelector((state) => state.coaches);

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

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1200) {
      setBio(value);
    }
  };

  const handleProfileDelete = () => {
    profileRef.current.value = "";
    setProfile(null);
    setProfilePreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const category = form.category.value;
    const bio = form.bio.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const dialpadNumber = form.dialpadNumber.value;
    const data = {
      firstName,
      lastName,
      category,
      bio,
      email,
      phone,
      dialpadNumber,
    };
    setIsRequestLoading(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      if (profile) {
        const file = await getCompressedImage(profile);
        formData.append("files", file);
      }
      await dispatch(updateCoach({ formData, id: coachData?._id }))
        .unwrap()
        .then((res) => {
          dispatch(fetchCoaches())
            .unwrap()
            .then((res) => {
              infoNotify("Coach update successful");
              setIsRequestLoading(false);
            });
        })
        .catch((error) => {
          setIsRequestLoading(false);
          errorNotify("Coach update failed");
        });
    } catch (error) {
      setIsRequestLoading(false);
      errorNotify("Somthing went wrong");
    }
  };

  const handleCoachDelete = async () => {
    setIsRequestLoading(true);
    dispatch(deleteCoach(coachData?._id))
      .unwrap()
      .then((res) => {
        dispatch(fetchCoaches());
        infoNotify("Delete coach successfull");
        setIsRequestLoading(false);
      })
      .catch((err) => {
        errorNotify("Delete coach failed");
        setIsRequestLoading(false);
      });
  };

  useEffect(() => {
    if (coachData?._id) {
      setProfilePreview(coachData?.fileUrl);
      bioRef.current.value = coachData?.bio || "";
      setBio(coachData?.bio || "");
      categoryRef.current.value = coachData?.category || "";
    }
  }, [coachData?._id]);

  return (
    <div
      id="coach-modal"
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-hidden "
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all max-w-screen-xl m-3 sm:mx-auto h-[calc(100%-3.5rem)]">
        <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight shadow-sm rounded-xl">
          <div className="p-8 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-dark">Coach Account</h2>
                <p className="text-base text-blackHigh mt-2">
                  This information can be edited from your profile page.
                </p>
              </div>
              <div className=" ">
                <button
                  type="button"
                  className="hs-dropdown-toggle h-8 w-8 flex items-center justify-center bg-secondaryLight rounded-full"
                  data-hs-overlay="#coach-modal"
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
            <div className="flex flex-col bg-white  rounded-xl">
              <div className="flex items-center justify-between my-11">
                <div className="flex items-center gap-4">
                  <img
                    src={profilePreview || user}
                    alt=""
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="text-black leading-5">
                      {coachData?.firstName + " " + coachData?.lastName}
                    </h4>
                    <p className="text-xs text-blackHigh mt-2">
                      {coachData?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  {/* profile  */}
                  <div className="flex flex-col gap-5 ">
                    <span className="text-xs font-semibold text-black capitalize">
                      Profile Picture
                    </span>
                    <div className="flex flex-col-reverse">
                      <input
                        type="file"
                        className="h-1 w-1 opacity-0  "
                        id="coachprofile"
                        ref={profileRef}
                        onChange={handleProfileChange}
                        name="coachprofile"
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
                            <span className="text-blackSemi">
                              Select coach profile picture
                            </span>
                          )}
                        </div>
                        <label
                          htmlFor="coachprofile"
                          className={`py-3 px-4 inline-flex font-mont text-sm text-black border-l border-fadeSemi cursor-pointer`}
                        >
                          Browse
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* names  */}
                  <div className="grid grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black capitalize">
                        first name
                      </span>
                      <input
                        className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                        name="firstName"
                        required
                        placeholder="Enter first name"
                        defaultValue={coachData?.firstName}
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black capitalize">
                        last name
                      </span>
                      <input
                        className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                        name="lastName"
                        required
                        placeholder="Enter last Name"
                        defaultValue={coachData?.lastName}
                      />
                    </div>
                  </div>
                  {/* Add Coach category */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black capitalize">
                      Add Coach Speciality
                    </span>
                    <div className="relative">
                      <select
                        className="w-full bg-transparent p-3 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                        name="category"
                        ref={categoryRef}
                        defaultValue={coachData?.category}
                      >
                        <option value="" disabled>
                          Select coach category
                        </option>
                        <option value="Midwife Concierge">
                          Midwife Concierge
                        </option>
                        <option value="Lactation Coach">Lactation Coach</option>
                        <option value="Postpartum Mental Health Coach">
                          Postpartum Mental Health Coach
                        </option>
                        <option value="Baby Sleep Coach">
                          Baby Sleep Coach
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Notes */}
                  <div className="">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black capitalize">
                        Professional Bio
                      </span>
                      <textarea
                        name="bio"
                        className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
                        placeholder="Enter bio"
                        ref={bioRef}
                        value={bio}
                        onChange={(e) => handleChange(e)}
                      />
                      <p className="text-darkMid text-xs text-right">
                        ({bio?.length || 0}/1200)
                      </p>
                    </div>
                  </div>

                  {/* Email  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black capitalize">
                      Email
                    </span>
                    <input
                      className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                      name="email"
                      placeholder="Enter email address"
                      defaultValue={coachData?.email}
                    />
                  </div>

                  {/* password  */}
                  {/* <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black capitalize">
                      Password
                    </span>
                    <input
                      className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                      name="password"
                      placeholder="Enter password"
                    />
                  </div> */}
                  {/* phone number  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black capitalize">
                      Phone Number
                    </span>
                    <input
                      className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                      type="number"
                      name="phone"
                      placeholder="Enter phone number"
                      defaultValue={coachData?.phone}
                    />
                  </div>
                  {/* phone number  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black capitalize">
                      Dialpad Number
                    </span>
                    <input
                      className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                      type="number"
                      name="dialpadNumber"
                      placeholder="Enter dialpad number"
                      defaultValue={coachData?.dialpadNumber}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-8">
                    <label
                      htmlFor="confirmationPopup"
                      className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
                    >
                      Delete Coach
                    </label>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                      data-hs-overlay="#coach-modal"
                    >
                      Save & Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ConfirmationModal
          handleStatus={handleCoachDelete}
          status="Delete"
          modalClose="#coach-modal"
        ></ConfirmationModal>
      </div>
    </div>
  );
}

export default CoachModal;
