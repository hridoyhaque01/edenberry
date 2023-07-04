import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoaches } from "../../features/coach/coachSlice";
import CoachModal from "../modals/CoachModal";
import { Pagination } from "../shared/pagination/Pagination";

function CoachTable() {
  const { isLoading, isError, coaches } = useSelector((state) => state.coaches);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = coaches?.slice(indexOfFirstRow, indexOfLastRow);
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCoaches(userData?.token));
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
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
                    Service
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Location
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aquaHigh">
                {currentRows?.map((coaches) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={coaches?._id}
                  >
                    <td
                      className="px-6 py-3 whitespace-nowrap"
                      data-hs-overlay="#coach-modal"
                    >
                      {coaches?.firstName + " " + coaches?.lastName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.phoneNo}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.email}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.service}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.location}
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
