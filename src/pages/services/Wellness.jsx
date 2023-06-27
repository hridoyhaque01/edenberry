import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WellnessModal from "../../components/modals/WellnessModal";
import AddButton from "../../components/shared/button/AddButton";
import { fetchWellness } from "../../features/services/servicesSlice";

function Wellness() {
  const { isLoading, isError, wellness } = useSelector(
    (state) => state.services
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWellness());
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && wellness?.length === 0) {
    content = <div>No data found!</div>;
  } else if (!isLoading && !isError && wellness?.length > 0) {
    content = wellness?.map((item) => (
      <Link
        to={item?.siteUrl}
        className=" rounded-xl overflow-hidden shadow-lg"
        key={item?._id}
      >
        <div>
          <img
            src={item?.fileUrl}
            alt=""
            className="h-96 bg-center object-cover w-full bg-cover "
          />
        </div>
        <div className="py-4 px-3">
          <h4 className="text-base text-dark font-semibold font-mont">
            {item?.title}
          </h4>
          <p className="text-fadeHigh font-mont">{item?.description}</p>
        </div>
      </Link>
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
