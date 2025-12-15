// src/utils/exportToExcel.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName = "data.xlsx") => {
  if (!data || data.length === 0) return;

  // Convert JSON to worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Create workbook and append worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write workbook to array buffer
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Save as file
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};
