import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { product } from "../../utils/getImages";

function AddProducts() {
  const [countInventory, setCountInventory] = useState(1);

  const handleDecrement = () => {
    if (countInventory <= 1) {
      return;
    } else {
      setCountInventory((prev) => prev - 1);
    }
  };

  const handleIncreament = () => {
    setCountInventory((prev) => prev + 1);
  };

  return (
    <section className="pb-10">
      <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight shadow-sm rounded-xl p-8">
        <div className="mb-11 flex gap-4">
          <img src={product} alt="" />
          <h2 className="text-2xl font-bold text-black">Postpartum Kit</h2>
        </div>

        <div className="flex flex-col gap-11">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            className="w-full relative flex flex-col gap-6"
          >
            {/* profile  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">PICTURE</span>
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

            {/* productName  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">
                Product Name
              </span>
              <Input
                className="py-3 text-darkSemi placeholder:text-blackSemi"
                name="productName"
                placeholder="email here..."
              />
            </div>

            {/* Customer Notes */}
            <div className="">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  Product Description
                </span>
                <TextArea
                  name="customernote"
                  className="py-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none"
                  placeholder="Product description here..."
                />
                <div className="text-darkMid text-right">(45/1200)</div>
              </div>
            </div>

            {/* Inventory */}
            <div className="">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black">
                  Inventory
                </span>
                <div className="flex items-center gap-5 border border-fadeSemi max-w-max py-2 px-8 rounded-xl">
                  <button
                    type="button"
                    className="flex items-center justify-center text-fadeReg"
                    onClick={handleDecrement}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <div>{countInventory}</div>
                  <button
                    type="button"
                    className="flex items-center justify-center text-secondaryColor"
                    onClick={handleIncreament}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
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
  );
}

export default AddProducts;
