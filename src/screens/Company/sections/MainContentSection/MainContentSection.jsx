import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export const MainContentSection = ({
  searchQuery,
  setSearchQuery,
  recordCount,
  onExportExcel,
}) => {
  const location = useLocation();

  // Detect pages
  const isVesselsPage = location.pathname === "/vessel";
  const isLedgerPage = location.pathname === "/general-ledger";
  const isOpenBillPage = location.pathname === "/openbillrequest";
  const isSpecialPage = isLedgerPage || isOpenBillPage;

  // Determine placeholder text based on page
  const searchPlaceholder = isVesselsPage
    ? "Search by Vessel Name..."
    : "Search by Vessel IMO No...";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 96,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        bgcolor: "white",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {/* Title + Count */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: "#1e1e1e", fontSize: "24px" }}
        >
          {isVesselsPage
            ? "Vessel Details"
            : isLedgerPage
            ? "General Ledger"
            : isOpenBillPage
            ? "Open Bill Requests"
            : ""}
        </Typography>

        <Chip
          label={isSpecialPage ? `${recordCount} Records` : `${recordCount} Vessels`}
          sx={{
            bgcolor: "#174bcc1a",
            color: "#174bcc",
            fontWeight: 600,
            fontSize: "14px",
            height: "auto",
            py: 0.5,
            px: 1,
          }}
        />
      </Stack>

      {/* Right-side actions */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Search bar visible on all pages */}
        <TextField
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ width: 260 }}
          InputProps={{
            endAdornment: searchQuery ? (
              <InputAdornment position="end">
                <CloseIcon
                  sx={{ width: 16, height: 16, color: "#b3b3b3", cursor: "pointer" }}
                  onClick={() => setSearchQuery("")}
                />
              </InputAdornment>
            ) : null,
          }}
        />

        {/* Export button only for ledger and open bill pages */}
        {isSpecialPage && onExportExcel && (
          <Button
            variant="contained"
            sx={{ bgcolor: "#174bcc", ":hover": { bgcolor: "#0f3a9b" }, textTransform: "none" }}
            // onClick={onExportExcel}
          >
            Upload Excel file
          </Button>
        )}
      </Stack>
    </Box>
  );
};
