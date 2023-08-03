import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteApprovedCoach,
  fetchApprovedCoaches,
} from "../../features/coach/coachSlice";
import CoachConfirmationModal from "../modals/CoachConfirmationModal";
import RequestLoader from "../shared/loaders/RequestLoader";
import SearchLoader from "../shared/loaders/SearchLoader";
import { Pagination } from "../shared/pagination/Pagination";

function ApprovedCoachTable({ infoNotify, errorNotify }) {
  const { isApprovedCoachLoading, isApprovedCoachError, approvedCoaches } =
    useSelector((state) => state.coaches);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = approvedCoaches?.slice(indexOfFirstRow, indexOfLastRow);
  const [isRequestLoading, setIsRequestLoading] = useState();
  const [approvedCoachId, setApprovedCoachId] = useState();

  if (isApprovedCoachLoading) {
    return <SearchLoader></SearchLoader>;
  }

  if (!isApprovedCoachLoading && isApprovedCoachError) {
    return <div className="p-6 text-errorColor">Something went wrong!</div>;
  }

  if (
    !isApprovedCoachLoading &&
    !isApprovedCoachError &&
    approvedCoaches?.length === 0
  ) {
    return <div className="p-6">No approvedCoaches found</div>;
  }

  const handleCoachDelete = async () => {
    setIsRequestLoading(true);
    dispatch(deleteApprovedCoach(approvedCoachId))
      .unwrap()
      .then((res) => {
        dispatch(fetchApprovedCoaches());
        infoNotify("Delete Approved coach successfull");
        setIsRequestLoading(false);
      })
      .catch((err) => {
        errorNotify("Delete Approved coach failed");
        setIsRequestLoading(false);
      });
  };

  return (
    <div className="flex flex-col  h-full">
      <div className="-m-1.5 overflow-x-auto h-full flex flex-col justify-between gap-2">
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
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-5  text-base font-normal text-right"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aquaHigh">
                {currentRows?.map((coach) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={coach?._id}
                  >
                    <td className="px-6 py-2 whitespace-nowrap">
                      {coach?.firstName + " " + coach?.lastName}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap">
                      {coach?.email}
                    </td>

                    <td className="px-6 py-2 whitespace-nowrap text-right">
                      <label
                        className="flex items-center bg-secondaryLight rounded-xl max-w-max whitespace-nowrap p-2 text-white capitalize ml-auto cursor-pointer"
                        onClick={() => setApprovedCoachId(coach?._id)}
                        htmlFor="coachConfirmationPopup"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          id="delete"
                        >
                          <g fill="none" fillRule="evenodd" stroke="#FF6B6B">
                            <path d="M5.5 7.5V20A1.5 1.5 0 0 0 7 21.5h11a1.5 1.5 0 0 0 1.5-1.5V7.5h-14z"></path>
                            <path
                              strokeLinecap="round"
                              d="M8.5 10.41v8.18M12.5 10.41v8.18M16.5 10.41v8.18M9 4.333V3.244C9 2.557 9.627 2 10.4 2h4.2c.773 0 1.4.557 1.4 1.244v1.09"
                            ></path>
                            <rect
                              width="18"
                              height="3"
                              x="3.5"
                              y="4.5"
                              rx="1.5"
                            ></rect>
                          </g>
                        </svg>
                      </label>
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
          totalRows={approvedCoaches?.length}
        ></Pagination>
      </div>
      <div>
        <CoachConfirmationModal
          handleStatus={handleCoachDelete}
          status="Delete"
          modalClose=""
        ></CoachConfirmationModal>
      </div>
      {isRequestLoading && <RequestLoader></RequestLoader>}
    </div>
  );
}

export default ApprovedCoachTable;
