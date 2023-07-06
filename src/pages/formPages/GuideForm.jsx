import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import FormTitle from "../../components/shared/titles/FormTitle";

import {
  addGuide,
  fetchGuides,
  updateGuide,
} from "../../features/services/guidesSlice";
import { imageIcon } from "../../utils/getImages";

function GuideForm() {
  const { state } = useLocation();
  const { data, type } = state || {};

  const { title, description, status, fileUrl, _id: id } = data || {};
  const thumbnailRef = useRef();
  const formRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(fileUrl || null);
  const { isRequestLoading, isResponseError, isSuccess } = useSelector(
    (state) => state.guides
  );
  const dispatch = useDispatch();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const status = form.status.value;
    const description = form.description.value;

    const formData = new FormData();

    const data = {
      title,
      status,
      description,
    };

    formData.append("data", JSON.stringify(data));

    if (type === "edit") {
      if (!thumbnail) {
        dispatch(updateGuide({ id, formData }));
      } else {
        formData.append("files", thumbnail);
        dispatch(updateGuide({ id, formData }));
      }
    } else {
      formData.append("files", thumbnail);
      dispatch(addGuide(formData));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchGuides());
      formRef.current.reset();
      thumbnailRef.current.value = "";
      setThumbnail(null);
      setThumbnailPreview(null);
    }
  }, [isSuccess]);

  return (
    <section className="pt-12 pb-10">
      <FormTitle
        path="/services"
        title={`${type === "edit" ? "Update" : "Add"} Daily Guide`}
      ></FormTitle>

      <div className="mt-12 z-20 p-8 bg-white overflow-auto rounded-xl shadow-sm border border-blueLight">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          {/* Resource NAME */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Daily Guide NAME
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="title"
              placeholder="Daily Guide name here..."
              required
              defaultValue={title}
            />
          </div>
          {/* post is for */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Daily Guide Status
            </span>
            <div className="relative col-span-2">
              <select
                className="w-full bg-transparent p-2.5 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                name="status"
                required
                defaultValue={status}
              >
                <option value="select post" disabled>
                  select post
                </option>
                <option value="postpartum">Postpartum</option>
                <option value="prenatal">Prenatal</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          {/* thumbnail  */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont">
              Daily Guide THUMBNAIL
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

          {/* Customer Notes */}
          <div className="">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-black font-mont uppercase">
                Description
              </span>
              <textarea
                required
                name="description"
                className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
                placeholder="wellness description here..."
                defaultValue={description}
              />
              <div className="text-darkMid text-right">(45/1200)</div>
            </div>
          </div>
          {/* buttons */}

          <div className="flex justify-end items-center gap-6 mt-8">
            <button
              type="submit"
              className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
              disabled={isRequestLoading}
            >
              Publish
            </button>
          </div>
          {isResponseError && (
            <p className="text-errorColor">Something went wrong!</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default GuideForm;