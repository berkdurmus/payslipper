import React, { useState } from "react";
import { Link } from "react-router-dom";
import { payslips } from "../constants/payslips.constant";
import { dayjs } from "../services/dayjs.service";
import { groupPayslipsByYear } from "../services/group.payslips.service";
import Header from "./Header";
import { filterPayslips } from "../services/filter.payslips.service";

const PayslipList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPayslips = filterPayslips(payslips, searchTerm);
  const groupedPayslips = groupPayslipsByYear(filteredPayslips);

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-[40px]">
      <Header />
      <input
        type="text"
        className="mb-10 px-4 py-2 w-full text-m border rounded-md focus:outline-none border-indigo-200 border-2 focus:border-indigo-500"
        placeholder="🔍 Search payslips by month or year."
        onChange={handleSearchChange}
      />
      {filteredPayslips.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-10">
          🌱 No payslips found. Try searching with payslip start/end date,
          month, or year.
        </div>
      )}
      {Object.keys(groupedPayslips)
        .sort()
        .reverse()
        .map((year) => (
          <div key={year} className="mb-5">
            <h2 className="text-2xl font-semibold mb-3 text-gray-500">
              {year}
            </h2>
            <div className="border-b border-gray-200 mb-4"></div>
            <div className="space-y-2">
              {groupedPayslips[year].map((payslip) => (
                <Link
                  to={`/payslip/${payslip.id}`}
                  key={payslip.id}
                  className="group"
                >
                  <div className="flex flex-col p-4 rounded-lg hover:bg-gray-200 transition duration-300 gap-1">
                    <span className="text-lg font-medium text-gray-900">
                      {dayjs(payslip.fromDate).format("MMMM")}
                    </span>
                    <span className="text-gray-500">
                      {dayjs(payslip.fromDate).format("DD.MM.YYYY")} -{" "}
                      {dayjs(payslip.toDate).format("DD.MM.YYYY")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PayslipList;
