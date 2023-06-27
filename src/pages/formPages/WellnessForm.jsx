import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormTitle from "../../components/shared/titles/FormTitle";
import {
  addWellness,
  fetchWellness,
} from "../../features/services/servicesSlice";
import { imageIcon } from "../../utils/getImages";

function WellnessForm() {
  const thumbnailRef = useRef();
  const formRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.services
  );
  const dispatch = useDispatch();

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const siteUrl = form.siteUrl.value;
    const description = form.description.value;

    const formData = new FormData();

    const data = {
      title,
      siteUrl,
      description,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("files", thumbnail);

    dispatch(addWellness(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchWellness());
      formRef.current.reset();
      thumbnailRef.current.value = "";
      setThumbnail(null);
      setThumbnailPreview(null);
    }
  }, [isSuccess]);

  return (
    <section className="pt-12 pb-10">
      <FormTitle path="/services" title="Add Wellness"></FormTitle>

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
              placeholder="lesson name here..."
              required
            />
          </div>

          {/* thumbnail  */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont">
              Thumbnail
            </span>
            <div className="flex flex-col">
              <input
                required
                type="file"
                className="h-1 w-1 opacity-0  "
                id="wellness"
                ref={thumbnailRef}
                onChange={handleThumbnailChange}
                name="wellness"
              />
              {!thumbnail && (
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
              {thumbnail && thumbnailPreview && (
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
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Content Link
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="siteUrl"
              placeholder="content link here..."
            />
          </div>

          {/* Customer Notes */}
          <div className="">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black font-mont uppercase">
                Description
              </span>
              <textarea
                name="description"
                className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
                placeholder="wellness description here..."
              />
              <div className="text-darkMid text-right">(45/1200)</div>
            </div>
          </div>
          {/* buttons */}

          <div className="flex justify-end items-center gap-6 mt-8">
            <Link
              type="submit"
              className="text-darkSemi font-mont font-semibold text-sm"
              disabled={isLoading}
              to="/services"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              disabled={isLoading}
            >
              Save & Update
            </button>
          </div>
          {isError && <p className="text-errorColor">Something went wrong!</p>}
        </form>
      </div>
    </section>
  );
}

export default WellnessForm;
