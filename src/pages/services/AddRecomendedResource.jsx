import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResourceModal from "../../components/modals/ResourceModal";
import { addType } from "../../features/services/servicesSlice";
import { imageIcon } from "../../utils/getImages";

function AddRecomendedResource() {
  const { lessons } = useSelector((state) => state.services);
  const thumbnailRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const formRef = useRef();
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

  const handleModal = (index, type, data) => {
    dispatch(addType({ index, type, data }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const description = form.description.value;
    const resourceName = form.resourceName.value;

    // formRef.current.reset();
    // thumbnailRef.current.value = "";
    // setThumbnail(null);
    // setThumbnailPreview(null);

    const data = { description, resourceName, thumbnail, lessons };
    console.log(data);
  };

  const handleThumbnailDelete = () => {
    thumbnailRef.current.value = "";
    setThumbnail(null);
  };
  return (
    <>
      <section className="pb-12">
        <div className="p-8 rounded-xl border border-blueLight">
          <form
            action="#"
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            {/* resource name  */}

            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black">
                Resource Name
              </span>
              <input
                required
                id="resourceName"
                type="text"
                placeholder="Resource name here..."
                name="resourceName"
                className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
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
                  id="resource"
                  ref={thumbnailRef}
                  onChange={handleThumbnailChange}
                  name="resource"
                />
                {!thumbnail && !thumbnailPreview && (
                  <label
                    htmlFor="resource"
                    className={`flex flex-col items-center justify-center w-[30rem] max-w-[30rem] h-60 rounded-xl bg-fade border border-secondaryColor cursor-pointer`}
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
                    className={` w-[30rem] max-w-[30rem] h-60 rounded-xl cursor-pointer`}
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
            {/* customer notes */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black">
                Description
              </span>
              <div>
                <textarea
                  id="description"
                  name="description"
                  className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md resize-none h-32 text-sm placeholder:text-fadeSemi text-black"
                  placeholder="description here..."
                ></textarea>
                <p className="text-darkMid text-xs text-right">(45/12000)</p>
              </div>
            </div>

            {/* Lesson */}

            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black">
                Lessons
              </span>
              {lessons?.map((item, i) => (
                <div
                  className="flex items-center justify-between border  border-fadeSemi p-2 rounded-lg"
                  key={i}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        src={item?.previewUrl}
                        alt=""
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                    <div>
                      <h4 className="text-black font-mont font-bold text-2xl">
                        {item?.lessonName?.length > 24
                          ? item?.lessonName?.slice(0, 24) + "..."
                          : item?.lessonName}
                      </h4>
                      <p className="text-xs font-mont font-semibold mt-2">
                        Lesson: <span>{i + 1 < 9 ? "0" + (i + 1) : i}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      data-hs-overlay="#lesson-modal"
                      onClick={() => handleModal(i, "edit", item)}
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="edit">
                          <path
                            id="Vector"
                            d="M16 22.0723H6C3.582 22.0723 2.25 20.7403 2.25 18.3223V8.32227C2.25 5.90427 3.582 4.57227 6 4.57227H9C9.414 4.57227 9.75 4.90827 9.75 5.32227C9.75 5.73627 9.414 6.07227 9 6.07227H6C4.423 6.07227 3.75 6.74527 3.75 8.32227V18.3223C3.75 19.8993 4.423 20.5723 6 20.5723H16C17.577 20.5723 18.25 19.8993 18.25 18.3223V15.3223C18.25 14.9083 18.586 14.5723 19 14.5723C19.414 14.5723 19.75 14.9083 19.75 15.3223V18.3223C19.75 20.7403 18.418 22.0723 16 22.0723Z"
                            fill="#F3BDB6"
                          />
                          <path
                            id="Vector_2"
                            d="M20.5691 7.40247L18.6791 9.28248L15.0391 5.64249L16.9191 3.75248C17.4891 3.18248 18.3991 3.1825 18.9691 3.7425L20.5791 5.35248C21.1391 5.92248 21.1391 6.83247 20.5691 7.40247Z"
                            fill="#F3BDB6"
                          />
                          <path
                            id="Vector_3"
                            opacity="0.4"
                            d="M18.68 9.28207L11.61 16.3221H8V12.7121L15.04 5.64209L18.68 9.28207Z"
                            fill="#F3BDB6"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-primaryColor"
                  data-hs-overlay="#lesson-modal"
                  onClick={() => handleModal("", "add", {})}
                >
                  <span className="material-symbols-outlined">add</span>
                  <span className="text-sm font-mont font-semibold">
                    Add New
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
                type="submit"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </section>
      <ResourceModal></ResourceModal>
    </>
  );
}

export default AddRecomendedResource;
