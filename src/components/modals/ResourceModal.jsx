import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLesson, editLesson } from "../../features/resources/resourcesSlice";
import { imageIcon } from "../../utils/getImages";

function ResourceModal() {
  const { type, editData, indexNo } = useSelector((state) => state.resource);

  const thumbnailRef = useRef();
  const formRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const dispatch = useDispatch();

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];

    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      setThumbnail({
        name: file.name,
        size: file.size,
        type: file.type,
      });
      const imageURL = URL.createObjectURL(file);
      setThumbnailPreview(imageURL);
    } else {
      setThumbnail(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const lessonName = form.lessonName.value;
    const contentLink = form.contentLink.value;
    const customerNote = form.customernote.value;

    const data = {
      files: thumbnail,
      previewUrl: thumbnailPreview,
      lessonName,
      contentLink,
      customerNote,
    };

    if (type === "add") {
      dispatch(addLesson(data));
    }

    if (type === "edit") {
      dispatch(editLesson({ data, indexNo }));
    }

    formRef.current.reset();
    thumbnailRef.current.value = "";
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  return (
    <div
      id="lesson-modal"
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
              data-hs-overlay="#lesson-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="w-full p-8">
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {/* COURSE NAME */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  LESSON NAME
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="lessonName"
                  placeholder="lesson name here..."
                  required
                  defaultValue={editData?.lessonName}
                />
              </div>

              {/* thumbnail  */}
              <div className="flex flex-col gap-5 ">
                <span className="text-xs font-semibold text-black">
                  THUMBNAIL PICTURE
                </span>

                <div className="flex flex-col">
                  <input
                    required
                    type="file"
                    className="h-1 w-1 opacity-0  "
                    id="resourceLesson"
                    ref={thumbnailRef}
                    onChange={handleThumbnailChange}
                    name="resourceLesson"
                  />
                  {!thumbnail && !thumbnailPreview && (
                    <label
                      htmlFor="resourceLesson"
                      className={`flex flex-col items-center justify-center w-full h-60 rounded-xl bg-fade border border-secondaryColor cursor-pointer`}
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
                      htmlFor="resource"
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

              {/* Title */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  Content Link
                </span>
                <input
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="contentLink"
                  placeholder="content link here..."
                  required
                  defaultValue={editData?.contentLink}
                />
              </div>

              {/* Customer Notes */}
              <div className="">
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-semibold text-black font-mont uppercase">
                    Description
                  </span>
                  <textarea
                    name="customernote"
                    className="p-3 h-32 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                    placeholder="customer notes here..."
                    required
                    defaultValue={editData?.customerNote}
                  />
                  <div className="text-darkMid text-right">(45/1200)</div>
                </div>
              </div>
              {/* buttons */}

              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                >
                  Save & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceModal;
