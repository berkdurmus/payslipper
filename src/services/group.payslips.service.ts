import { dayjs } from "../services/dayjs.service";
import { Payslip } from "../types/payslip.types";

// Groups an array of payslips by their year, based on the `fromDate` of each payslip.
//
// Parameters:
// - payslips: An array of Payslip objects to be grouped.
//
// Returns:
// - An object where each key is a year (as a string) and its value is an array of Payslip
//   objects that belong to that year.
export const groupPayslipsByYear = (payslips: Payslip[]) => {
  // Initialize an object to hold the grouping of payslips by year.
  const groups: { [key: string]: Payslip[] } = {};

  // Iterate over each payslip in the array.
  payslips.forEach((payslip) => {
    // Extract the year from the payslip's fromDate using dayjs and format it as "YYYY".
    const year = dayjs(payslip.fromDate).format("YYYY");

    // If the groups object does not already have a key for this year, initialize it with an empty array.
    if (!groups[year]) {
      groups[year] = [];
    }

    // Add the current payslip to the array for its year.
    groups[year].push(payslip);
  });

  // Return the object containing the grouped payslips.
  return groups;
};
