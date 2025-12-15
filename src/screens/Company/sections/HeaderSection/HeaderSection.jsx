import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

export const HeaderSection = () => {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        height: 96,
        bgcolor: "#1a1f36",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      <Box
        component="img"
        alt="Logo"
        src="https://c.animaapp.com/mgrxz7o3oIDiS4/img/logo.png"
        sx={{ width: 120, height: 80, objectFit: "cover" }}
      />

      <Stack direction="row" spacing={3} alignItems="center">
       

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            src="https://c.animaapp.com/mgrxz7o3oIDiS4/img/shape.png"
            sx={{ width: 40, height: 40 }}
          />
          <Stack spacing={0.25}>
            <Typography sx={{ fontWeight: 600, color: "#f2f4f7", fontSize: "14px" }}>
              INSW Client
            </Typography>
            <Typography sx={{ fontWeight: 400, color: "#f2f4f7", fontSize: "14px" }}>
              User
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
