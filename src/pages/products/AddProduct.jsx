import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import {
  addProduct,
  fetchProducts,
} from "../../features/products/productSlice";
import { imageIcon } from "../../utils/getImages";

function AddProduct() {
  const [product, setProduct] = useState(null);
  const productRef = useRef();
  // const [productCount, setProductCount] = useState(1);
  const [productPreview, setProductPreview] = useState(null);
  const formRef = useRef();
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);

  const { isRequestLoading, isResponseError, isSuccess } = useSelector(
    (state) => state.products
  );

  const handleProductChange = (event) => {
    const file = event.target.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setProduct(file);
      const imageURL = URL.createObjectURL(file);
      setProductPreview(imageURL);
    } else {
      setProduct(null);
    }
  };

  // const incrementProduct = () => {
  //   setProductCount((prev) => prev + 1);
  // };

  // const decrementProduct = () => {
  //   if (productCount <= 1) {
  //     return;
  //   } else {
  //     setProductCount((prev) => prev - 1);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productname?.value;
    const description = form.description?.value;
    const data = {
      productName,
      description,
      // productCount,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("files", product);
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchProducts());
      formRef.current.reset();
      setProductPreview(null);
      productRef.current.value = "";
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isResponseError) {
      setIsError(isResponseError);
    }
  }, [isResponseError]);

  return (
    <section className="pb-10">
      {/* title  */}

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {/* product image  */}

        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold text-black  capitalize">
            Product Picture
          </span>
          <div className="flex flex-col">
            <input
              type="file"
              className="h-1 w-1 opacity-0  "
              id="productImage"
              ref={productRef}
              onChange={handleProductChange}
              name="productImage"
            />
            {!productPreview && (
              <label
                htmlFor="productImage"
                className={`flex flex-col items-center justify-center  w-[30rem] max-w-[30rem] h-60 rounded-xl bg-fade border border-secondaryColor cursor-pointer`}
              >
                <div>
                  <img src={imageIcon} alt="" />
                </div>
                <h4 className="text-base  font-semibold text-secondaryColor mt-2">
                  Upload product thumbnail
                </h4>
                <p className="text-xs  font-thin"> svg, jpg, png, etc</p>
              </label>
            )}
            {productPreview && (
              <label
                htmlFor="productImage"
                className={`  w-[30rem] max-w-[30rem] h-60 rounded-xl cursor-pointer`}
              >
                <div className="">
                  <img
                    src={productPreview}
                    alt=""
                    className=" w-full h-60 rounded-md  bg-center bg-cover object-cover"
                  />
                </div>
              </label>
            )}
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
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Description */}
        <div className="">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Product Description
            </span>
            <textarea
              name="description"
              className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
              placeholder="Enter product description"
              required
            />
            <div className="text-darkMid text-right">(45/1200)</div>
          </div>
        </div>

        {/* inventory */}
        {/* <div className="flex flex-col gap-5">
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
        </div> */}
        {/* buttons */}

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
            disabled={isRequestLoading}
          >
            Save & Update
          </button>
        </div>
      </form>
      {isRequestLoading && <RequestLoader></RequestLoader>}
      {isError && <div className="text-errorColor">Something went wrong!</div>}
    </section>
  );
}

export default AddProduct;
