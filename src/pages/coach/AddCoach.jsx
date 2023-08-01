import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import { addCoache } from "../../features/coach/coachSlice";

function AddCoach({ errorNotify, infoNotify }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const data = {
      firstName,
      lastName,
      email,
    };
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      dispatch(addCoache(formData))
        .unwrap()
        .then((res) => {
          form.reset();
          setIsLoading(false);
          infoNotify("Coach add successfull");
        })
        .catch((error) => {
          setIsLoading(false);
          errorNotify("Coach add failed");
        });
    } catch (error) {
      errorNotify("Something went wrong");
    }
  };

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
                  className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
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
                  className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
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
                className="p-3 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                name="email"
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              >
                Add Coach
              </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
    </section>
  );
}

export default React.memo(AddCoach);
