import React, { useState } from "react";
import CustomerModal from "../../components/modals/CustomerModal";
import { Pagination } from "../../components/shared/pagination/Pagination";
import data from "../../utils/data.json";

function CustomerTable() {
  const { customers } = data || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = customers?.slice(indexOfFirstRow, indexOfLastRow);

  //   console.log(currentRows);

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
                    key={customer?.id}
                  >
                    <td
                      className="px-6 py-3 whitespace-nowrap"
                      data-hs-overlay="#hs-scroll-inside-body-modal"
                    >
                      {customer?.name}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.order_date}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.email}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.location}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {customer?.due_date}
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
          totalRows={customers?.length}
        ></Pagination>
        <div>
          <CustomerModal></CustomerModal>
        </div>
      </div>
    </div>
  );
}

export default CustomerTable;
