import React, { useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ProductModal from "../../components/modals/ProductModal";
import ProductCard from "../../components/shared/Cards/ProductCard";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import SearchLoader from "../../components/shared/loaders/SearchLoader";

function ListedProducts({ errorNotify, infoNotify }) {
  const { isLoading, isError, products } = useSelector(
    (state) => state.products
  );
  const [isRequestLoading, setIsRequestLoading] = useState();

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
      <div></div>
      {isRequestLoading && <RequestLoader></RequestLoader>}
      <ProductModal
        errorNotify={errorNotify}
        infoNotify={infoNotify}
        setIsRequestLoading={setIsRequestLoading}
      ></ProductModal>
    </>
  );
}

export default ListedProducts;
