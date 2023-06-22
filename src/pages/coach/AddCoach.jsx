import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { user } from "../../utils/getImages";

function AddCoach() {
  const [componentDisabled, setComponentDisabled] = useState(false);

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

        <div className="flex flex-col gap-11">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            disabled={componentDisabled}
            className="w-full relative flex flex-col gap-6"
          >
            {/* profile  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                PROFILE PICTURE
              </span>
              <div
                className={`w-full ${
                  componentDisabled ? "bg-disabled" : "bg-transparent"
                } border border-fadeMid rounded-xl relative py-3 px-2`}
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
                  className={`absolute inset-y-0 right-0 text-black text-sm ${
                    componentDisabled
                      ? "bg-disabled"
                      : "bg-whiteHigh cursor-pointer "
                  }  flex items-center justify-center px-4 border-l border-l-fadeSemi rounded-r-xl select-none z-20 `}
                >
                  Browse
                </label>
              </div>
            </div>
            {/* name  */}
            <div className="grid grid-cols-2 items-center gap-6">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  FIRST NAME
                </span>
                <Input
                  className="py-3 text-darkSemi placeholder:text-blackSemi"
                  name="firstname"
                  placeholder="first Name here..."
                />
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  LAST NAME
                </span>
                <Input
                  className="py-3 text-darkSemi placeholder:text-blackSemi"
                  name="lastname"
                  placeholder="last Name here..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                Add Coach Speciality
              </span>
              <Input
                className="py-3 text-darkSemi placeholder:text-blackSemi"
                name="coachSpciality"
                placeholder="coach speciality here..."
              />
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

            {/* Email  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">Email</span>
              <Input
                className="py-3 text-darkSemi placeholder:text-blackSemi"
                name="email"
                placeholder="email here..."
              />
            </div>
            {/* phone number  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                Phone Number
              </span>
              <Input
                className="py-3 text-darkSemi placeholder:text-blackSemi "
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
              <Input
                className="py-3 text-darkSemi placeholder:text-blackSemi "
                type="number"
                name="dialpadNumber"
                placeholder="phone number here..."
              />
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
  );
}

export default AddCoach;
