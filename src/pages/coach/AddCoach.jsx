import React, { useRef, useState } from "react";
import { user } from "../../utils/getImages";

function AddCoach() {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [profile, setProfile] = useState(null);
  const profileRef = useRef();

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

  return (
    <section className="pb-10">
      <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight shadow-sm rounded-xl p-8">
        <div>
          <h2 className="text-2xl font-bold text-dark">Coach Account</h2>
          <p className="text-base text-blackHigh mt-2">
            This information can be edited from your profile page.
          </p>
        </div>

        <div className="flex items-center justify-between my-11">
          <div className="flex items-center gap-4">
            <img src={user} alt="" className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="text-black leading-5">Walter White</h4>
              <p className="text-xs text-blackHigh mt-2">
                walterwhite@mail.com
              </p>
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

        <div className="">
          <form className="flex flex-col gap-6">
            {/* profile  */}
            <div className="flex flex-col gap-5 ">
              <span className="text-xs font-semibold text-black">
                PROFILE PICTURE
              </span>
              <div className="flex flex-col-reverse">
                <input
                  required
                  type="file"
                  className="h-1 w-1 opacity-0  "
                  disabled={componentDisabled}
                  id="coachprofile"
                  ref={profileRef}
                  onChange={handleProfileChange}
                  name="coachprofile"
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
                    htmlFor="coachprofile"
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
            <div className="grid grid-cols-2 items-center gap-6">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  FIRST NAME
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                  name="firstname"
                  placeholder="first Name here..."
                />
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  LAST NAME
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                  name="lastname"
                  placeholder="last Name here..."
                />
              </div>
            </div>
            {/* Add Coach Speciality */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                Add Coach Speciality
              </span>
              <select
                required
                className="py-3 px-4 pr-9 block w-full border border-fadeMid bg-transparent rounded-md text-sm outline-none text-black"
                name="product1"
              >
                <option value="selected" disabled>
                  select product
                </option>
                <option value="Belly Wrap">location coach</option>
                <option value="Postpartum kit">location coach</option>
                <option value="Mommy Care">location coach</option>
              </select>
            </div>

            {/* Customer Notes */}
            <div className="">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  Professional Bio
                </span>
                <textarea
                  name="customernote"
                  className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md"
                  placeholder="customer notes here..."
                />
                <div className="text-darkMid text-right">(45/1200)</div>
              </div>
            </div>

            {/* Email  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">Email</span>
              <input
                className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                name="email"
                placeholder="email here..."
              />
            </div>
            {/* phone number  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                Phone Number
              </span>
              <input
                className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                type="number"
                name="phone"
                placeholder="phone number here..."
              />
            </div>
            {/* phone number  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                Dialpad Number
              </span>
              <input
                className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                type="number"
                name="dialpadNumber"
                placeholder="phone number here..."
              />
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              >
                Save & Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddCoach;
