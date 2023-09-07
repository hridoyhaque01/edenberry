import React, { useState } from "react";
import ReactQuill from "react-quill";

function PrivacyModal() {
  const [text, setText] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],

      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        {
          color: ["red", "blue", "yellow"],
        },
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const handleSubmit = async () => {
    const content = `<div>${text}</div>`;
    setTest(content);
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_API_BASE_URL}/mark`,
    //     { data: content }
    //   );
    //   return response?.data;
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleChange = (value) => {
    setText(value);
  };
  return (
    <div
      id="privacy-modal"
      className="hs-overlay hidden w-full h-full fixed inset-y-0 left-0 z-[60] overflow-x-hidden overflow-y-auto bg-overlay scrollbar-none"
    >
      <div className=" hs-overlay-open:opacity-100 hs-overlay-open:duration-300 opacity-0 ease-out transition-all w-full h-full mx-auto flex items-center justify-center ">
        <div className="w-[44rem] z-20 bg-white h-auto overflow-auto rounded-xl">
          <div className="w-full py-3 px-4 bg-secondaryColor flex items-center justify-between">
            <span className="text-xl text-white font-semibold">
              Edit Privacy Policy
            </span>
            <button
              type="button"
              className="flex items-center justify-center max-w-max text-white"
              data-hs-overlay="#privacy-modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="w-full p-8">
            <div className=" relative">
              <ReactQuill
                modules={modules}
                formats={formats}
                onChange={handleChange}
              ></ReactQuill>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-secondaryColor px-6 py-3 text-white font-semibold capitalize rounded-md"
              >
                submit
              </button>
            </div>
          </div>
          ;
        </div>
        ;
      </div>
      ;
    </div>
  );
}

export default PrivacyModal;
