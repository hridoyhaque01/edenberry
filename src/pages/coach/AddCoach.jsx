import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import { addCoache, fetchCoaches } from "../../features/coach/coachSlice";

function AddCoach() {
  const { isRequestLoading, isAddSuccess, isAddError, isUpdateSuccess } =
    useSelector((state) => state.coaches);

  const dispatch = useDispatch();

  const errorNotify = () =>
    toast.error("Coach add failed!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = () =>
    toast.info("Coach add successfull", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = (event) => {
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
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    dispatch(addCoache(formData));
    form.reset();
  };

  useEffect(() => {
    if (isAddSuccess) {
      dispatch(fetchCoaches());
      infoNotify();
    } else if (isAddError) {
      errorNotify();
      console.log(isAddSuccess, isUpdateSuccess);
    }
  }, [isAddSuccess, dispatch, isAddError]);

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
      {isRequestLoading && <RequestLoader></RequestLoader>}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}

export default React.memo(AddCoach);
