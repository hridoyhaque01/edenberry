import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseModal from "../../components/modals/CourseModal";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import FormTitle from "../../components/shared/titles/FormTitle";
import {
  addCourse,
  fetchCourses,
  updateCourse,
} from "../../features/services/courseSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";

function CourseForm() {
  const { state } = useLocation();
  const { data, type } = state || {};
  const {
    title,
    description: initialDescription,
    fileUrl,
    _id: id,
  } = data || {};

  const dispatch = useDispatch();
  // const [lessons, setLessons] = useState([]);
  const thumbnailRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(fileUrl || null);
  const [description, setDescription] = useState(initialDescription);
  const [lessonIndex, setLessonIndex] = useState();
  const [lessonType, setLessonType] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [navigateData, setNavigateData] = useState({});
  const navigate = useNavigate();
  const [isSuccess, setSuccess] = useState(false);

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

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1200) {
      setDescription(value);
    }
  };

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
    setIsLoading(true);
    setSuccess(false);

    try {
      if (type === "edit") {
        if (!thumbnail) {
          await dispatch(updateCourse({ id, formData }));
          await setNavigateData((prev) => ({
            ...prev,
            title,
            description,
            _id: id,
          }));
        } else {
          const file = await getCompressedImage(thumbnail);
          formData.append("files", file);
          await dispatch(updateCourse({ id, formData }));
          await setNavigateData((prev) => ({
            ...prev,
            title,
            description,
            _id: id,
            fileUrl: thumbnailPreview,
          }));
        }

        infoNotify("Course Update successful");
      } else {
        const file = await getCompressedImage(thumbnail);
        formData.append("files", file);
        await dispatch(addCourse(formData))
          .unwrap()
          .then((res) => {
            setNavigateData((prev) => ({
              ...prev,
              title,
              description,
              fileUrl: thumbnailPreview,
              _id: res?.insertedId,
              lessons: [],
            }));
            setIsDisabled(true);
          })
          .catch((err) => console.log(err));
        infoNotify("Course Add successful");
      }
      await dispatch(fetchCourses());
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setSuccess(false);

      if (type === "edit") {
        errorNotify("Course update failed");
      } else {
        errorNotify("Course add failed");
      }
    }
  };

  const handleLesson = (type, index) => {
    setLessonType(type);
    setLessonIndex(index);
  };

  useEffect(() => {
    if (type === "edit") {
      setNavigateData(data);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && type === "edit") {
      navigate("/editCourse", {
        state: {
          type: "edit",
          data: navigateData,
        },
      });
    }
  }, [isSuccess, type, navigateData, navigate]);

  // useEffect(() => {
  //   if (isLessonAddSuccess || isLessonEditSuccess) {
  //     setLessons(initialLesson);
  //   }
  // }, [isLessonAddSuccess, initialLesson]);

  // useEffect(() => {
  //   if (type === "edit" && stateLessons?.length > 0) {
  //     dispatch(addLocalLessons(stateLessons));
  //     console.log(stateLessons);
  //     setLessons(stateLessons);
  //   }
  // }, [type, dispatch, stateLessons]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(fetchCourses());
  //     if (type !== "edit") {
  //       setIsDisabled(true);
  //     }
  //     infoNotify(`course ${type === "edit" ? "update" : "add"} successfull`);
  //   } else if (isResponseError) {
  //     errorNotify("Something went wrong!");
  //   }
  // }, [isSuccess, dispatch, type, isResponseError]);

  return (
    <>
      <section className="pt-12 pb-10">
        <FormTitle
          path="/services"
          title={`${type === "edit" ? "Update" : "Add"} Course`}
        ></FormTitle>

        <div className="mt-12 z-20 p-8 bg-white overflow-auto rounded-xl shadow-sm border border-blueLight">
          <form
            action="#"
            className="flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black capitalize">
                Title
              </span>
              <input
                required
                id="courseName"
                type="text"
                placeholder="Enter course title"
                name="title"
                className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
                defaultValue={title}
              />
            </div>
            {/* thumbnail  */}
            <div className="flex flex-col gap-5 ">
              <span className="text-xs font-semibold text-black capitalize">
                Course Thumbnail
              </span>

              <div className="flex flex-col">
                <input
                  required={type === "edit" ? false : true}
                  type="file"
                  className="h-1 w-1 opacity-0  "
                  id="course"
                  ref={thumbnailRef}
                  onChange={handleThumbnailChange}
                  name="course"
                />
                {!thumbnailPreview && (
                  <label
                    htmlFor="course"
                    className={`flex flex-col items-center justify-center w-[30rem] max-w-[30rem] h-60 rounded-xl bg-fade border border-secondaryColor cursor-pointer`}
                  >
                    <div>
                      <img src={imageIcon} alt="" className="" />
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
                    htmlFor="course"
                    className={` w-[30rem] max-w-[30rem] h-60 rounded-xl cursor-pointer`}
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
            {/* customer notes */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black capitalize">
                Description
              </span>
              <div>
                <div>
                  <textarea
                    required
                    id="description"
                    name="description"
                    className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md resize-none h-32 text-sm placeholder:text-fadeSemi text-black"
                    placeholder="Enter course description"
                    value={description}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  <p className="text-darkMid text-xs text-right mt-1">
                    ({description?.length || 0}/1200)
                  </p>
                </div>
              </div>
            </div>

            {/* Lesson */}

            <div className="flex items-center justify-end">
              <button
                className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
                type="submit"
                disabled={isLoading || isDisabled}
              >
                Publish
              </button>
            </div>

            {navigateData?.lessons?.map((lesson, index) => (
              <div className="flex flex-col gap-5" key={index}>
                <span className="text-xs font-mont font-semibold text-black">
                  Lessons
                </span>
                <div className="flex items-center justify-between border  border-fadeSemi p-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        src={lesson?.fileUrl}
                        alt=""
                        className="w-16 h-16 rounded-md"
                      />
                    </div>
                    <div>
                      <h4 className="text-black font-mont font-bold text-2xl">
                        {lesson?.title}
                      </h4>
                      <p className="text-xs font-mont font-semibold mt-2">
                        Lesson: <span>{index + 1}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      data-hs-overlay="#course-modal"
                      onClick={() => handleLesson("edit", lesson?.id)}
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
              </div>
            ))}

            {navigateData?._id && (
              <div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-primaryColor"
                  data-hs-overlay="#course-modal"
                  onClick={() => handleLesson("add", null)}
                >
                  <span className="material-symbols-outlined">add</span>
                  <span className="text-sm font-mont font-semibold">
                    Add New
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
      <CourseModal
        type={lessonType}
        lessonIndex={lessonIndex}
        courseData={navigateData}
        setNavigateData={setNavigateData}
        setIsLoading={setIsLoading}
        setSuccess={setSuccess}
        errorNotify={errorNotify}
        infoNotify={infoNotify}
      ></CourseModal>
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
    </>
  );
}

export default CourseForm;
