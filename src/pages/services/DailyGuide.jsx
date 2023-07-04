import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";
import GuideTabs from "../../components/shared/tabs/GuideTabs";
import { fetchGuides } from "../../features/services/guidesSlice";

function DailyGuide() {
  const { isLoading, isError, guides, activeTab } = useSelector(
    (state) => state.guides
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGuides());
  }, []);

  let postpartum = null;
  let prenatal = null;

  if (isLoading) {
    postpartum = <div>loading...</div>;
    prenatal = <div>loading...</div>;
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
      postpartum = postpartums?.map((item) => (
        <Card key={item?._id} item={item} navigateUrl="/editGuide"></Card>
      ));
    } else {
      postpartum = <div>No postpartum data found!</div>;
    }

    if (prenatals?.length > 0) {
      prenatal = prenatals?.map((item) => (
        <Card key={item?._id} item={item} navigateUrl="/editGuide"></Card>
      ));
    } else {
      prenatal = <div>No prenatal data found!</div>;
    }
  }

  return (
    <section className="pb-10 relative">
      <div className="mt-12 mb-8">
        <GuideTabs></GuideTabs>
      </div>
      <div className="mt-3">
        <div
          id="tabs-with-underline-1"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "postpartum" ? "" : "hidden"}`}
        >
          <div className="grid grid-cols-3 gap-6">{postpartum}</div>
        </div>
        <div
          id="tabs-with-underline-2"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "prenatal" ? "" : "hidden"}`}
        >
          <div className="grid grid-cols-3 gap-6">{prenatal}</div>
        </div>
      </div>

      <div className="fixed bottom-16 right-12">
        <AddButton path="/addGuide" name="add new"></AddButton>
      </div>
    </section>
  );
}

export default DailyGuide;
