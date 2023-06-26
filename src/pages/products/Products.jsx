import React from "react";
import ProductTabs from "../../components/shared/tabs/ProductTabs";
import Title from "../../components/shared/titles/Title";
import AddProduct from "./AddProduct";
import Inventory from "./Inventory";
import ListedProducts from "./ListedProducts";

function Products() {
  return (
    <div className="h-full flex flex-col gap-8 py-8">
      <Title></Title>
      <ProductTabs></ProductTabs>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
        >
          <ListedProducts> </ListedProducts>
        </div>

        <div
          id="tabs-with-underline-3"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-3"
        >
          <AddProduct></AddProduct>
        </div>
        <div
          id="tabs-with-underline-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-2"
        >
          <Inventory></Inventory>
        </div>
      </div>
    </div>
  );
}

export default Products;
