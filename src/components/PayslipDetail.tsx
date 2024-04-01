import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { payslips } from "../constants/payslips.constant";
import { dayjs } from "../services/dayjs.service";
import { downloadAndViewPDF } from "../services/download.payslips.service";
import { Capacitor } from "@capacitor/core";
import Navbar from "./Navbar";

const PayslipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const payslip = payslips.find((p) => p.id === id);
  const formattedPeriod = `${dayjs(payslip?.fromDate).format(
    "DD.MM.YYYY"
  )} - ${dayjs(payslip?.toDate).format("DD.MM.YYYY")}`;

  useEffect(() => {
    // Scrolls to the top of the page whenever the component is rendered
    window.scrollTo(0, 0);
  }, [id]); // Dependency array includes `id` to ensure effect runs when `id` changes

  // Check if the platform is Android, iOS, or web and adjust the PDF URL accordingly.
  // For Android, wrap the PDF URL with Google Docs Viewer.
  const pdfUrl =
    Capacitor.getPlatform() === "android"
      ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
          payslip?.file ?? ""
        )}`
      : payslip?.file;

  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Fail fast, if the payslip is not found
  if (!payslip) {
    return (
      <div className="bg-gray-100 min-h-screen p-6 mt-[40px]">
        <Navbar />
        <div className="text-2xl font-semibold mb-6 text-gray-800">
          🌱 Payslip not found!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-[40px]">
      <Navbar />
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">
        {" "}
        {dayjs(payslip.fromDate).format("MMMM")} Payslip
      </h3>
      <div className="mb-4">
        <div className="mb-4">
          <iframe
            src={pdfUrl}
            width="100%"
            height="500px"
            className="rounded-md shadow-lg"
            onLoad={() => setIframeLoaded(true)}
          >
            <p>Your browser does not support embedded PDF files.</p>
          </iframe>
          {!iframeLoaded && (
            <div>
              If you cannot see the payslip preview, you can still download
              below.
            </div>
          )}
        </div>
        <div className="text-lg font-medium text-gray-900">
          <span>Period: </span>
          <span className="text-gray-600">{formattedPeriod}</span>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => downloadAndViewPDF(payslip.file, formattedPeriod)}
          className="mb-4 px-4 py-2 w-full text-m text-white bg-indigo-500 rounded-md"
        >
          Download Payslip
        </button>
      </div>
    </div>
  );
};

export default PayslipDetail;
