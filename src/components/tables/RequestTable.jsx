import React, { Fragment, useState } from "react";
// import { setUserData } from "../../features/users/usersSlice";
import ConfirmationModal from "../modals/ConfirmationModal";
import { Pagination } from "../shared/pagination/Pagination";

function RequestTable({ data, dispatchFun, setReason }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  const [requestData, setRequestData] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="-m-1.5 overflow-x-auto overflow-y-hidden h-full flex flex-col justify-between gap-2">
        <div className="p-1.5 min-w-full inline-block align-middle ">
          <div className="">
            <table className="min-w-full ">
              <thead>
                <tr className="bg-aqua text-black  ">
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Request Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Reason
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-5 text-right text-base font-normal"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aquaHigh">
                {currentRows?.map((request, i) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm overflow-visible"
                    key={i}
                  >
                    <td
                      className="px-6 py-3 whitespace-nowrap cursor-pointer"
                      data-hs-overlay="#hs-scroll-inside-body-modal"
                      // onClick={() => dispatch(setUserData(request))}
                    >
                      {request?.firstName + " " + request?.lastName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {new Date(
                        parseInt(request?.timestamp)
                      ).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {request?.email}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <label
                        htmlFor="reasonPopup"
                        className="text-infoColor underline cursor-pointer"
                        onClick={() => setReason(request?.reason)}
                      >
                        View reason
                      </label>
                    </td>

                    <td className="px-0 py-0 capitalize text-right pr-4 whitespace-nowrap">
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <label
                          tabIndex={1}
                          className={`rounded-lg px-2 py-2 w-24 focus:outline-none active:border-none bg-secondaryLight
                          text-redColor cursor-pointer select-none`}
                        >
                          pending
                          <i className="fa-solid fa-angle-down text-sm"></i>
                        </label>
                        <ul
                          tabIndex={1}
                          className="dropdown-content menu mt-2 m-0.5 shadow-lg bg-white rounded-md w-36 z-50"
                        >
                          <Fragment>
                            <label
                              // onClick={() => handleEdit(item)}
                              onClick={() =>
                                setRequestData({
                                  id: request?._id,
                                  status: "approve",
                                })
                              }
                              htmlFor="confirmationPopup"
                            >
                              <li>
                                <p
                                  className={`text-warningMain py-2 text-greenColor active:bg-blackLow w-full rounded-t-md `}
                                >
                                  approve
                                </p>
                              </li>
                            </label>
                            <hr className="text-disabledColor opacity-10" />
                            <label
                              onClick={() =>
                                setRequestData({
                                  id: request?._id,
                                  status: "denied",
                                })
                              }
                              htmlFor="confirmationPopup"
                            >
                              <li>
                                <p
                                  className={`py-2 text-redColor active:bg-blackLow w-full rounded-t-md `}
                                >
                                  denied
                                </p>
                              </li>
                            </label>
                          </Fragment>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={data?.length}
        ></Pagination>
      </div>
      <div>
        <ConfirmationModal
          id={requestData?.id}
          status={requestData?.status}
          dispatchFun={dispatchFun}
        ></ConfirmationModal>
      </div>
    </div>
  );
}

export default RequestTable;
