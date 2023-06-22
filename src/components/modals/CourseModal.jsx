import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { imageIcon } from "../../utils/getImages";

function CourseModal() {
  return (
    <div
      id="course-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay "
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
          <div className="flex flex-col gap-11 p-8">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              className="w-full relative flex flex-col gap-6"
            >
              {/* COURSE NAME */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  LESSON nAME
                </span>
                <Input
                  className="py-3 text-darkSemi placeholder:text-blackSemi"
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
                  <Input
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
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-semibold text-black font-mont">
                    UPLOAD VIDEO
                  </span>
                  <div
                    className={`w-full "bg-transparent" border border-fadeMid rounded-xl relative py-3 px-2`}
                  >
                    <span className="select-none text-blackSemi">
                      Name of the fille
                    </span>
                    <Input
                      type="file"
                      className="w-full opacity-0 invisible absolute"
                      id="profile"
                    />
                    <label
                      htmlFor="profile"
                      className={`absolute inset-y-0 right-0 text-black text-sm bg-whiteHigh cursor-pointer  flex items-center justify-center px-4 border-l border-l-fadeSemi rounded-r-xl select-none z-20 `}
                    >
                      Browse
                    </label>
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
                  <TextArea
                    name="customernote"
                    className="py-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none"
                    placeholder="customer notes here..."
                  />
                  <div className="text-darkMid text-right">(45/1200)</div>
                </div>
              </div>
              {/* buttons */}

              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                >
                  Save & Update
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
