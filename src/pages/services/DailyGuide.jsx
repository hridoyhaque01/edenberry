import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import GuideTabs from "../../components/shared/tabs/GuideTabs";

function DailyGuide() {
  const { isLoading, isError, guides, activeTab, handleReset } = useSelector(
    (state) => state.guides
  );
  const dispatch = useDispatch();

  let postpartum = null;
  let prenatal = null;

  if (isLoading) {
    postpartum = <SearchLoader></SearchLoader>;
    prenatal = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    postpartum = <div>Something went wrong!</div>;
    prenatal = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && guides?.length === 0) {
    postpartum = <div>No data found!</div>;
    prenatal = <div>No data found!</div>;
  } else if (!isLoading && !isError && guides?.length > 0) {
    const postpartums = guides?.filter((item) => item?.status === "postpartum");
    const prenatals = guides?.filter((item) => item?.status === "prenatal");

    if (postpartums?.length > 0) {
      postpartum = (
        <div className="grid grid-cols-3 gap-6">
          {postpartums?.map((item) => (
            <Card key={item?._id} item={item} navigateUrl="/editGuide"></Card>
          ))}
        </div>
      );
    } else {
      postpartum = <div>No postpartum data found!</div>;
    }

    if (prenatals?.length > 0) {
      prenatal = (
        <div className="grid grid-cols-3 gap-6">
          {prenatals?.map((item) => (
            <Card key={item?._id} item={item} navigateUrl="/editGuide"></Card>
          ))}
        </div>
      );
    } else {
      prenatal = <div>No prenatal data found!</div>;
    }
  }

  return (
    <section className="pb-10 relative">
      <div className="mb-8">
        <GuideTabs></GuideTabs>
      </div>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "postpartum" ? "" : "hidden"}`}
        >
          <div>{postpartum}</div>
        </div>
        <div
          id="tabs-with-underline-2"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "prenatal" ? "" : "hidden"}`}
        >
          <div>{prenatal}</div>
        </div>
      </div>

      <div className="fixed bottom-12 right-12">
        <AddButton path="/addGuide" name="add new"></AddButton>
      </div>
    </section>
  );
}

export default DailyGuide;
