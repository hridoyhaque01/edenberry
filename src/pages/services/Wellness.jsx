import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WellnessModal from "../../components/modals/WellnessModal";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";
import SearchLoader from "../../components/shared/loaders/SearchLoader";

function Wellness() {
  const { isLoading, isError, wellness } = useSelector(
    (state) => state.wellness
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchWellness());
  // }, []);

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && wellness?.length === 0) {
    content = <div>No data found!</div>;
  } else if (!isLoading && !isError && wellness?.length > 0) {
    content = wellness?.map((item) => (
      <Card key={item?._id} item={item} navigateUrl="/editwellness"></Card>
    ));
  }

  return (
    <>
      <section className="pb-10 relative">
        <div className="grid grid-cols-3 gap-6">{content}</div>
        <div className="fixed bottom-16 right-12">
          <AddButton path="/addwellness" name="add new"></AddButton>
        </div>
      </section>
      <WellnessModal></WellnessModal>
    </>
  );
}

export default Wellness;
