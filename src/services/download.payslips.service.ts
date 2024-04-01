import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@awesome-cordova-plugins/file-opener";
import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";

// Function to download and view a PDF file, it runs the appropriate function based on the platform.
export const downloadAndViewPDF = async (url: string, name: string) => {
  if (
    Capacitor.getPlatform() === "ios" ||
    Capacitor.getPlatform() === "android"
  ) {
    await downloadAndViewPDFNative(url, name);
  } else if (Capacitor.getPlatform() === "web") {
    await downloadAndViewPDFWeb(url);
  }
};

// On native, we can save the PDF file and then open it with the default PDF viewer.
export const downloadAndViewPDFNative = async (
  url: RequestInfo | URL,
  name: string
) => {
  try {
    // Fetch the PDF file
    const response = await fetch(url);
    const blob = await response.blob();

    // Convert it to base64
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Data = reader.result as string; // Asserting as string; consider checking this

      const savedFile = await Filesystem.writeFile({
        path:'Payslip ' + name + '.pdf',
        data: base64Data,
        directory: Directory.Documents,
      });

      // Open the file with the default PDF viewer
      // This assumes FileOpener is correctly configured for use in a Capacitor project
      await FileOpener.showOpenWithDialog(savedFile.uri, "application/pdf");
    };
  } catch (error) {
    console.error("Error downloading or viewing the PDF:", error);
  }
};

// On web, we can safely open the PDF in a new tab
export const downloadAndViewPDFWeb = async (url: string) => {
  await Browser.open({ url });
};
