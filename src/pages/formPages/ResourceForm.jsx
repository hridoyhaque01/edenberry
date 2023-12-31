import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import RequestLoader from "../../components/shared/loaders/RequestLoader";
import FormTitle from "../../components/shared/titles/FormTitle";
import {
  addResource,
  deleteResource,
  fetchResources,
  updateResource,
} from "../../features/services/resourceSlice";
import getCompressedImage from "../../utils/getCompresedImage";
import { imageIcon } from "../../utils/getImages";

function ResourceForm() {
  const { state } = useLocation();
  const { data, type } = state || {};
  const {
    title,
    description: initialDesciption,
    status,
    fileUrl,
    _id: id,
  } = data || {};

  const thumbnailRef = useRef();
  const formRef = useRef();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(fileUrl || null);
  const { isSuccess } = useSelector((state) => state.resources);
  const [description, setDescription] = useState(initialDesciption);
  const [isLoading, setIsLoading] = useState(false);

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
      const fileUrl = URL.createObjectURL(file);
      setThumbnailPreview(fileUrl);
    } else {
      setThumbnail(null);
      setThumbnailPreview(null);
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
    setDescription(value);
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
        await dispatch(updateResource({ id, formData }))
          .unwrap()
          .then((res) => {
            dispatch(fetchResources())
              .unwrap()
              .then((res) => {
                infoNotify("Resource update successfull");
                setIsLoading(false);
              });
          })
          .catch((error) => {
            setIsLoading(false);
            errorNotify("Resource update failed");
          });
      } else {
        dispatch(addResource(formData))
          .unwrap()
          .then((res) => {
            dispatch(fetchResources())
              .unwrap()
              .then((res) => {
                infoNotify("Resource add successfull");
                setIsLoading(false);
                formRef.current.reset();
                thumbnailRef.current.value = "";
                setThumbnail(null);
                setThumbnailPreview(null);
                setDescription("");
              });
          })
          .catch((error) => {
            setIsLoading(false);
            errorNotify("Resource add failed");
          });
      }
    } catch (error) {
      setIsLoading(false);
      errorNotify("Something went wrong");
    }
  };

  const handleResourceDelete = async () => {
    setIsLoading(true);
    dispatch(deleteResource(id))
      .unwrap()
      .then((res) => {
        dispatch(fetchResources())
          .unwrap()
          .then((res) => {
            // infoNotify("Delete resource successfull");
            navigate("/services");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        errorNotify("Delete resource failed");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isSuccess && type === "edit" && navigateData?._id) {
      navigate("/editResource", {
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
        title={`${type === "edit" ? "Update" : "Add"} Resource`}
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
              Title
            </span>
            <input
              className="p-3 text-darkSemi placeholder:text-blackSemi  bg-transparent border border-fadeMid rounded-md outline-none"
              name="title"
              placeholder="Enter resource title"
              required
              defaultValue={title}
            />
          </div>
          {/* post is for */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
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
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Thumbnail
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
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-black font-mont capitalize">
              Description
            </span>
            <textarea
              required
              name="description"
              className="p-3 h-72 text-darkSemi placeholder:text-blackSemi bg-transparent border border-fadeMid rounded-md outline-none"
              placeholder="Enter resource description"
              value={description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* buttons */}

          <div className="flex justify-between items-center gap-6 mt-8">
            {type === "edit" && (
              <label
                htmlFor="confirmationPopup"
                className="h-14 w-60 py-4 px-6 rounded-xl bg-errorColor text-sm font-semibold text-white text-center cursor-pointer"
              >
                Delete Resource
              </label>
            )}
            <div></div>
            <button
              type="submit"
              className="h-14 w-60 py-4 px-6 rounded-xl bg-secondaryColor text-sm font-semibold text-white"
            >
              {type === "edit" ? "Update Resource" : "Add Resource"}
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
          handleStatus={handleResourceDelete}
          status="Delete"
          modalClose=""
        ></ConfirmationModal>
      </div>
    </section>
  );
}

export default ResourceForm;
