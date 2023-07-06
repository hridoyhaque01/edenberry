import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";

function Courses() {
  const { isLoading, isError, courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  // useEffect(() => {
  // }, [dispatch]);

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && courses?.length === 0) {
    content = <div>No data found!</div>;
  } else if (!isLoading && !isError && courses?.length > 0) {
    content = courses?.map((item) => (
      <Card key={item?._id} item={item} navigateUrl="/editCourse"></Card>
    ));
  }

  return (
    <>
      <section className="pb-10 relative">
        <div className="grid grid-cols-3 gap-6">{content}</div>
        <div className="fixed bottom-16 right-12">
          <AddButton path="/addCourse" name="add new"></AddButton>
        </div>
      </section>
    </>
  );
}

export default memo(Courses);
