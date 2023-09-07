import React, { memo } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/shared/Cards/Card";
import AddButton from "../../components/shared/button/AddButton";
import SearchLoader from "../../components/shared/loaders/SearchLoader";

function Exercise() {
  const { isLoading, isError, exercise } = useSelector(
    (state) => state.exercise
  );

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (!isLoading && !isError && exercise?.length === 0) {
    content = <div>No data found!</div>;
  } else if (!isLoading && !isError && exercise?.length > 0) {
    content = (
      <div className="grid grid-cols-3 gap-6">
        {exercise?.map((item) => (
          <Card key={item?._id} item={item} navigateUrl="/editExercise"></Card>
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="pb-10 relative">
        <div>{content}</div>
        <div className="fixed bottom-12 right-12">
          <AddButton path="/addExercise" name="add new"></AddButton>
        </div>
      </section>
    </>
  );
}

export default memo(Exercise);
