import React from "react";
import { loaderTwo } from "../../../utils/getImages";

function SearchLoader() {
  return (
    <div className="px-6 py-4 flex justify-center w-full">
      <div className="w-[30rem]">
        <img src={loaderTwo} alt="" />
      </div>
    </div>
  );
}

export default SearchLoader;
