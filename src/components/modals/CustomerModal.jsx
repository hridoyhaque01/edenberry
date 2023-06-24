import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
// import ReactFlagsSelect from "react-flags-select";
import { useRef } from "react";
import { user } from "../../utils/getImages";

export default function CustomerModal() {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [profile, setProfile] = useState(null);
  const profileRef = useRef();
  const [document, setDcument] = useState(null);
  const documentRef = useRef();

  const [mealOneData, setMealOneData] = useState([]);
  const [mealTwoData, setMealTwoData] = useState([]);
  const [mealThreeData, setMealThreeData] = useState([]);

  const [profileData, setProfileData] = useState({
    apparelsize: "",
    babyname: "",
    customernote: "",
    duedate: "",
    email: "",
    fathername: "",
    firstname: "",
    lastname: "",
    phone: "",
    product1: "",
    product2: "",
    product3: "",
    product4: "",
    shipdate1: "",
    shipdate2: "",
    shipdate3: "",
    shipdate4: "",
    trackingnumber1: "",
    trackingnumber2: "",
    trackingnumber3: "",
    trackingnumber4: "",
  });

  const [coachAssignment, setCoachAssignment] = useState({
    assignmentOne: "",
    assignmentTwo: "",
    assignmentThree: "",
    assignmentFour: "",
  });

  const handleProfile = (values) => {
    var duedate = new Date(values?.duedate?.$d).getTime() / 1000;
    var shipdate1 = new Date(values?.shipdate1?.$d).getTime() / 1000;
    var shipdate2 = new Date(values?.shipdate2?.$d).getTime() / 1000;
    var shipdate3 = new Date(values?.shipdate3?.$d).getTime() / 1000;
    var shipdate4 = new Date(values?.shipdate4?.$d).getTime() / 1000;
    setProfileData({
      ...profileData,
      apparelsize: values?.apparelsize,
      babyname: values?.babyname,
      customernote: values?.customernote,
      duedate,
      email: values?.email,
      fathername: values?.fathername,
      firstname: values?.firstname,
      lastname: values?.lastname,
      phone: values?.phone,
      product1: values?.product1,
      product2: values?.product2,
      product3: values?.product3,
      product4: values?.product4,
      shipdate1,
      shipdate2,
      shipdate3,
      shipdate4,
      trackingnumber1: values?.trackingnumber1,
      trackingnumber2: values?.trackingnumber2,
      trackingnumber3: values?.trackingnumber3,
      trackingnumber4: values?.trackingnumber4,
    });
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

  const handleMealPlaning = () => {
    console.log(mealOneData);
    console.log(mealTwoData);
    console.log(mealThreeData);
  };

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
    console.log("document");

    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setDcument(file);
    } else {
      setDcument(null);
    }
  };

  const handleDocumentDelete = () => {
    documentRef.current.value = "";
    setDcument(null);
  };

  const handleCoachAssignment = (values) => {
    setCoachAssignment({
      ...coachAssignment,
      assignmentOne: values?.coachAssOne,
      assignmentTwo: values?.coachAssTwo,
      assignmentThree: values?.coachAssThree,
      assignmentFour: values?.coachAssFour,
    });
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
                    <div className="flex flex-col-reverse">
                      <Form.Item
                        name="profile"
                        rules={[
                          {
                            required: true,
                            message: "Please Select your profile",
                          },
                        ]}
                      >
                        <Input
                          type="file"
                          className="h-1 w-1 opacity-0 invisible absolute"
                          disabled={componentDisabled}
                          // required
                          id="profile"
                          ref={profileRef}
                          onChange={handleProfileChange}
                        />
                      </Form.Item>
                      <label
                        htmlFor="profile"
                        className={`w-full border border-fadeMid flex justify-between rounded-md overflow-hidden ${
                          componentDisabled ? "bg-disabled" : "bg-transparent"
                        } ${componentDisabled ? "" : "cursor-pointer"}`}
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
                        <span
                          className={`py-3 px-4 inline-flex font-mont text-sm text-black bg-whiteHigh border-l border-fadeSemi `}
                        >
                          Browse
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* name  */}
                  <div className="grid grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        FIRST NAME
                      </span>
                      <Form.Item
                        name="firstname"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi "
                          placeholder="first Name here..."
                        />
                      </Form.Item>
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        LAST NAME
                      </span>
                      <Form.Item
                        name="lastname"
                        rules={[
                          {
                            required: true,
                            message: "Please input your lastname!",
                          },
                        ]}
                      >
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi"
                          placeholder="last Name here..."
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* Customer Notes */}
                  <div className="">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Customer Notes
                      </span>
                      <Form.Item
                        name="customernote"
                        rules={[
                          {
                            required: true,
                            message: "Please input your customernote!",
                          },
                        ]}
                      >
                        <TextArea
                          className="py-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none"
                          placeholder="customer notes here..."
                        />
                      </Form.Item>
                      <div className="text-darkMid text-right">(45/1200)</div>
                    </div>
                  </div>
                  {/* father and baby name  */}
                  <div className="grid grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Father’s Name
                      </span>
                      <Form.Item
                        name="fathername"
                        rules={[
                          {
                            required: true,
                            message: "Please input your fathername!",
                          },
                        ]}
                      >
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi"
                          name="fathername"
                          placeholder="father Name here..."
                        />
                      </Form.Item>
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Baby’s Name
                      </span>
                      <Form.Item
                        name="babyname"
                        rules={[
                          {
                            required: true,
                            message: "Please input your fathername!",
                          },
                        ]}
                      >
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi"
                          name="babyname"
                          placeholder="baby Name here..."
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* Email  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black">
                      Email
                    </span>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        className="py-3 text-darkSemi placeholder:text-blackSemi"
                        placeholder="email here..."
                        type="email"
                      />
                    </Form.Item>
                  </div>
                  {/* phone number  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black">
                      Phone Number
                    </span>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                      ]}
                    >
                      <Input
                        className="py-3 text-darkSemi placeholder:text-blackSemi "
                        type="number"
                        placeholder="phone number here..."
                      />
                    </Form.Item>
                  </div>
                  {/* Due Date and Apparel Size  */}
                  <div className="grid grid-cols-2 items-center gap-6">
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Due Date
                      </span>
                      <Form.Item
                        name="duedate"
                        rules={[
                          {
                            required: true,
                            message: "Please input your due date!",
                          },
                        ]}
                      >
                        <DatePicker className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none" />
                      </Form.Item>
                    </div>
                    <div className="flex flex-col gap-5">
                      <span className="text-xs font-semibold text-black">
                        Apparel Size
                      </span>
                      <Form.Item
                        name="apparelsize"
                        rules={[
                          {
                            required: true,
                            message: "Please input your apparelsize",
                          },
                        ]}
                      >
                        <Input
                          className="py-3 text-darkSemi placeholder:text-blackSemi"
                          type="number"
                          placeholder="apparel size here..."
                        />
                      </Form.Item>
                    </div>
                  </div>
                  {/* profile  */}
                  <div className="flex flex-col gap-5">
                    <span className="text-xs font-semibold text-black">
                      Upload Document
                    </span>
                    <div className="flex flex-col-reverse">
                      <Form.Item
                        name="document"
                        rules={[
                          {
                            required: true,
                            message: "Please Select your document",
                          },
                        ]}
                      >
                        <Input
                          type="file"
                          name="document"
                          className="h-1 w-1 opacity-0 invisible absolute"
                          disabled={componentDisabled}
                          // required
                          id="document"
                          ref={documentRef}
                          onChange={handleDocumentChange}
                        />
                      </Form.Item>
                      <div
                        className={`w-full border border-fadeMid flex justify-between rounded-md overflow-hidden ${
                          componentDisabled ? "bg-disabled" : "bg-transparent"
                        }`}
                      >
                        <div className="w-full flex items-center justify-between px-3 text-darkSemi">
                          {document ? (
                            <>
                              <span>
                                {document?.name?.length > 90
                                  ? document?.name?.slice(0, 90) + "..."
                                  : document?.name}
                              </span>
                              <button
                                type="button"
                                className="flex items-center"
                                onClick={handleDocumentDelete}
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
                          htmlFor="document"
                          className={`py-3 px-4 inline-flex font-mont text-sm text-black bg-whiteHigh border-l border-fadeSemi ${
                            componentDisabled ? "" : "cursor-pointer"
                          }`}
                        >
                          Browse
                        </label>
                      </div>
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
                          <Form.Item
                            name="product1"
                            rules={[
                              {
                                required: true,
                                message: "Please select your product",
                              },
                            ]}
                            initialValue="Belly Wrap"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
                              <Select.Option value="Belly Wrap">
                                Belly Wrap
                              </Select.Option>
                              <Select.Option value="Postpartum kit">
                                Postpartum kit
                              </Select.Option>
                              <Select.Option value="Mommy Care">
                                Mommy Care
                              </Select.Option>
                              <Select.Option value="Complete Hospital Bag">
                                Complete Hospital Bag
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="shipdate1"
                            rules={[
                              {
                                required: true,
                                message: "Please pick your ship date",
                              },
                            ]}
                          >
                            <DatePicker className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none" />
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="trackingnumber1"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone number",
                              },
                            ]}
                          >
                            <Input
                              className="py-3 text-darkSemi placeholder:text-blackSemi "
                              type="number"
                              placeholder="Tracking number here..."
                            />
                          </Form.Item>
                        </div>
                        <div className="col-span-2">
                          <Form.Item
                            name="product2"
                            rules={[
                              {
                                required: true,
                                message: "Please select your product",
                              },
                            ]}
                            initialValue="Postpartum kit"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi ">
                              <Select.Option value="Belly Wrap">
                                Belly Wrap
                              </Select.Option>
                              <Select.Option value="Postpartum kit">
                                Postpartum kit
                              </Select.Option>
                              <Select.Option value="Mommy Care">
                                Mommy Care
                              </Select.Option>
                              <Select.Option value="Complete Hospital Bag">
                                Complete Hospital Bag
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="shipdate2"
                            rules={[
                              {
                                required: true,
                                message: "Please pick your ship date",
                              },
                            ]}
                          >
                            <DatePicker className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none" />
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="trackingnumber2"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone number",
                              },
                            ]}
                          >
                            <Input
                              className="py-3 text-darkSemi placeholder:text-blackSemi "
                              type="number"
                              placeholder="Tracking number here..."
                            />
                          </Form.Item>
                        </div>
                        <div className="col-span-2">
                          <Form.Item
                            name="product3"
                            rules={[
                              {
                                required: true,
                                message: "Please select your product",
                              },
                            ]}
                            initialValue="Mommy Care"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi ">
                              <Select.Option value="Belly Wrap">
                                Belly Wrap
                              </Select.Option>
                              <Select.Option value="Postpartum kit">
                                Postpartum kit
                              </Select.Option>
                              <Select.Option value="Mommy Care">
                                Mommy Care
                              </Select.Option>
                              <Select.Option value="Complete Hospital Bag">
                                Complete Hospital Bag
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="shipdate3"
                            rules={[
                              {
                                required: true,
                                message: "Please pick your ship date",
                              },
                            ]}
                          >
                            <DatePicker className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none" />
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="trackingnumber3"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone number",
                              },
                            ]}
                          >
                            <Input
                              className="py-3 text-darkSemi placeholder:text-blackSemi "
                              type="number"
                              placeholder="Tracking number here..."
                            />
                          </Form.Item>
                        </div>
                        <div className="col-span-2">
                          <Form.Item
                            name="product4"
                            rules={[
                              {
                                required: true,
                                message: "Please select your product",
                              },
                            ]}
                            initialValue="Complete Hospital Bag"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi ">
                              <Select.Option value="Belly Wrap">
                                Belly Wrap
                              </Select.Option>
                              <Select.Option value="Postpartum kit">
                                Postpartum kit
                              </Select.Option>
                              <Select.Option value="Mommy Care">
                                Mommy Care
                              </Select.Option>
                              <Select.Option value="Complete Hospital Bag">
                                Complete Hospital Bag
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="shipdate4"
                            rules={[
                              {
                                required: true,
                                message: "Please pick your ship date",
                              },
                            ]}
                          >
                            <DatePicker className="py-3 w-full text-darkSemi placeholder:text-blackSemi border-fadeMid shadow-none" />
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            name="trackingnumber4"
                            rules={[
                              {
                                required: true,
                                message: "Please input your phone number",
                              },
                            ]}
                          >
                            <Input
                              className="py-3 text-darkSemi placeholder:text-blackSemi "
                              type="number"
                              placeholder="Tracking number here..."
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white dfsfds"
                        onSubmit={handleProfile}
                      >
                        Save & Update
                      </Button>
                    </Form.Item>
                  </div>
                </Form>

                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  className="w-full relative flex flex-col gap-6"
                  onFinish={handleMealPlaning}
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
                          <Form.Item>
                            <Checkbox
                              name="Vegan"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center pb-2 text-blackHigh"
                            >
                              Vegan
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              name="Vegetarian"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center py-2 text-blackHigh"
                            >
                              Vegetarian
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              name="Gluten Free"
                              onChange={handleMealOnePlaning}
                              className="inline-flex items-center pt-2 text-blackHigh"
                            >
                              Gluten Free
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <Form.Item>
                            <Checkbox
                              name="Vegan"
                              onChange={handleMealTwoPlaning}
                              className="inline-flex items-center pb-2 text-blackHigh"
                            >
                              Vegan
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              name="Vegetarian"
                              onChange={handleMealTwoPlaning}
                              className="inline-flex items-center py-2 text-blackHigh"
                            >
                              Vegetarian
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              name="Gluten Free"
                              onChange={handleMealTwoPlaning}
                              className="inline-flex items-center pt-2 text-blackHigh"
                            >
                              Gluten Free
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <div className=" flex flex-col justify-center divide-y divide-aquaHigh p-4 border border-aquaHigh rounded-xl">
                          <Form.Item>
                            <Checkbox
                              name="Vegan"
                              onChange={handleMealThreePlaning}
                              className="inline-flex items-center pb-2 text-blackHigh"
                            >
                              Vegan
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              name="Vegetarian"
                              onChange={handleMealThreePlaning}
                              className="inline-flex items-center py-2 text-blackHigh"
                            >
                              Vegetarian
                            </Checkbox>
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              name="Gluten Free"
                              onChange={handleMealThreePlaning}
                              className="inline-flex items-center pt-2 text-blackHigh"
                            >
                              Gluten Free
                            </Checkbox>
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                      >
                        Save & Update
                      </Button>
                    </Form.Item>
                  </div>
                </Form>

                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  className="w-full relative flex flex-col gap-6"
                  onFinish={handleCoachAssignment}
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
                          <Form.Item
                            name="coachAssOne"
                            rules={[
                              {
                                required: true,
                                message: "Please Select Your Assignment",
                              },
                            ]}
                            initialValue="midwife concierge"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
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
                          </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Lactation Coach
                          </span>
                          <Form.Item
                            name="coachAssTwo"
                            rules={[
                              {
                                required: true,
                                message: "Please Select Your Assignment",
                              },
                            ]}
                            initialValue="lactation coach"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
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
                          </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Postpartum Therapist
                          </span>
                          <Form.Item
                            name="coachAssThree"
                            rules={[
                              {
                                required: true,
                                message: "Please Select Your Assignment",
                              },
                            ]}
                            initialValue="infant sleep coach"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
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
                          </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Infant Sleep Coach
                          </span>
                          <Form.Item
                            name="coachAssFour"
                            rules={[
                              {
                                required: true,
                                message: "Please Select Your Assignment",
                              },
                            ]}
                            initialValue="infant sleep coach"
                          >
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
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
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                      >
                        Save & Update
                      </Button>
                    </Form.Item>
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
                        <Form.Item>
                          <Input
                            className="py-3 text-darkSemi placeholder:text-blackSemi"
                            name="streetNameOne"
                            placeholder="street name here..."
                          />
                        </Form.Item>
                      </div>
                      {/* street name two  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 2
                        </span>
                        <Form.Item
                          initialValue="place one"
                          name="streenNameThree"
                        >
                          <Select className="w-full text-darkSemi placeholder:text-blackSemi">
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
                        </Form.Item>
                      </div>

                      {/* city and zip code  */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            City
                          </span>
                          <Form.Item initialValue="demo city one" name="city">
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
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
                          </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Zip Code
                          </span>
                          <Form.Item initialValue="1200" name="zipcode1">
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
                              <Select.Option value="1200">1200</Select.Option>
                              <Select.Option value="1201">1201</Select.Option>
                              <Select.Option value="1202">1202</Select.Option>
                              <Select.Option value="1203">1203</Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>

                      {/* Country  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Country
                        </span>
                        <Form.Item initialValue="australia" name="country1">
                          <Select className="w-full text-darkSemi placeholder:text-blackSemi">
                            <Select.Option value="australia">
                              Australia
                            </Select.Option>
                            <Select.Option value="colombia">
                              Colombia
                            </Select.Option>
                            <Select.Option value="cuba">Cuba</Select.Option>
                            <Select.Option value="canada">Canada</Select.Option>
                          </Select>
                        </Form.Item>
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
                        <Form.Item>
                          <Input
                            className="py-3 text-darkSemi placeholder:text-blackSemi"
                            name="streetNameOne"
                            placeholder="street name here..."
                          />
                        </Form.Item>
                      </div>
                      {/* street name two  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          Street Name 2
                        </span>
                        <Form.Item
                          initialValue="place one"
                          name="streenNameFour"
                        >
                          <Select className="w-full text-darkSemi placeholder:text-blackSemi">
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
                        </Form.Item>
                      </div>

                      {/* city and zip code  */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            City
                          </span>
                          <Form.Item initialValue="demo city one" name="city2">
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
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
                          </Form.Item>
                        </div>
                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-semibold text-blackHigh">
                            Zip Code
                          </span>
                          <Form.Item initialValue="1200" name="zipcode2">
                            <Select className="w-full flex items-center text-darkSemi placeholder:text-blackSemi">
                              <Select.Option value="1200">1200</Select.Option>
                              <Select.Option value="1201">1201</Select.Option>
                              <Select.Option value="1202">1202</Select.Option>
                              <Select.Option value="1203">1203</Select.Option>
                            </Select>
                          </Form.Item>
                        </div>
                      </div>

                      {/* Country  */}

                      {/* Country  */}

                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-blackHigh">
                          City
                        </span>
                        <Form.Item initialValue="colombia" name="country2">
                          <Select className="w-full text-darkSemi placeholder:text-blackSemi">
                            <Select.Option value="australia">
                              Australia
                            </Select.Option>
                            <Select.Option value="colombia">
                              Colombia
                            </Select.Option>
                            <Select.Option value="cuba">Cuba</Select.Option>
                            <Select.Option value="canada">Canada</Select.Option>
                          </Select>
                        </Form.Item>
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
