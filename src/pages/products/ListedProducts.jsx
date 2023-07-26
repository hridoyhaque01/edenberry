import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "../../components/modals/ProductModal";
import ProductCard from "../../components/shared/Cards/ProductCard";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import {
  fetchProducts,
  resetState,
} from "../../features/products/productSlice";

function ListedProducts() {
  const {
    isLoading,
    isError,
    products,
    isResponseError,
    isSuccess,
    isRequestLoading,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    if (isSuccess) {
      infoNotify("Product update successfull");
      dispatch(fetchProducts());
      dispatch(resetState());
    } else if (isResponseError) {
      errorNotify("Product update failed");
      dispatch(resetState());
    }
  });

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && products?.length === 0) {
    content = <div>No data found!</div>;
  } else if (!isLoading && !isError && products?.length > 0) {
    content = (
      <div className="grid grid-cols-3 gap-6">
        {products?.map((item) => (
          <ProductCard details={item} key={item?._id}></ProductCard>
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="pb-8">
        <div>{content}</div>
      </section>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      {isRequestLoading && <RequestLoader></RequestLoader>}

      <ProductModal></ProductModal>
    </>
  );
}

export default ListedProducts;
