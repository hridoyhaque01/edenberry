import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addLesson,
  deleteLesson,
  fetchCourses,
  updateLesson,
} from "../../features/services/courseSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";
import ConfirmationModal from "./ConfirmationModal";

function CourseModal({
  type,
  lessonIndex,
  courseData,
  setNavigateData,
  setIsLoading,
  setSuccess,
  errorNotify,
  infoNotify,
}) {
  const [lessonData, setLessonData] = useState({});

  const courseId = courseData?._id;
  const lessonModalRef = useRef();
  const thumbnailRef = useRef();
  const desRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const dispatch = useDispatch();
  // const { isLessonAddSuccess, isRequestLoading, isResponseError, lessons } =
  //   useSelector((state) => state.courses);
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

  const handleChange = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.lessonTitle.value;
    const description = form.lessonDescription.value;
    const videoUrl = form.videoUrl.value;
    const formData = new FormData();
    const data = {
      id: lessonIndex || courseData?.lessons?.length + 1,
      title,
      description,
      videoUrl,
    };
    formData.append("data", JSON.stringify(data));
    setIsLoading(true);
    setSuccess(false);
    try {
      if (type === "edit") {
        if (!thumbnail) {
          await dispatch(updateLesson({ id: courseId, formData }));
          setNavigateData((prev) => {
            const updatedLessons = prev.lessons.map((lesson) =>
              lesson.id === lessonIndex
                ? { ...lesson, title, description, videoUrl }
                : lesson
            );
            return {
              ...prev,
              lessons: updatedLessons,
            };
          });
        } else {
          const file = await getCompressedImage(thumbnail);
          formData.append("files", file);
          await dispatch(updateLesson({ id: courseId, formData }));
          setNavigateData((prev) => {
            const updatedLessons = prev.lessons.map((lesson) =>
              lesson.id === lessonIndex
                ? {
                    ...lesson,
                    title,
                    description,
                    videoUrl,
                    fileUrl: thumbnailPreview,
                  }
                : lesson
            );
            return {
              ...prev,
              lessons: updatedLessons,
            };
          });
        }
      } else {
        const file = await getCompressedImage(thumbnail);
        formData.append("files", file);
        await dispatch(addLesson({ id: courseId, formData }));
        setNavigateData((prev) => ({
          ...prev,
          lessons: [...prev?.lessons, { ...data, fileUrl: thumbnailPreview }],
        }));
      }
      setIsLoading(false);
      setSuccess(true);
      form.reset();
      setThumbnailPreview(null);
      infoNotify(
        `${
          type === "edit"
            ? "Lesson update successfull"
            : "Lesson add successfull"
        }`
      );
      dispatch(fetchCourses());
    } catch (error) {
      setIsLoading(false);
      setSuccess(false);
      errorNotify(
        `${type === "edit" ? "Lesson update failed" : "Lesson add failed"}`
      );
    }
  };

  const handleDeleteLesson = async () => {
    setIsLoading(true);
    setSuccess(false);

    dispatch(deleteLesson({ id: courseId, lessonIndex }))
      .unwrap()
      .then((res) => {
        setNavigateData((prev) => {
          const updatedLessons = prev.lessons.filter(
            (lesson) => lesson.id !== lessonIndex
          );
          return {
            ...prev,
            lessons: updatedLessons,
          };
        });
        dispatch(fetchCourses());
        lessonModalRef.current.reset();
        setThumbnailPreview(null);
        infoNotify("Delete lesson successfull");
        setIsLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        errorNotify("Delete lesson failed");
        setIsLoading(false);
        setSuccess(false);
      });
  };

  const lesson =
    lessonIndex !== null
      ? courseData?.lessons?.find((lesson) => lesson.id === lessonIndex)
      : null;

  useEffect(() => {
    // Add a check to ensure lessonIndex is valid before setting lessonData
    if (type === "edit" && lesson) {
      setLessonData(lesson);
      setThumbnailPreview(lesson?.fileUrl);
      setDescription(lesson?.description);
    } else {
      setLessonData({});
      setThumbnailPreview(null);
      setDescription("");
    }
  }, [type, courseData?.lessons, lessonIndex, lesson]);

  return (
    <div
      id="course-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[44rem] z-20 bg-white h-[calc(100%-8rem)] overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              {type ? "Update" : "Add"} Lesson
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
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              ref={lessonModalRef}
            >
              {/* COURSE NAME */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  Title
                </span>
                <input
                  required
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="lessonTitle"
                  placeholder="Enter lesson title"
                  defaultValue={lessonData?.title}
                />
              </div>

              {/* thumbnail  */}
              <div className="flex flex-col gap-5 ">
                <span className="text-xs font-semibold text-black">
                  Thumbnail
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
                          className=" w-full h-60 rounded-md bg-cover object-cover"
                        />
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Video Link */}
              <div className="flex flex-col gap-5">
                <span className="text-xs font-semibold text-black font-mont capitalize">
                  Video Link
                </span>
                <input
                  required
                  className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
                  name="videoUrl"
                  placeholder="Enter video link"
                  defaultValue={lessonData?.videoUrl}
                />
              </div>

              {/* Customer Notes */}
              <div className="">
                <div className="flex flex-col gap-5">
                  <span className="text-xs font-semibold text-black font-mont capitalize">
                    Description
                  </span>
                  <div className="w-full">
                    <textarea
                      required
                      name="lessonDescription"
                      className="p-3 h-72 w-full text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
                      placeholder="Enter lesson description"
                      value={description}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              {/* buttons */}

              <div className="flex justify-between mt-8">
                {type === "edit" && (
                  <label
                    htmlFor="confirmationPopup"
                    className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
                  >
                    Delete Lesson
                  </label>
                )}
                <div></div>
                <button
                  type="submit"
                  className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
                  data-hs-overlay="#course-modal"
                >
                  Save & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        <ConfirmationModal
          handleStatus={handleDeleteLesson}
          status="Delete"
          modalClose="#course-modal"
        ></ConfirmationModal>
      </div>
    </div>
  );
}

export default CourseModal;
