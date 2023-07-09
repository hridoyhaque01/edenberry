import React, { useState } from "react";
// import { setUserData } from "../../features/users/usersSlice";
import DropdownMenu from "../shared/DropdownMenu/DropdownMenu";
import { Pagination } from "../shared/pagination/Pagination";

function RequestTable({ data, dropdownMenus, dispatchFun, setReason }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="flex flex-col pb-8">
      <div className="-m-1.5 overflow-x-auto overflow-y-hidden">
        <div className="p-1.5 min-w-full inline-block align-middle">
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
                      {new Date(request?.timestamp).toLocaleDateString("en-US")}
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

                    <DropdownMenu
                      dispatchFun={dispatchFun}
                      id={request?._id}
                      dropdownMenus={dropdownMenus}
                    ></DropdownMenu>
                    {/* <td className="px-6 py-3 whitespace-nowrap text-right">
                      <span
                        className={`bg-aqua ${
                          request?.status === "active"
                            ? "text-successColor"
                            : "text-errorColor"
                        } capitalize inline-flex px-3 py-1.5 rounded-lg`}
                      >
                        {request?.status}
                      </span>
                    </td> */}
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
    </div>
  );
}

export default RequestTable;
