import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerModal from "../../components/modals/CustomerModal";
import { Pagination } from "../../components/shared/pagination/Pagination";
import { setUser } from "../../features/users/usersSlice";
import SearchLoader from "../shared/loaders/SearchLoader";

function CustomerTable() {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    users,
    userData: user,
  } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <div>Something wen wrong!</div>;
  } else if (!isLoading && !isError && users?.length === 0) {
    content = <div>No Data Found!</div>;
  } else if (!isLoading && !isError && users?.length > 0) {
    const currentRows = users?.slice(indexOfFirstRow, indexOfLastRow);
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
                    Order Date
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
                    Location
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-5 text-left text-base font-normal"
                  >
                    Due Date
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
                {currentRows?.map((customer) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={customer?._id}
                  >
                    <td
                      className="px-6 py-3 whitespace-nowrap cursor-pointer"
                      data-hs-overlay="#hs-scroll-inside-body-modal"
                      onClick={() => dispatch(setUser(customer))}
                    >
                      {customer?.firstName + " " + customer?.lastName}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.orderDate}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.email}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.location}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {new Date(customer?.dueDate).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right">
                      <span
                        className={`bg-aqua ${
                          customer?.status === "active"
                            ? "text-successColor"
                            : "text-errorColor"
                        } capitalize inline-flex px-3 py-1.5 rounded-lg`}
                      >
                        {customer?.status}
                      </span>
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
          totalRows={users?.length}
        ></Pagination>
        <div>
          <CustomerModal userData={user}></CustomerModal>
        </div>
      </div>
    );
  }

  return <div className="flex flex-col pb-8">{content}</div>;
}

export default CustomerTable;
