import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
// import ReactFlagsSelect from "react-flags-select";
import { user } from "../../utils/getImages";
import "./modal.css";

export default function CustomerModal() {
  const [componentDisabled, setComponentDisabled] = useState(false);
  // const [shippingCountry, setShippingCountry] = useState("SE");
  // const [billingCountry, setBillingContry] = useState("SE");

  const handleProfile = (values) => {
    // event.preventDefault();
    console.log(values);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <div
        id="hs-scroll-inside-body-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto "
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
                  <img src={user} alt="" className="w-16 h-16 rounded-full" />
                  <div>
                    <h4 className="text-black leading-5">Walter White</h4>
                    <p className="text-xs text-blackHigh mt-2">
                      walterwhite@mail.com
                    </p>
                  </div>
                </div>
                <div>
                  {/* <Checkbox
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                  >
                    Form disabled
                  </Checkbox> */}
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
                  onFinish={handleProfile}
                >
                  {/* profile  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black">
                      PROFILE PICTURE
                    </span>
                    <div>
                      <Form.Item
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className="bg-primaryColor h-12"
                      >
                        <Upload
                          action="/upload.do"
                          listType="picture-card"
                          className="w-full"
                        >
                          <div className="h-4">
                            <div className="h-4"></div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </div>
                    {/* <div
                      className={`w-full ${
                        componentDisabled ? "bg-disabled" : "bg-transparent"
                      } border border-fadeMid rounded-xl relative py-3 px-2`}
                    >
                      <span className="select-none text-blackSemi">
                        Name of the fille
                      </span> */}
                    {/* <Form.Item>
                        <Input
                          type="file"
                          className="w-full opacity-0 invisible absolute"
                          id="profile"
                        />
                      </Form.Item> */}

                    {/* <Form.Item
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        className="w-full opacity-0 invisible absolute"
                        id="profile"
                      >
                        <Upload
                          action="/upload.do"
                          listType="picture-card"
                          id="profile"
                        ></Upload>
                      </Form.Item>
                      <label
                        htmlFor="profile"
                        className={`absolute inset-y-0 right-0 text-black text-sm ${
                          componentDisabled
                            ? "bg-disabled"
                            : "bg-whiteHigh cursor-pointer "
                        }  flex items-center justify-center px-4 border-l border-l-fadeSemi rounded-r-xl select-none z-20 `}
                      >
                        Browse
                      </label> */}
                  </div>
                  {/* </div> */}
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
                  {/* Customer Notes */}
                  <div className="">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Customer Notes
                      </span>
                      <TextArea
                        name="customernote"
                        className="py-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none"
                        placeholder="customer notes here..."
                      />
                      <div className="text-darkMid text-right">(45/1200)</div>
                    </div>
                  </div>
                  {/* father and baby name  */}
                  <div className="grid grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Father’s Name
                      </span>
                      <Input
                        className="py-3 text-darkSemi placeholder:text-blackSemi"
                        name="fathername"
                        placeholder="father Name here..."
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Baby’s Name
                      </span>
                      <Input
                        className="py-3 text-darkSemi placeholder:text-blackSemi"
                        name="babyname"
                        placeholder="baby Name here..."
                      />
                    </div>
                  </div>
                  {/* Email  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black">
                      Email
                    </span>
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
                  {/* Due Date and Apparel Size  */}
                  <div className="grid grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Due Date
                      </span>
                      <DatePicker
                        className="py-3 text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none"
                        name="duedate"
                      />
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Apparel Size
                      </span>
                      <Input
                        className="py-3 text-darkSemi placeholder:text-blackSemi"
                        name="apparelsize"
                        type="number"
                        placeholder="apparel size here..."
                      />
                    </div>
                  </div>
                  {/* document  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black">
                      Upload Document
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
                        id="document"
                        name="document"
                      />
                      <label
                        htmlFor="document"
                        className={`absolute inset-y-0 right-0 text-black text-sm border-l border-l-fadeSemi ${
                          componentDisabled
                            ? "bg-disabled"
                            : "bg-whiteHigh cursor-pointer "
                        }  flex items-center justify-center px-4  rounded-r-xl select-none z-20 `}
                      >
                        Browse
                      </label>
                    </div>
                  </div>
                  {/* PRODUCT SHIPMENT */}
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      PRODUCT SHIPMENT
                    </h2>
                    <div className="mt-5">
                      <div className="grid grid-cols-4 gap-4 mb-2">
                        <div className="col-span-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Product
                          </span>
                        </div>
                        <div className="">
                          <span className="text-sm font-semibold text-blackHigh">
                            Ship Date
                          </span>
                        </div>
                        <div className="">
                          <span className="text-sm font-semibold text-blackHigh">
                            Tracking Number
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-2">
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="demo"
                            name="product1"
                          >
                            <Select.Option value="demo">
                              Belly Wrap
                            </Select.Option>
                            <Select.Option value="demo2">
                              Postpartum kit
                            </Select.Option>
                            <Select.Option value="demo3">
                              Mommy Care
                            </Select.Option>
                            <Select.Option value="demo4">
                              Complete Hospital Bag
                            </Select.Option>
                          </Select>
                        </div>
                        <div>
                          <DatePicker
                            className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none"
                            name="shipdate1"
                          />
                        </div>
                        <div>
                          <Input
                            className="py-3 text-darkSemi placeholder:text-blackSemi "
                            type="number"
                            name="trackingnumber1"
                            placeholder="phone number here..."
                          />
                        </div>
                        <div className="col-span-2">
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="demo"
                            name="product2"
                          >
                            <Select.Option value="demo">
                              Belly Wrap
                            </Select.Option>
                            <Select.Option value="demo2">
                              Postpartum kit
                            </Select.Option>
                            <Select.Option value="demo3">
                              Mommy Care
                            </Select.Option>
                            <Select.Option value="demo4">
                              Complete Hospital Bag
                            </Select.Option>
                          </Select>
                        </div>
                        <div>
                          <DatePicker
                            className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none"
                            name="shipdate2"
                          />
                        </div>
                        <div>
                          <Input
                            className="py-3 text-darkSemi placeholder:text-blackSemi "
                            type="number"
                            name="trackingnumber2"
                            placeholder="phone number here..."
                          />
                        </div>
                        <div className="col-span-2">
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="demo"
                            name="product3"
                          >
                            <Select.Option value="demo">
                              Belly Wrap
                            </Select.Option>
                            <Select.Option value="demo2">
                              Postpartum kit
                            </Select.Option>
                            <Select.Option value="demo3">
                              Mommy Care
                            </Select.Option>
                            <Select.Option value="demo4">
                              Complete Hospital Bag
                            </Select.Option>
                          </Select>
                        </div>
                        <div>
                          <DatePicker
                            className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none"
                            name="shipdate3"
                          />
                        </div>
                        <div>
                          <Input
                            className="py-3 text-darkSemi placeholder:text-blackSemi "
                            type="number"
                            name="trackingnumber3"
                            placeholder="phone number here..."
                          />
                        </div>
                        <div className="col-span-2">
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="demo"
                            name="product4"
                          >
                            <Select.Option value="demo">
                              Belly Wrap
                            </Select.Option>
                            <Select.Option value="demo2">
                              Postpartum kit
                            </Select.Option>
                            <Select.Option value="demo3">
                              Mommy Care
                            </Select.Option>
                            <Select.Option value="demo4">
                              Complete Hospital Bag
                            </Select.Option>
                          </Select>
                        </div>
                        <div>
                          <DatePicker
                            className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none"
                            name="shipdate4"
                          />
                        </div>
                        <div>
                          <Input
                            className="py-3 text-darkSemi placeholder:text-blackSemi "
                            type="number"
                            name="trackingnumber4"
                            placeholder="phone number here..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white dfsfds"
                      onSubmit={handleProfile}
                    >
                      Save & Update
                    </button>
                  </div>
                </Form>

                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  className="w-full relative flex flex-col gap-6"
                >
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
                          <Checkbox
                            className="inline-flex items-center pb-2 text-blackHigh"
                            name="mealOneVegan"
                          >
                            Vegan
                          </Checkbox>
                          <Checkbox
                            className="inline-flex items-center py-2 text-blackHigh"
                            name="mealOneVegetarian"
                          >
                            Vegetarian
                          </Checkbox>
                          <Checkbox
                            className="inline-flex items-center pt-2 text-blackHigh"
                            name="mealOneGluten"
                          >
                            Gluten Free
                          </Checkbox>
                        </div>
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <Checkbox
                            className="inline-flex items-center pb-2 text-blackHigh"
                            name="mealTwoVegan"
                          >
                            Vegan
                          </Checkbox>
                          <Checkbox
                            className="inline-flex items-center py-2 text-blackHigh"
                            name="mealTwoVegetarian"
                          >
                            Vegetarian
                          </Checkbox>
                          <Checkbox
                            className="inline-flex items-center pt-2 text-blackHigh"
                            name="mealTwoGluten"
                          >
                            Gluten Free
                          </Checkbox>
                        </div>
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <Checkbox
                            className="inline-flex items-center pb-2 text-blackHigh"
                            name="mealThreeVegan"
                          >
                            Vegan
                          </Checkbox>
                          <Checkbox
                            className="inline-flex items-center py-2 text-blackHigh"
                            name="mealThreeVegetarian"
                          >
                            Vegetarian
                          </Checkbox>
                          <Checkbox
                            className="inline-flex items-center pt-2 text-blackHigh"
                            name="mealThreeGluten"
                          >
                            Gluten Free
                          </Checkbox>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button
                      htmlType="submit"
                      className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                    >
                      Save & Update
                    </Button>
                  </div>
                </Form>

                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  className="w-full relative flex flex-col gap-6"
                >
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
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="midwife concierge"
                            name="coachAssOne"
                          >
                            <Select.Option value="midwife concierge">
                              Midwife Concierge
                            </Select.Option>
                            <Select.Option value="lactation coach">
                              Lactation Coach
                            </Select.Option>
                            <Select.Option value="postpartum therapist">
                              Postpartum Therapist
                            </Select.Option>
                            <Select.Option value="infant sleep coach">
                              Infant Sleep Coach
                            </Select.Option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Lactation Coach
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="lactation coach"
                            name="coachAssOne"
                          >
                            <Select.Option value="midwife concierge">
                              Midwife Concierge
                            </Select.Option>
                            <Select.Option value="lactation coach">
                              Lactation Coach
                            </Select.Option>
                            <Select.Option value="postpartum therapist">
                              Postpartum Therapist
                            </Select.Option>
                            <Select.Option value="infant sleep coach">
                              Infant Sleep Coach
                            </Select.Option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Postpartum Therapist
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="postpartum therapist"
                            name="coachAssOne"
                          >
                            <Select.Option value="midwife concierge">
                              Midwife Concierge
                            </Select.Option>
                            <Select.Option value="lactation coach">
                              Lactation Coach
                            </Select.Option>
                            <Select.Option value="postpartum therapist">
                              Postpartum Therapist
                            </Select.Option>
                            <Select.Option value="infant sleep coach">
                              Infant Sleep Coach
                            </Select.Option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Infant Sleep Coach
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="infant sleep coach"
                            name="coachAssOne"
                          >
                            <Select.Option value="midwife concierge">
                              Midwife Concierge
                            </Select.Option>
                            <Select.Option value="lactation coach">
                              Lactation Coach
                            </Select.Option>
                            <Select.Option value="postpartum therapist">
                              Postpartum Therapist
                            </Select.Option>
                            <Select.Option value="infant sleep coach">
                              Infant Sleep Coach
                            </Select.Option>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Button
                      htmlType="submit"
                      className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                    >
                      Save & Update
                    </Button>
                  </div>
                </Form>

                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  className="w-full relative flex flex-col gap-6"
                >
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
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi"
                          name="streetNameOne"
                          placeholder="street name here..."
                        />
                      </div>
                      {/* street name two  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 2
                        </span>
                        <Select
                          className="w-full text-darkSemi placeholder:text-blackSemi"
                          defaultValue="place one"
                          name="streenNameTwo"
                        >
                          <Select.Option value="place one">
                            place one
                          </Select.Option>
                          <Select.Option value="place two">
                            place two
                          </Select.Option>
                          <Select.Option value="place three">
                            place three
                          </Select.Option>
                          <Select.Option value="place four">
                            place four
                          </Select.Option>
                        </Select>
                      </div>

                      {/* city and zip code  */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            City
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="demo city one"
                            name="city"
                          >
                            <Select.Option value="demo city one">
                              demo city one
                            </Select.Option>
                            <Select.Option value="demo city two">
                              demo city two
                            </Select.Option>
                            <Select.Option value="demo city three">
                              demo city three
                            </Select.Option>
                            <Select.Option value="demo city four">
                              demo city four
                            </Select.Option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Zip Code
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="1200"
                            name="streenNameTwo"
                          >
                            <Select.Option value="1200">1200</Select.Option>
                            <Select.Option value="1201">1201</Select.Option>
                            <Select.Option value="1202">1202</Select.Option>
                            <Select.Option value="1203">1203</Select.Option>
                          </Select>
                        </div>
                      </div>

                      {/* Country  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          City
                        </span>
                        <Select
                          className="w-full text-darkSemi placeholder:text-blackSemi"
                          defaultValue="australia"
                          name="city"
                        >
                          <Select.Option value="australia">
                            Australia
                          </Select.Option>
                          <Select.Option value="colombia">
                            Colombia
                          </Select.Option>
                          <Select.Option value="cuba">Cuba</Select.Option>
                          <Select.Option value="canada">Canada</Select.Option>
                        </Select>
                      </div>

                      {/* <div className="flex flex-col gap-2 mt-1">
                        <span className="text-sm font-semibold text-blackHigh">
                          Country
                        </span>
                        <ReactFlagsSelect
                          selected={shippingCountry}
                          onSelect={(code) => setShippingCountry(code)}
                          countries={["fi", "GB", "IE", "IT", "NL", "SE"]}
                        ></ReactFlagsSelect>
                      </div> */}
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
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi"
                          name="streetNameOne"
                          placeholder="street name here..."
                        />
                      </div>
                      {/* street name two  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 2
                        </span>
                        <Select
                          className="w-full text-darkSemi placeholder:text-blackSemi"
                          defaultValue="place one"
                          name="streenNameTwo"
                        >
                          <Select.Option value="place one">
                            place one
                          </Select.Option>
                          <Select.Option value="place two">
                            place two
                          </Select.Option>
                          <Select.Option value="place three">
                            place three
                          </Select.Option>
                          <Select.Option value="place four">
                            place four
                          </Select.Option>
                        </Select>
                      </div>

                      {/* city and zip code  */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            City
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="demo city one"
                            name="city"
                          >
                            <Select.Option value="demo city one">
                              demo city one
                            </Select.Option>
                            <Select.Option value="demo city two">
                              demo city two
                            </Select.Option>
                            <Select.Option value="demo city three">
                              demo city three
                            </Select.Option>
                            <Select.Option value="demo city four">
                              demo city four
                            </Select.Option>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Zip Code
                          </span>
                          <Select
                            className="w-full text-darkSemi placeholder:text-blackSemi"
                            defaultValue="1200"
                            name="streenNameTwo"
                          >
                            <Select.Option value="1200">1200</Select.Option>
                            <Select.Option value="1201">1201</Select.Option>
                            <Select.Option value="1202">1202</Select.Option>
                            <Select.Option value="1203">1203</Select.Option>
                          </Select>
                        </div>
                      </div>

                      {/* Country  */}

                      {/* Country  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          City
                        </span>
                        <Select
                          className="w-full text-darkSemi placeholder:text-blackSemi"
                          defaultValue="australia"
                          name="city"
                        >
                          <Select.Option value="australia">
                            Australia
                          </Select.Option>
                          <Select.Option value="colombia">
                            Colombia
                          </Select.Option>
                          <Select.Option value="cuba">Cuba</Select.Option>
                          <Select.Option value="canada">Canada</Select.Option>
                        </Select>
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
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//
