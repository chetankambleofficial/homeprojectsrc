import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./screens/Company/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default page → vessels */}
        <Route path="/vessel" element={<App />} />
        <Route path="/" element={<Dashboard/>}/>
        {/* General Ledger page */}
        <Route path="/general-ledger" element={<App />} />

        {/* Open Bill Request page */}
        <Route path="/openbillrequest" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
