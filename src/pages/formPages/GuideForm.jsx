import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormTitle from "../../components/shared/titles/FormTitle";

import ConfirmationModal from "../../components/modals/ConfirmationModal";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import {
  addGuide,
  deleteGuide,
  fetchGuides,
  updateGuide,
} from "../../features/services/guidesSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";

function GuideForm() {
  const { state } = useLocation();
  const { data, type } = state || {};
  const {
    title,
    description: initialDesciption,
    status,
    fileUrl,
    _id: id,
  } = data || {};
  const [description, setDescription] = useState(initialDesciption);
  const thumbnailRef = useRef();
  const formRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(fileUrl || null);
  const { isRequestLoading, isSuccess } = useSelector((state) => state.guides);
  const [navigateData, setNavigateData] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 1200) {
      setDescription(value);
    }
  };

  const dispatch = useDispatch();

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

  const handleSubmit = async (event) => {
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
        await dispatch(updateGuide({ id, formData }))
          .unwrap()
          .then((res) => {
            dispatch(fetchGuides())
              .unwrap()
              .then((res) => {
                setIsLoading(false);
                infoNotify("Daily Guide update successfull");
              });
          })
          .catch((error) => {
            setIsLoading(false);
            errorNotify("Daily Guide update failed");
          });
      } else {
        dispatch(addGuide(formData))
          .unwrap()
          .then((res) => {
            dispatch(fetchGuides())
              .unwrap()
              .then((res) => {
                formRef.current.reset();
                thumbnailRef.current.value = "";
                setThumbnail(null);
                setThumbnailPreview(null);
                setDescription("");
                infoNotify("Daily Guide add successfull");
                setIsLoading(false);
              });
          })
          .catch((error) => {
            setIsLoading(false);
            errorNotify("Daily Guide add failed");
          });
      }
    } catch (error) {
      setIsLoading(false);
      errorNotify("Somthing went wrong!");
    }
  };

  const handleGuideDelete = async () => {
    setIsLoading(true);

    dispatch(deleteGuide(id))
      .unwrap()
      .then((res) => {
        dispatch(fetchGuides())
          .unwrap()
          .then((res) => {
            infoNotify("Delete guide successfull");
            navigate("/services");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        errorNotify("Delete guide failed");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isSuccess && type === "edit") {
      navigate("/editGuide", {
        state: {
          type: "edit",
          data: navigateData,
        },
      });
    }
  }, [isSuccess, type]);

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
            <span className="text-xs font-semibold text-black  capitalize">
              Title
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="title"
              placeholder="Enter daily guide title"
              required
              defaultValue={title}
            />
          </div>
          {/* post is for */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black  capitalize">
              This post is for
            </span>
            <div className="relative col-span-2">
              <select
                className="w-full bg-transparent p-2.5 border border-fadeMid rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                name="status"
                required
                defaultValue={status || ""}
              >
                <option value="" disabled>
                  Select post
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
            <span className="text-xs font-semibold text-black  capitalize">
              Daily Guide Thumbnail
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
                  <h4 className="text-base  font-semibold text-secondaryColor mt-2">
                    Upload course thumbnail
                  </h4>
                  <p className="text-xs  font-thin"> svg, jpg, png, etc</p>
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
              <span className="text-xs font-semibold text-black capitalize">
                Description
              </span>
              <textarea
                required
                name="description"
                className="p-3 h-32 text-darkSemi placeholder:text-blackSemi resize-none bg-transparent border border-fadeMid rounded-md outline-none"
                placeholder="Enter daily description"
                value={description}
                onChange={(e) => handleChange(e)}
              />
              <p className="text-darkMid text-xs text-right">
                ({description?.length || 0}/1200)
              </p>
            </div>
          </div>
          {/* buttons */}

          <div className={"flex justify-between items-center gap-6 mt-8"}>
            {type === "edit" && (
              <label
                htmlFor="confirmationPopup"
                className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
              >
                Delete Daily Guide
              </label>
            )}
            <div></div>
            <button
              type="submit"
              className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
            >
              {type === "edit" ? "Update Daily Guide" : "Add Daily Guide"}
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
          handleStatus={handleGuideDelete}
          status="Delete"
          modalClose=""
        ></ConfirmationModal>
      </div>
    </section>
  );
}

export default GuideForm;
