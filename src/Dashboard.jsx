import React, { useState } from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import { HeaderSection } from "./screens/Company/sections/HeaderSection/HeaderSection";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCardClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/vessel");
    }, 1500); // simulate 1.5s loading
  };

  return (
    <>
      {/* Loader on Card Click */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box className="ship-dot" />
            <Box className="ship-dot" />
            <Box className="ship-dot" />
          </Box>
          <Typography
            sx={{
              color: "white",
              mt: 3,
              fontSize: "1.2rem",
              fontFamily: "Fjalla One",
            }}
          >
            Loading Vessels...
          </Typography>
        </Box>
      )}

      <HeaderSection />

      <section className="dashboard-section">
        <div className="background-image"></div>
        <div className="overlay"></div>

        <div className="dashboard-content">
          <Box
            sx={{
              display: "flex",
              mt: 5,
              justifyContent: "space-around",
              width: "100%",
              height: "80vh",
              fontFamily: "Space Grotesk",
            }}
          >
            {/* LEFT SIDE */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
                
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 5,
                  fontFamily: "Fjalla One",
                  textAlign: "center",
                    fontSize:70,
                  position: "relative",
                  lineheigh:10,
                  animation: "fadeSlideScale 1s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                  animationDelay: "0.2s",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: "20%",
                    bottom: -10,
                    width: 0,
                    height: "9px",
                    backgroundColor: "rgba(255, 255, 255, 0.44)",
                    borderRadius: "2px",
                    animation: "growUnderline 1s forwards",
                    maxWidth: "60%",
                    animationDelay: "0.6s",
                  
                  },
                }}
              >
                WELCOME TO THE <br /> 
  <span
    style={{
      color: "#000000ff",
      WebkitTextStroke: "0.1px #fffbfbff", // white outline
      padding: "10px",
    }}
  >
    INTERNATIONAL SEAWAYS
  </span>
  <br />  PORTAL
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  width: "90%",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textAlign: "center",
                  fontFamily: "Space Grotesk",
                  animation: "fadeSlideScale 1s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                  animationDelay: "0.4s",
                }}
              >
                This dashboard provides an overview of our fleet operations and
                company updates. Explore vessel information, ongoing projects,
                and key metrics across our global fleet.
              </Typography>
            </Box>

            {/* RIGHT SIDE */}
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                pl: 5,
                fontFamily: "Space Grotesk",
              }}
            >
              {/* CARD 1 */}
              <Card
                onClick={handleCardClick}
                className="card-animate"
                sx={{
                  width: "70%",
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  border: "0.5px solid #5d5d5dff",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                  animation: "fadeSlideScale 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                  animationDelay: "0.5s",
                }}
              >
                <CardMedia
                  component="img"
                  height="225"
                  image="./public/images/ae.png"
                  sx={{ transition: "0.4s ease" }}
                />
                <Box
                  className="hover-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    opacity: 0,
                    transition: "0.4s ease",
                  }}
                />
                <Typography
                  className="card-title"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 15,
                    zIndex: 2,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    fontFamily: "Fjalla One",
                    transition: "0.45s ease",
                  }}
                >
                  Anglo Eastern
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    p: 2,
                    backgroundColor: "rgba(26, 32, 35, 0.69)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "0.85rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      fontFamily: "Space Grotesk",
                    }}
                  >
                    Anglo Eastern manages one of the world's largest fleets,
                    ensuring safe and efficient maritime operations globally.
                  </Typography>
                </Box>
              </Card>

              {/* CARD 2 */}
              <Card
                onClick={handleCardClick}
                className="card-animate"
                sx={{
                  width: "70%",
                  borderRadius: 5,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  border: "0.5px solid #5d5d5dff",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                  animation: "fadeSlideScale 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                  animationDelay: "0.7s",
                }}
              >
                <CardMedia
                  component="img"
                  height="225"
                  image="./public/images/vships.png"
                  sx={{ transition: "0.4s ease" }}
                />
                <Box
                  className="hover-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    opacity: 0,
                    transition: "0.4s ease",
                  }}
                />
                <Typography
                  className="card-title"
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 15,
                    zIndex: 2,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    fontFamily: "Fjalla One",
                    transition: "0.45s ease",
                  }}
                >
                  VShips
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    p: 2,
                    backgroundColor: "rgba(26, 32, 35, 0.69)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "0.85rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      fontFamily: "Space Grotesk",
                    }}
                  >
                    VShips provides world-class marine services, ensuring fleet
                    compliance, efficiency, and technical excellence.
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Box>
        </div>
      </section>

      <style>
        {`
          /* Strong Slide-Up + Fade + Scale */
          @keyframes fadeSlideScale {
            0% { opacity: 0; transform: translateY(40px) scale(0.85); }
            60% { opacity: 1; transform: translateY(-10px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }

          /* Underline Animation */
          @keyframes growUnderline {
            0% { width: 0; }
            100% { width: 100%; }
          }

          /* Hover: Title Center + Bigger */
          .card-animate:hover .card-title {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(1.2);
            font-size: 2.2rem !important;
            letter-spacing: 1px;
          }

          /* Overlay Fade */
          .card-animate:hover .hover-overlay {
            opacity: 1;
          }

          /* Image Zoom */
          .card-animate:hover img {
            transform: scale(1.08);
          }

          /* Loader Dots */
          .ship-dot {
            width: 18px;
            height: 18px;
            background-color: #00aaff;
            border-radius: 50%;
            animation: bounce 0.6s infinite alternate;
          }
          .ship-dot:nth-of-type(2) { animation-delay: 0.2s; }
          .ship-dot:nth-of-type(3) { animation-delay: 0.4s; }

          @keyframes bounce {
            0% { transform: translateY(0); opacity: 0.6; }
            100% { transform: translateY(-20px); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default Dashboard;
