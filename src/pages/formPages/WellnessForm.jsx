import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormTitle from "../../components/shared/titles/FormTitle";

import ConfirmationModal from "../../components/modals/ConfirmationModal";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import {
  addWellness,
  deleteWellness,
  fetchWellness,
  updateWellness,
} from "../../features/services/wellnessSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";

function WellnessForm() {
  const { state } = useLocation();

  const { data, type } = state || {};

  const {
    title,
    description: initialDesciption,
    fileUrl,
    _id: id,
  } = data || {};

  const thumbnailRef = useRef();
  const formRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState(initialDesciption);
  const [thumbnailPreview, setThumbnailPreview] = useState(fileUrl || null);
  const { isSuccess } = useSelector((state) => state.wellness);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [navigateData, setNavigateData] = useState({});
  const navigate = useNavigate();

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setThumbnail(file);
      const imageURL = URL.createObjectURL(file);
      setThumbnailPreview(imageURL);
    } else {
      setThumbnail(null);
      setThumbnailPreview(null);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const formData = new FormData();
    const data = {
      title,
      description,
    };
    setIsLoading(true);
    setNavigateData({ ...data, fileUrl: thumbnailPreview, _id: id });
    formData.append("data", JSON.stringify(data));
    let file = null;
    try {
      if (thumbnail) {
        file = await getCompressedImage(thumbnail);
        formData.append("files", file);
      }
      if (type === "edit") {
        dispatch(updateWellness({ id, formData }))
          .unwrap()
          .then((res) => {
            dispatch(fetchWellness())
              .unwrap()
              .then((res) => {
                setIsLoading(false);
                infoNotify("Wellness update successfull");
              });
          })
          .catch((error) => {
            setIsLoading(false);
            errorNotify("Wellness update failed");
          });
      } else {
        dispatch(addWellness(formData))
          .unwrap()
          .then((res) => {
            dispatch(fetchWellness())
              .unwrap()
              .then((res) => {
                setIsLoading(false);
                infoNotify("Wellness add successfull");
                formRef.current.reset();
                thumbnailRef.current.value = "";
                setThumbnail(null);
                setThumbnailPreview(null);
                setDescription("");
              });
          })
          .catch((error) => {
            setIsLoading(false);
            errorNotify("Wellness add failed");
          });
      }
    } catch (error) {
      setIsLoading(false);
      errorNotify("Something went wrong");
    }
  };

  const handleWellnesDelete = async () => {
    setIsLoading(true);

    dispatch(deleteWellness(id))
      .unwrap()
      .then((res) => {
        dispatch(fetchWellness())
          .unwrap()
          .then((res) => {
            // infoNotify("Delete wellness successfull");
            navigate("/services");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        errorNotify("Delete wellness failed");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isSuccess && type === "edit" && navigateData?._id) {
      navigate("/editWellness", {
        state: {
          type: "edit",
          data: navigateData,
        },
      });
    }
  }, [isSuccess, type, navigateData?._id]);

  return (
    <section className="pt-12 pb-10">
      <FormTitle
        path="/services"
        title={`${type === "edit" ? "Update" : "Add"} Wellness`}
      ></FormTitle>

      <div className="mt-12 z-20 p-8 bg-white overflow-auto rounded-xl shadow-sm border border-blueLight">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {/* Title */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Title
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="title"
              placeholder="Enter wellness title"
              required
              defaultValue={title}
            />
          </div>

          {/* thumbnail  */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Wellness thumbnail
            </span>
            <div className="flex flex-col">
              <input
                required={type === "edit" ? false : true}
                type="file"
                className="h-1 w-1 opacity-0  "
                id="wellness"
                ref={thumbnailRef}
                onChange={handleThumbnailChange}
                name="wellness"
              />
              {!thumbnailPreview && (
                <label
                  htmlFor="wellness"
                  className={`flex flex-col items-center justify-center  w-[30rem] max-w-[30rem] h-60 rounded-xl bg-fade border border-secondaryColor cursor-pointer`}
                >
                  <div>
                    <img src={imageIcon} alt="" />
                  </div>
                  <h4 className="text-base font-mont font-semibold text-secondaryColor mt-2">
                    Upload course thumbnail
                  </h4>
                  <p className="text-xs font-mont font-thin">
                    {" "}
                    svg, jpg, png, etc
                  </p>
                </label>
              )}
              {thumbnailPreview && (
                <label
                  htmlFor="wellness"
                  className={`  w-[30rem] max-w-[30rem] h-60 rounded-xl cursor-pointer`}
                >
                  <div className="">
                    <img
                      src={thumbnailPreview}
                      alt=""
                      className=" w-full h-60 rounded-md  bg-center bg-cover object-cover"
                    />
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Content Link */}
          {/* <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Content Link
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="siteUrl"
              placeholder="content link here"
            />
          </div> */}

          {/* Customer Notes */}
          <div className="">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black font-mont capitalize">
                Description
              </span>
              <textarea
                required
                name="description"
                className="p-3 h-72 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                placeholder="Enter wellness description"
                value={description}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {/* buttons */}

          <div className="flex justify-between items-center gap-6 mt-8">
            {type === "edit" && (
              <label
                htmlFor="confirmationPopup"
                className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
              >
                Delete Wellness
              </label>
            )}
            <div></div>
            <button
              type="submit"
              className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              disabled={isLoading}
            >
              {type === "edit" ? "Update Wellness" : "Add Wellness"}
            </button>
          </div>
        </form>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
      <div>
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
      </div>
      <div>
        <ConfirmationModal
          handleStatus={handleWellnesDelete}
          status="Delete"
          modalClose=""
        ></ConfirmationModal>
      </div>
    </section>
  );
}

export default WellnessForm;
