import React from "react";

export default function AddUser() {
  return (
    <section className="pb-10">
      <div className="p-8 border border-blueLight rounded-xl shadow-sm">
        <h4 className="text-xl font-mont font-bold text-black">Add users</h4>

        <form action="" className="flex flex-col gap-6 mt-11">
          {/* names  */}
          <div className="grid grid-cols-2 gap-6 items-center ">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black">
                First name
              </span>
              <input
                required
                id="firstname"
                type="text"
                placeholder="first name here..."
                name="firstName"
                className={`w-full outline-none border border-fadeMid  bg-transparent p-3 rounded-md text-sm placeholder:text-fadeSemi text-black `}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-xs font-mont font-semibold text-black">
                last name
              </span>
              <input
                required
                id="lastname"
                type="text"
                placeholder="last name here..."
                name="lastName"
                className={`w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black `}
              />
            </div>
          </div>

          {/* email name  */}
          <div className="flex flex-col gap-5">
            <label
              htmlFor="email"
              className="text-xs font-mont font-semibold text-black"
            >
              email
            </label>
            <input
              required
              id="email"
              type="email"
              placeholder="email address here..."
              name="email"
              className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
            />
          </div>

          {/* phone number  */}
          <div className="flex flex-col gap-5">
            <label
              htmlFor="phone"
              className="text-xs font-mont font-semibold text-black"
            >
              Phone Number
            </label>
            <input
              required
              id="phone"
              type="number"
              placeholder="phone number here..."
              name="phone"
              className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
            />
          </div>
          {/* date  */}

          <div className="flex flex-col gap-5">
            <span className="text-xs font-mont font-semibold text-black">
              Date
            </span>
            <input
              required
              type="date"
              name="date"
              // defaultValue={getIsoDateString(dueDate)}
              className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black "
            />
          </div>

          {/* price  */}
          <div className="flex flex-col gap-5">
            <label
              htmlFor="phone"
              className="text-xs font-mont font-semibold text-black"
            >
              Phone Number
            </label>
            <input
              required
              id="price"
              type="number"
              placeholder="price here..."
              name="price"
              className="w-full outline-none border border-fadeMid bg-transparent p-2.5 rounded-md text-sm placeholder:text-fadeSemi text-black"
            />
          </div>
          {/* submit button  */}
          <div className="flex items-center justify-end">
            <button
              className="w-60 py-4 bg-secondaryColor text-white text-sm font-mont font-semibold rounded-xl"
              type="submit"
            >
              Save & Update
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
