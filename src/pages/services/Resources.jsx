import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";
import { fetchResources } from "../../features/services/resourceSlice";

function Resources() {
  const { isLoading, isError, resources } = useSelector(
    (state) => state.resources
  );

  console.log(resources);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResources());
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && resources?.length === 0) {
    content = <div>No data found!</div>;
  } else if (!isLoading && !isError && resources?.length > 0) {
    content = resources?.map((item) => (
      <Card key={item?._id} item={item} navigateUrl="/editResource"></Card>
    ));
  }

  return (
    <section className="pb-10 relative">
      <div className="grid grid-cols-3 gap-6">{content}</div>
      <div className="fixed bottom-16 right-12">
        <AddButton path="/addResource" name="add new"></AddButton>
      </div>
    </section>
  );
}

export default Resources;
