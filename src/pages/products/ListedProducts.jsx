import React from "react";
import { useSelector } from "react-redux";
import ProductModal from "../../components/modals/ProductModal";
import ProductCard from "../../components/shared/Cards/ProductCard";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import { wellness1 } from "../../utils/getImages";

function ListedProducts() {
  const { isLoading, isError, products } = useSelector(
    (state) => state.products
  );

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <div className="text-errorColor">Something went wrong!</div>;
  } else if (!isLoading && !isError && products?.length === 0) {
    content = <div className="text-errorColor">No data found!</div>;
  } else if (!isLoading && !isError && products?.length > 0) {
    content = products?.map((item) => (
      <ProductCard details={item} key={item?._id}></ProductCard>
    ));
  }

  const details = {
    fileUrl: wellness1,
    title: "Nutrition",
    descritption:
      "Lorem ipsum dolor sit amet consectetur. Scelerisque commodo nec viverra condimentum. Nunc tellus. m dolor sit amet consectetur. Scelerisque commodo nec viverra condimentu",
  };
  return (
    <>
      <section className="pb-10">
        <div className="grid grid-cols-3 gap-6">{content}</div>
      </section>
      <ProductModal></ProductModal>
    </>
  );
}

export default ListedProducts;
