import React from "react";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
  Button
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const FilterSection = ({
  companies = [],
  selectedCompany,
  setSelectedCompany,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const location = useLocation();

  const hidePeriod =
    location.pathname === "/vessels" ||
    location.pathname === "/" ||
    location.pathname.startsWith("/vessel");

  return (
    <Box
      sx={{
        position: "sticky",
        top: 96,
        height: "calc(100vh - 110px)",
        overflowY: "auto",
        bgcolor: "white",
        borderRight: 1,
        borderColor: "divider",
        p: 3,
        width: 350,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Filter
      </Typography>

      {/* Company Filter */}
      <Stack spacing={1}>
        <Typography>Select Company</Typography>

        <TextField
          select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
              </InputAdornment>
            ),
          }}
          SelectProps={{ IconComponent: ExpandMoreIcon }}
          size="small"
        >
          {companies.map((c, idx) => (
            <MenuItem key={idx} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Period Filter */}
      {!hidePeriod && (
        <Stack spacing={1}>
          <Typography>Period</Typography>

          <DatePicker
            label="Select Month"
            views={["year", "month"]}
            openTo="month"
            value={startDate}
            format="MM/YYYY"
            onChange={(value) => {
              if (!value) {
                setStartDate(null);
                setEndDate(null);
                return;
              }
              setStartDate(value.startOf("month"));
              setEndDate(value.endOf("month"));
            }}
          />

          <DatePicker
            label="End Month"
            views={["year", "month"]}
            value={endDate}
            readOnly
            format="MM/YYYY"
          />
        </Stack>
      )}

      {/* Reset Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
          mt: 1,
          mb: 3
        }}
        onClick={() => {
          setSelectedCompany("All");
          setStartDate(null);
          setEndDate(null);
        }}
      >
        Reset Filters
      </Button>

      {/* Navigation Links */}
      <Stack
        sx={{
          mt: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          fontSize: "16px",
        }}
      >
        <Link to="/">home</Link>
        <Link to="/vessel">Vessels</Link>
        <Link to="/general-ledger">General Ledger</Link>
        <Link to="/openbillrequest">Open Bill Request</Link>
      </Stack>
    </Box>
  );
};
