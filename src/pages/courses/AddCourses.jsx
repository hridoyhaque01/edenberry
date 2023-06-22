import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import CourseModal from "../../components/modals/CourseModal";
import { imageIcon } from "../../utils/getImages";

function AddCourses() {
  return (
    <>
      <section className="pb-10">
        <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight rounded-xl p-8">
          <div className="flex flex-col gap-11">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              className="w-full relative flex flex-col gap-6"
            >
              {/* COURSE NAME */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  COURSE NAME
                </span>
                <Input
                  className="py-3 text-darkSemi placeholder:text-blackSemi"
                  name="coachSpciality"
                  placeholder="coach speciality here..."
                />
              </div>

              {/* profile  */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  COURSE THUMBNAIL
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

              {/* Customer Notes */}
              <div className="">
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-semibold text-black">
                    Professional Bio
                  </span>
                  <TextArea
                    name="customernote"
                    className="py-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none"
                    placeholder="customer notes here..."
                  />
                  <div className="text-darkMid text-right">(45/1200)</div>
                </div>
              </div>

              {/* Customer Notes */}
              <div className="">
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-semibold text-black">
                    lessons
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-primaryColor text-sm font-semibold max-w-max"
                    data-hs-overlay="#course-modal"
                  >
                    <span className="material-symbols-outlined">add</span>
                    <span>Add New</span>
                  </button>
                </div>
              </div>

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
      </section>
      <div>
        <CourseModal></CourseModal>
      </div>
    </>
  );
}

export default AddCourses;
