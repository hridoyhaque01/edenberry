import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmin,
  updateAdmin,
  updateStaff,
} from "../../features/admin/adminSlice";
import SearchLoader from "../shared/loaders/SearchLoader";
import { Pagination } from "../shared/pagination/Pagination";

function StaffTable() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const {
    isLoading,
    isRequestLoading,
    isError,
    admins: staffs,
    isSuccess,
  } = useSelector((state) => state.admins);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const handleStatusChange = (value, id) => {
    let status = "inactive";
    if (value === "inactive") {
      status = "active";
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify({ status }));
    dispatch(updateAdmin({ token: userData?.token, formData, id }));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchAdmin(userData?.token));
    }
  }, [isSuccess, dispatch, userData?.token]);

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <div>Something wen wrong!</div>;
  } else if (!isLoading && !isError && staffs?.length === 0) {
    content = <div>No Data Found!</div>;
  } else if (!isLoading && !isError && staffs?.length > 0) {
    const filteredStaffs = staffs?.filter(
      (staff) => staff?._id !== userData?.admin?._id
    );

    const currentRows = filteredStaffs?.slice(indexOfFirstRow, indexOfLastRow);
    content = (
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
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Permissons
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
                {currentRows?.map((staff) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={staff?._id}
                  >
                    <td
                      className="px-6 py-3 whitespace-nowrap cursor-pointer"
                      data-hs-overlay="#staff-modal"
                      onClick={() => dispatch(updateStaff(staff))}
                    >
                      {staff?.firstName + " " + staff?.lastName}
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap">
                      {staff?.email}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        {staff?.permissions?.map((permission, i) => (
                          <span
                            className="bg-aqua text-black capitalize inline-flex px-3 py-1.5 rounded-lg text-xs"
                            key={i}
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() =>
                          handleStatusChange(staff?.status, staff?._id)
                        }
                        disabled={isRequestLoading}
                        className={`bg-aqua ${
                          staff?.status === "active"
                            ? "text-successColor"
                            : "text-errorColor"
                        } capitalize inline-flex px-3 py-1.5 rounded-lg`}
                      >
                        {staff?.status}
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
          totalRows={staffs?.length}
        ></Pagination>
      </div>
    );
  }

  return <div className="flex flex-col pb-8">{content}</div>;
}

export default StaffTable;
