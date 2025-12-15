import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const OpenBillRequestSection = ({ data = [] }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const formatDate = (value) => (value ? new Date(value).toLocaleDateString() : "-");

  return (
    <Box sx={{ width: "100%", mt: 0 }}>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, maxHeight: "77vh", overflowY: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "#f0f4ff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              <TableCell sx={{ fontWeight: 600 }}>SNO</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Vessel IMO</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Vessel AE Code</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Vendor</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Vendor Company Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Bill Number</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Invoice Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Document Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}

            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.vesselImo}</TableCell>
                <TableCell>{row.vesselAeCode}</TableCell>
                <TableCell>{row.vendor}</TableCell>
                <TableCell>{row.vendorCompanyName}</TableCell>
                <TableCell>{row.billNumber}</TableCell>
                <TableCell>{formatDate(row.invoiceDate)}</TableCell>
                <TableCell>{formatDate(row.documentDate)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => setSelectedRow(row)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for row details */}
      {selectedRow && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            px: 2,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 700,
              maxHeight: "80vh",
              borderRadius: 2,
              overflowY: "auto",
              p: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">
                Bill Details — {selectedRow.billNumber}
              </Typography>
              <IconButton onClick={() => setSelectedRow(null)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Table size="small">
              <TableBody>
                {Object.entries(selectedRow).map(([key, value]) => {
                  if (
                    [
                      "vesselImo",
                      "vesselAeCode",
                      "vesselName",
                      "vendor",
                      "vendorCompanyName",
                      "billNumber",
                      "invoiceDate",
                      "documentDate",
                      "baseAmount",
                      "foreignAmount",
                      "memo",
                      "url",
                      "aeReferencePO",
                    ].includes(key)
                  ) {
                    let displayValue = value;
                    if (key.includes("Date")) displayValue = formatDate(value);
                    if (key === "url" && value)
                      displayValue = (
                        <a href={value} target="_blank" rel="noreferrer">
                          Open Link
                        </a>
                      );

                    return (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: 600 }}>{key}</TableCell>
                        <TableCell>{displayValue ?? "-"}</TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default OpenBillRequestSection;
