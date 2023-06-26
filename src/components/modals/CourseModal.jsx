import React from "react";
import { imageIcon } from "../../utils/getImages";

function CourseModal() {
  return (
    <div
      id="course-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[44rem] z-20 bg-white h-[calc(100%-8rem)] overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              Add New Lesson
            </span>
            <button
              type="button"
              className="flex items-center justify-center max-w-max text-white"
              data-hs-overlay="#course-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="w-full p-8">
            <form className="flex flex-col gap-6">
              {/* COURSE NAME */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  LESSON NAME
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="coachSpciality"
                  placeholder="lesson name here..."
                />
              </div>

              {/* profile  */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont">
                  THUMBNAIL
                </span>
                <div className={` w-full`}>
                  <input
                    type="file"
                    className="w-full opacity-0 invisible absolute"
                    id="profile"
                  />
                  <label
                    htmlFor="profile"
                    className={`h-60 text-black text-sm 
                      bg-whiteHigh cursor-pointer flex flex-col items-center justify-center gap-2  rounded-xl select-none `}
                  >
                    <img src={imageIcon} alt="" />
                    <div className="text-center">
                      <h4 className="font-semibold text-secondaryColor">
                        Upload course thumbnail
                      </h4>
                      <p className="text-xs mt-1"> svg, jpg, png, etc</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* profile  */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 ">
                  <span className="text-xs font-semibold text-black">
                    UPLOAD VIDEO
                  </span>
                  <div className="flex flex-col-reverse">
                    <input
                      required
                      type="file"
                      className="h-1 w-1 opacity-0  "
                      id="profile"
                      name="profile"
                    />
                    <div
                      className={`w-full border border-fadeMid flex items-center justify-between rounded-md overflow-hidden pl-2`}
                    >
                      <span>Name of the file</span>
                      <label
                        htmlFor="profile"
                        className={`py-3 px-4 inline-flex font-mont text-sm text-black bg-whiteHigh border-l border-fadeSemi cursor-pointer`}
                      >
                        Browse
                      </label>
                    </div>
                  </div>
                </div>
                {/* 
                <div className="px-4 py-3 border border-fadeSemi rounded-xl">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-blackHigh font-mont">
                      video name.mp3
                    </p>
                    <span className="material-symbols-outlined text-sm text-successColor">
                      check_circle
                    </span>
                  </div>
                  <p className="text-xs font-light text-blackHigh font-mont pb-0.5 border-b-2 border-secondaryColor">
                    40 mb
                  </p>
                </div> */}
              </div>

              {/* Customer Notes */}
              <div className="">
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-semibold text-black font-mont uppercase">
                    Description
                  </span>
                  <textarea
                    name="customernote"
                    className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
                    placeholder="customer notes here..."
                  />
                  <div className="text-darkMid text-right">(45/1200)</div>
                </div>
              </div>
              {/* buttons */}

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
      </div>
    </div>
  );
}

export default CourseModal;
