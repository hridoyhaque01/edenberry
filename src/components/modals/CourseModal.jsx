import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLesson,
  addLocalLessons,
} from "../../features/services/courseSlice";
import { imageIcon } from "../../utils/getImages";

function CourseModal({ id, type }) {
  const thumbnailRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const dispatch = useDispatch();
  const { isLessonAddSuccess, isLoading, isError } = useSelector(
    (state) => state.courses
  );
  const [data, setData] = useState();

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
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const videoUrl = form.videoUrl.value;

    const formData = new FormData();

    const data = {
      title,
      description,
      videoUrl,
    };

    formData.append("data", JSON.stringify(data));
    formData.append("files", thumbnail);
    dispatch(addLesson({ id: id, formData }));
    setData({ ...data, imageURL: thumbnailPreview });
  };

  useEffect(() => {
    if (isLessonAddSuccess) {
      console.log(data);

      dispatch(addLocalLessons(data));
      // dispatch(addLocalLessons({title }))
    }
  }, [isLessonAddSuccess]);

  return (
    <div
      id="course-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[44rem] z-20 bg-white h-[calc(100%-8rem)] overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              Add New Lesson
            </span>
            <button
              type="button"
              className="flex items-center justify-center max-w-max text-white"
              data-hs-overlay="#course-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="w-full p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {/* COURSE NAME */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  LESSON NAME
                </span>
                <input
                  required
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="title"
                  placeholder="lesson name here..."
                />
              </div>

              {/* thumbnail  */}
              <div className="flex flex-col gap-5 ">
                <span className="text-xs font-semibold text-black">
                  COURSE THUMBNAIL
                </span>

                <div className="flex flex-col">
                  <input
                    required={type === "edit" ? false : true}
                    type="file"
                    className="h-1 w-1 opacity-0  "
                    id="lesson"
                    ref={thumbnailRef}
                    onChange={handleThumbnailChange}
                    name="lesson"
                  />
                  {!thumbnailPreview && (
                    <label
                      htmlFor="lesson"
                      className={`flex flex-col items-center justify-center w-full h-60 rounded-xl bg-fade border border-secondaryColor cursor-pointer`}
                    >
                      <div>
                        <img src={imageIcon} alt="" />
                      </div>
                      <h4 className="text-base font-mont font-semibold text-secondaryColor mt-2">
                        Upload lesson thumbnail
                      </h4>
                      <p className="text-xs font-mont font-thin">
                        {" "}
                        svg, jpg, png, etc
                      </p>
                    </label>
                  )}
                  {thumbnailPreview && (
                    <label
                      htmlFor="lesson"
                      className={` w-full h-60 rounded-xl cursor-pointer`}
                    >
                      <div className="">
                        <img
                          src={thumbnailPreview}
                          alt=""
                          className=" w-full h-60 rounded-md"
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Video Link */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  VIDEO LINK
                </span>
                <input
                  required
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="videoUrl"
                  placeholder="video link here..."
                />
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
                    placeholder="customer notes here..."
                  />
                  <div className="text-darkMid text-right">(45/1200)</div>
                </div>
              </div>
              {/* buttons */}

              <div className="flex justify-end mt-8">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                >
                  Save & Update
                </button>
              </div>
            </form>
            {isError && <div>Something went wrong!</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
