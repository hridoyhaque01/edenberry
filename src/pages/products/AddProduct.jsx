import React, { useRef, useState } from "react";
import { imageIcon } from "../../utils/getImages";

function AddProduct() {
  const [profile, setProfile] = useState(null);
  const profileRef = useRef();
  const [productCount, setProductCount] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const formRef = useRef();

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setProfile(file);
      const imageURL = URL.createObjectURL(file);
      setThumbnailPreview(imageURL);
    } else {
      setProfile(null);
    }
  };

  const handleProfileDelete = () => {
    profileRef.current.value = "";
    setProfile(null);
  };

  const incrementProduct = () => {
    setProductCount((prev) => prev + 1);
  };

  const decrementProduct = () => {
    if (productCount <= 1) {
      return;
    } else {
      setProductCount((prev) => prev - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productname?.value;
    const description = form.productname?.value;
    const data = {
      productName,
      description,
      productCount,
    };
  };

  return (
    <section className="pb-10">
      {/* title  */}
      <div className="flex gap-4 mb-12">
        <div>
          <img
            src={thumbnailPreview || imageIcon}
            alt=""
            className="w-24 h-24 rounded-md border border-fade"
          />
        </div>
        {/* <h4 className="text-2xl font-bold text-black">Mom Care Box</h4> */}
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        ref={formRef}
      >
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
              id="addProduct"
              ref={profileRef}
              onChange={handleProfileChange}
              name="addProduct"
            />
            <div
              className={`w-full border border-fadeMid flex justify-between rounded-md bg-transparent overflow-hidden `}
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
                  <span>Name of the fille</span>
                )}
              </div>
              <label
                htmlFor="addProduct"
                className={`py-3 px-4 inline-flex font-mont text-sm text-black border-l border-fadeSemi cursor-pointer`}
              >
                Browse
              </label>
            </div>
          </div>
        </div>

        {/* COURSE NAME */}
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold text-black font-mont capitalize">
            Product Name
          </span>
          <input
            className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
            name="productname"
            placeholder="Product name here..."
            required
          />
        </div>

        {/* Product Description */}
        <div className="">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont uppercase">
              Product Description
            </span>
            <textarea
              name="description"
              className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
              placeholder="customer notes here..."
              required
            />
            <div className="text-darkMid text-right">(45/1200)</div>
          </div>
        </div>

        {/* inventory */}
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold text-black font-mont capitalize">
            Inventory
          </span>
          <div className="flex items-center px-8 py-2 gap-5 max-w-max border border-fadeSemi rounded-xl">
            <button
              type="button"
              className="flex items-center justify-center text-fadeReg"
              onClick={decrementProduct}
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="text-black font-mont font-semibold">
              {productCount}
            </span>
            <button
              type="button"
              className="flex items-center justify-center text-secondaryColor"
              onClick={incrementProduct}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
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
    </section>
  );
}

export default AddProduct;
