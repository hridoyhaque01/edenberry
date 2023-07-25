import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CoachModal from "../modals/CoachModal";
import SearchLoader from "../shared/loaders/SearchLoader";
import { Pagination } from "../shared/pagination/Pagination";

function CoachTable() {
  const { isLoading, isError, coaches } = useSelector((state) => state.coaches);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = coaches?.slice(indexOfFirstRow, indexOfLastRow);

  if (isLoading) {
    return <SearchLoader></SearchLoader>;
  }

  if (!isLoading && isError) {
    return <div>Something went wrong!</div>;
  }

  if (!isLoading && !isError && coaches?.length === 0) {
    return <div>No coaches found</div>;
  }

  return (
    <div className="flex flex-col pb-8">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
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
                    Phone No.
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
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aquaHigh">
                {currentRows?.map((coaches) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={coaches?._id}
                  >
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.firstName + " " + coaches?.lastName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.phone}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.email}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.category}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right">
                      <button
                        className="flex items-center bg-secondaryLight rounded-xl max-w-max whitespace-nowrap p-2 text-white capitalize ml-auto"
                        // onClick={() => dispatch(setUser(customer))}
                        data-hs-overlay="#coach-modal"
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
          totalRows={coaches?.length}
        ></Pagination>
        <div>
          <CoachModal></CoachModal>
        </div>
      </div>
    </div>
  );
}

export default CoachTable;
