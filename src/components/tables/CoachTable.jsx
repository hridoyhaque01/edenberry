import React, { useState } from "react";
import data from "../../utils/data.json";
import { Pagination } from "../shared/pagination/Pagination";

function CoachTable() {
  const { coaches } = data || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = coaches?.slice(indexOfFirstRow, indexOfLastRow);

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
                  <th
                    scope="col"
                    className="px-6 py-5 text-right text-base font-normal"
                  >
                    Contact Signed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aquaHigh">
                {currentRows?.map((coaches) => (
                  <tr
                    className="hover:bg-whiteSemi text-blackLow text-sm"
                    key={coaches?.id}
                  >
                    <td className="px-6 py-3 whitespace-nowrap">
                      {coaches?.name}
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
                    <td className="px-6 py-3 whitespace-nowrap text-right">
                      {coaches?.contractSigned}
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
      </div>
    </div>
  );
}

export default CoachTable;
