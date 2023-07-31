import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import {
  addProduct,
  fetchProducts,
} from "../../features/products/productSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";

function AddProduct({ errorNotify, infoNotify }) {
  const [product, setProduct] = useState(null);
  const productRef = useRef();
  const [description, setDescription] = useState("");
  const [productPreview, setProductPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1200) {
      setDescription(value);
    }
  };

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

  const handleProductAdded = async () => {
    await dispatch(fetchProducts());
    formRef.current.reset();
    setProductPreview(null);
    productRef.current.value = "";
    setDescription("");
    infoNotify("Add product successful");
  };

  const handleProductFailed = () => {
    errorNotify("Add product failed");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productname?.value;
    const description = form.description?.value;
    const data = {
      productName,
      description,
    };
    setIsLoading(true);
    try {
      const file = await getCompressedImage(product);
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("files", file);
      await dispatch(addProduct(formData));
      await handleProductAdded();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handleProductFailed();
      setIsLoading(false);
    }
  };

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
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold text-black font-mont capitalize">
            Product Description
          </span>
          <div className="w-full">
            <textarea
              name="description"
              className="p-3 h-32 w-full text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
              placeholder="Enter product description"
              required
              value={description}
              onChange={(e) => handleChange(e)}
            />
            <p className="text-darkMid text-xs text-right">
              ({description?.length || 0}/1200)
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
            disabled={isLoading}
          >
            Add Product
          </button>
        </div>
      </form>
      {isLoading && <RequestLoader></RequestLoader>}
      <div></div>
    </section>
  );
}

export default AddProduct;
