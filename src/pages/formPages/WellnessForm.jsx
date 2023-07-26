import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormTitle from "../../components/shared/titles/FormTitle";

import RequestLoader from "../../components/shared/loaders/RequestLoader";
import {
  addWellness,
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
  const { isRequestLoading, isResponseError, isSuccess, handleReset } =
    useSelector((state) => state.wellness);
  const dispatch = useDispatch();

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
    if (value.length <= 1200) {
      setDescription(value);
    }
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
    formData.append("data", JSON.stringify(data));

    let file = null;

    try {
      if (thumbnail) {
        file = await getCompressedImage(thumbnail);
      }
    } catch (error) {
      console.log(error);
    }

    setNavigateData({ ...data, fileUrl: thumbnailPreview, _id: id });
    if (type === "edit") {
      if (!file) {
        dispatch(updateWellness({ id, formData }));
      } else {
        formData.append("files", file);
        dispatch(updateWellness({ id, formData }));
      }
    } else {
      formData.append("files", file);
      dispatch(addWellness(formData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchWellness());
      if (type !== "edit") {
        formRef.current.reset();
        thumbnailRef.current.value = "";
        setThumbnail(null);
        setThumbnailPreview(null);
        setDescription("");
      }
      if (type === "edit") {
        infoNotify("Wellness update successfull");
      } else {
        infoNotify("Wellness add successfull");
      }
    } else if (isResponseError) {
      dispatch(handleReset());
      if (type === "edit") {
        errorNotify("Wellness update failed");
      } else {
        errorNotify("Wellness add failed");
      }
    }
  }, [isSuccess, dispatch, type]);

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
              Wellness name
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="title"
              placeholder="Enter Wellness name"
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
                className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
                placeholder="Enter wellness description"
                value={description}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-darkMid text-xs text-right">
                ({description?.length || 0}/1200)
              </p>
            </div>
          </div>
          {/* buttons */}

          <div className="flex justify-end items-center gap-6 mt-8">
            <button
              type="submit"
              className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              disabled={isRequestLoading}
            >
              {type === "edit" ? "Update Wellness" : "Add Wellness"}
            </button>
          </div>
          {isResponseError && (
            <p className="text-errorColor">Something went wrong!</p>
          )}
        </form>
      </div>
      {isRequestLoading && <RequestLoader></RequestLoader>}
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
    </section>
  );
}

export default WellnessForm;
