import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import { addCoache, fetchCoaches } from "../../features/coach/coachSlice";

function AddCoach() {
  const { isRequestLoading, isSuccess, isResponseError } = useSelector(
    (state) => state.coaches
  );

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    dispatch(addCoache(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchCoaches());
    }
  }, [isSuccess, dispatch]);

  return (
    <section className="pb-10">
      <div className="max-h-full overflow-hidden flex flex-col bg-white border border-blueLight shadow-sm rounded-xl p-8">
        <div>
          <h2 className="text-2xl font-bold text-dark">Add Coach Account</h2>
        </div>

        <div className="mt-12">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* names  */}
            <div className="grid grid-cols-2 items-center gap-6">
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black capitalize">
                  first name
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                  name="firstName"
                  required
                  placeholder="Enter first name"
                />
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black capitalize">
                  last name
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                  name="lastName"
                  required
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Email  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">Email</span>
              <input
                className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                name="email"
                required
                placeholder="Enter email address"
              />
            </div>

            {/* password  */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black">Password</span>
              <input
                className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md"
                name="password"
                required
                placeholder="Enter password"
              />
            </div>

            <div className="flex justify-end mt-8">
              <button
                disabled={isRequestLoading}
                type="submit"
                className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              >
                Save & Update
              </button>
            </div>
          </form>
        </div>
        {isResponseError && <div>Something went Wrong!</div>}
      </div>
      {isRequestLoading && <RequestLoader></RequestLoader>}
    </section>
  );
}

export default React.memo(AddCoach);
