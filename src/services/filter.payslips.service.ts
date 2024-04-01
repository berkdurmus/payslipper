import { dayjs, Dayjs } from "../services/dayjs.service";
import { Payslip } from "../types/payslip.types";

// Filters an array of payslips based on a search term.
// The function matches payslips where the search term is found within the formatted fromDate or toDate.
//
// Parameters:
// - payslips: An array of Payslip objects to be filtered.
// - searchTerm: A string against which to match payslip dates.
//
// Returns:
// - An array of Payslip objects that match the search criteria.
export const filterPayslips = (
  payslips: Payslip[], // Array of payslips to filter
  searchTerm: string // Search term to filter by
) =>
  payslips.filter(
    (payslip: {
      fromDate: string | number | Date | Dayjs | null | undefined; // Starting date of the payslip
      toDate: string | number | Date | Dayjs | null | undefined; // Ending date of the payslip
    }) =>
      // Convert fromDate to "MMMM YYYY" format, check if it includes the search term
      dayjs(payslip.fromDate)
        .format("MMMM YYYY")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      // Convert toDate to "MMMM YYYY" format, check if it includes the search term
      dayjs(payslip.toDate)
        .format("MMMM YYYY")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      // Convert toDate to "DD.MM.YYYY" format, check if it includes the search term
      dayjs(payslip.toDate)
        .format("DD.MM.YYYY")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      // Convert fromDate to "DD.MM.YYYY" format, check if it includes the search term
      dayjs(payslip.fromDate)
        .format("DD.MM.YYYY")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
