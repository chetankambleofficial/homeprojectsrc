import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FilterSection } from "./sections/FilterSection/FilterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { VesselTableSection } from "./sections/VesselTableSection/VesselTableSection";
import GeneralLedgerTable from "./sections/GeneralLedger/GeneralLedgerTable";
import OpenBillRequestSection from "./sections/OpenBillRequestSection/OpenBillRequestSection";

import { exportToExcel } from "../../utils/exportToExcel";

export const App = ({ page }) => {
  const location = useLocation();

  let activePage =
    page || location.pathname.replace("/", "") || "vessels";
  if (activePage === "vessel") activePage = "vessels";

  const [vessels, setVessels] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);
  const [openBillRequest, setOpenBillRequest] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [recordCount, setRecordCount] = useState(0);

  // Fetch vessels
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vessels")
      .then((res) => setVessels(res.data))
      .catch(console.error);
  }, []);

  // Fetch General Ledger
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/general-ledger")
      .then((res) => setGeneralLedger(res.data))
      .catch(console.error);
  }, []);

  // Fetch Open Bill Requests
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/openbillrequest")
      .then((res) => setOpenBillRequest(res.data))
      .catch(console.error);
  }, []);

  // Build company list dynamically per page
  useEffect(() => {
    let list = [];
    if (activePage === "vessels") {
      list = vessels.map((v) => v.ACCOUNTING_COMPANY_NAME);
    }
    if (activePage === "general-ledger") {
      list = generalLedger.map((g) => g.documentNumber); // ONLY company names
    }
    if (activePage === "openbillrequest") {
      list = openBillRequest.map((b) => b.vendorCompanyName);
    }
    setCompanies(["All", ...new Set(list)]);
  }, [activePage, vessels, generalLedger, openBillRequest]);

  // Filter vessels
  const filteredVessels = vessels.filter(
    (v) =>
      (selectedCompany === "All" ||
        v.ACCOUNTING_COMPANY_NAME === selectedCompany) &&
      (searchQuery === "" ||
        v.VESSEL_NAME.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter General Ledger
  const filteredGL = generalLedger.filter(
    (g) =>
      (selectedCompany === "All" ||
        g.documentNumber === selectedCompany) &&
      (searchQuery === "" ||
        g.vesselImo.toString().includes(searchQuery)) &&
      (!startDate ||
        !endDate ||
        (new Date(g.transactionDate) >= new Date(startDate) &&
          new Date(g.transactionDate) <= new Date(endDate)))
  );

  // Filter Open Bill Requests
  const filteredOBR = openBillRequest.filter((b) => {
    const matchCompany =
      selectedCompany === "All" || b.vendorCompanyName === selectedCompany;

    const matchSearch =
      searchQuery === "" || b.vesselImo?.toString().includes(searchQuery);

    const matchPeriod =
      !startDate ||
      !endDate ||
      (new Date(b.invoiceDate) >= new Date(startDate) &&
        new Date(b.invoiceDate) <= new Date(endDate));

    return matchCompany && matchSearch && matchPeriod;
  });

  // Update record count
  useEffect(() => {
    if (activePage === "vessels") setRecordCount(filteredVessels.length);
    if (activePage === "general-ledger") setRecordCount(filteredGL.length);
    if (activePage === "openbillrequest") setRecordCount(filteredOBR.length);
  }, [filteredVessels, filteredGL, filteredOBR, activePage]);

  // Export to Excel
  const handleExport = () => {
    if (activePage === "general-ledger")
      exportToExcel(filteredGL, "GeneralLedger.xlsx");

    if (activePage === "openbillrequest")
      exportToExcel(filteredOBR, "OpenBillRequests.xlsx");
  };

  return (
    <Box sx={{ bgcolor: "#f2f4f7", width: "100%", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          bgcolor: "white",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <HeaderSection vesselCount={recordCount} />
      </Box>

      <Stack direction="row">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FilterSection
            companies={companies}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            activePage={activePage}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </LocalizationProvider>

        <Stack sx={{ width: "100%" }}>
          <MainContentSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            recordCount={recordCount}
            onExportExcel={handleExport}
          />

          {activePage === "vessels" && (
            <VesselTableSection vessels={filteredVessels} />
          )}

          {activePage === "general-ledger" && (
            <GeneralLedgerTable data={filteredGL} />
          )}

          {activePage === "openbillrequest" && (
            <OpenBillRequestSection data={filteredOBR} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
