import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";
import SearchLoader from "../../components/shared/loaders/SearchLoader";
import ResourceTabs from "../../components/shared/tabs/ResourceTabs";

function Resources() {
  const { isLoading, isError, resources, activeTab } = useSelector(
    (state) => state.resources
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchResources());
  // }, []);

  let postpartum = null;
  let prenatal = null;

  if (isLoading) {
    postpartum = <SearchLoader></SearchLoader>;
    prenatal = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    postpartum = <div>Something went wrong!</div>;
    prenatal = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && resources?.length === 0) {
    postpartum = <div>No data found!</div>;
    prenatal = <div>No data found!</div>;
  } else if (!isLoading && !isError && resources?.length > 0) {
    const postpartums = resources?.filter(
      (item) => item?.status === "postpartum"
    );
    const prenatals = resources?.filter((item) => item?.status === "prenatal");

    if (postpartums?.length > 0) {
      postpartum = postpartums?.map((item) => (
        <Card key={item?._id} item={item} navigateUrl="/editResource"></Card>
      ));
    } else {
      postpartum = <div>No postpartum data found!</div>;
    }

    if (prenatals?.length > 0) {
      prenatal = prenatals?.map((item) => (
        <Card key={item?._id} item={item} navigateUrl="/editResource"></Card>
      ));
    } else {
      prenatal = <div>No prenatal data found!</div>;
    }
  }

  return (
    <section className="pb-10 relative">
      <div className="mt-12 mb-8">
        <ResourceTabs></ResourceTabs>
      </div>
      <div className="mt-3">
        <div
          id="tabs-with-underline-6"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "postpartum" ? "" : "hidden"}`}
        >
          <div className="grid grid-cols-3 gap-6">{postpartum}</div>
        </div>
        <div
          id="tabs-with-underline-7"
          role="tabpanel"
          aria-labelledby="tabs-with-underline-item-1"
          className={`${activeTab === "prenatal" ? "" : "hidden"}`}
        >
          <div className="grid grid-cols-3 gap-6">{prenatal}</div>
        </div>
      </div>

      <div className="fixed bottom-12 right-12">
        <AddButton path="/addResource" name="add new"></AddButton>
      </div>
    </section>
  );
}

export default Resources;
