import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../features/products/productSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";
import ConfirmationModal from "./ConfirmationModal";

function ProductModal({ errorNotify, infoNotify, setIsRequestLoading }) {
  const [product, setProduct] = useState(null);
  const productRef = useRef();
  // const [productCount, setProductCount] = useState(1);
  const [productPreview, setProductPreview] = useState(null);
  const { activeProduct, isRequestLoading } = useSelector(
    (state) => state.products
  );
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState();

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

  const handleChange = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  useEffect(() => {
    if (activeProduct?._id) {
      setData(activeProduct);
      setDescription(activeProduct?.description);
      setProductPreview(activeProduct?.fileUrl);
    }
  }, [activeProduct]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.productname?.value;
    const description = form.description?.value;
    const data = {
      productName,
      description,
      // productCount,
    };
    setIsRequestLoading(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    try {
      if (product) {
        const file = await getCompressedImage(product);
        formData.append("files", file);
      }
      dispatch(updateProduct({ id: activeProduct?._id, formData }))
        .unwrap()
        .then((res) => {
          dispatch(fetchProducts())
            .unwrap()
            .then((res) => {
              infoNotify("Product update successfull");
              setIsRequestLoading(false);
            });
        })
        .catch((error) => {
          errorNotify("Product update failed");
          setIsRequestLoading(false);
        });
    } catch (error) {
      errorNotify("Somthing went wrong");
      setIsRequestLoading(false);
    }
  };

  const handleProductDelete = async () => {
    setIsRequestLoading(true);
    dispatch(deleteProduct(activeProduct?._id))
      .unwrap()
      .then((res) => {
        dispatch(fetchProducts()).then((res) => {
          infoNotify("Delete product successfull");
          setIsRequestLoading(false);
        });
      })
      .catch((err) => {
        errorNotify("Delete product failed");
        setIsRequestLoading(false);
      });
  };

  return (
    <div
      id="product-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[44rem] z-20 bg-white h-[calc(100%-8rem)] overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              Edit Product Detail
            </span>
            <button
              type="button"
              className="flex items-center justify-center max-w-max text-white"
              data-hs-overlay="#product-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="w-full p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* product image  */}

              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black  capitalize">
                  Product Picture
                </span>
                <div className="flex flex-col">
                  <input
                    type="file"
                    className="h-1 w-1 opacity-0  "
                    id="productImageModal"
                    ref={productRef}
                    onChange={handleProductChange}
                    name="productImageModal"
                  />
                  {!productPreview && (
                    <label
                      htmlFor="productImageModal"
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
                      htmlFor="productImageModal"
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
                  defaultValue={data?.productName}
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
                    className="p-3 w-full h-72 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                    placeholder="Enter product description"
                    required
                    value={description}
                    onChange={(e) => handleChange(e)}
                  />
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

              <div className="flex items-center justify-between mt-8">
                <label
                  htmlFor="confirmationPopup"
                  className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
                >
                  Delete Product
                </label>
                <button
                  type="submit"
                  className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                  data-hs-overlay="#product-modal"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
          <div>
            <ConfirmationModal
              handleStatus={handleProductDelete}
              status="Delete"
              modalClose="#product-modal"
            ></ConfirmationModal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
