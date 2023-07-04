import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWelcomeScreens } from "../../features/services/servicesSlice";

export default function DailyGuide() {
  const { isLoading, isError, isSuccess, screen } = useSelector(
    (state) => state.services
  );

  // const test = document.getElementById("test");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWelcomeScreens());
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  } else if (isSuccess) {
    // test.innerHTML = screen?.htmlContent;
  }

  return (
    <div>
      <div id="test"></div>
    </div>
  );
}
