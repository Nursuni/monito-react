import React from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import {
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

const contactInfo = [
  {
    icon: <LocationIcon />,
    title: "Address",
    text: "Yunusabad District, Tashkent, Uzbekistan",
  },
  {
    icon: <EmailIcon />,
    title: "Email",
    text: "monitosupport@monito.com",
  },
  {
    icon: <PhoneIcon />,
    title: "Phone",
    text: "+998 (90) 123-45-67",
  },
  {
    icon: <AccessTimeIcon />,
    title: "Working Hours",
    text: "Monday - Saturday: 9:00 AM - 8:00 PM",
  },
];

export default function InfoMapSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>

      <Box component="section" className="info-map-section">
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={8}
            alignItems="flex-start"
          >
            {/* LEFT INFO BOX */}
            <Stack spacing={4} flex={1} className="info-content">
              <Box>
                <span className="section-badge">Get in Touch</span>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  className="section-title"
                  sx={{
                    fontSize: { xs: "28px", md: "36px" },
                    color: "#0f172a",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.2,
                    mt: 2,
                    mb: 2,
                  }}
                >
                  Visit Our Store
                </Typography>
                <Typography
                  variant="body1"
                  className="section-description"
                  sx={{
                    color: "#64748b",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    maxWidth: 500,
                  }}
                >
                  We'd love to see you and your furry friend! Stop by our store
                  or reach out to us anytime.
                </Typography>
              </Box>

              <Stack spacing={3} className="contact-items">
                {contactInfo.map((item, idx) => (
                  <Box key={idx} className="contact-item">
                    <Stack
                      direction="row"
                      spacing={2.5}
                      alignItems="flex-start"
                    >
                      <Box className="contact-icon-wrapper">{item.icon}</Box>
                      <Box>
                        <Typography
                          fontWeight={600}
                          sx={{
                            fontSize: "15px",
                            color: "#64748b",
                            mb: 0.5,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#0f172a",
                            fontSize: "16px",
                            fontWeight: 500,
                            lineHeight: 1.6,
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Stack>

            {/* RIGHT MAP */}
            <Box flex={1.2} className="map-container">
              <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.5262489589635!2d69.28586867611149!3d41.34119147127584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8d660b2bd55d%3A0xd86dc4c9715c2025!2sYunusabad%20District%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1731707776783!5m2!1sen!2sus"
                className="map-iframe"
                sx={{
                  width: "100%",
                  height: { xs: 350, md: 500 },
                  borderRadius: 4,
                  border: "none",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
                }}
                loading="lazy"
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      <style>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        .info-map-section {
          padding: 100px 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }

        .section-badge {
          display: inline-block;
          padding: 6px 16px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .info-content {
          position: relative;
        }

        .contact-items {
          margin-top: 20px;
        }

        .contact-item {
          padding: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .contact-item:hover .contact-icon-wrapper {
          transform: scale(1.1);
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .contact-item:hover .contact-icon-wrapper svg {
          color: white;
        }

        .contact-icon-wrapper {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .contact-icon-wrapper svg {
          font-size: 24px;
          color: #3b82f6;
          transition: color 0.3s ease;
        }

        .map-container {
          position: relative;
          width: 100%;
        }

        .map-container::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 28px;
          z-index: -1;
          opacity: 0.08;
        }

        .map-iframe {
          position: relative;
          z-index: 1;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .info-map-section {
            padding: 80px 0;
          }
        }

        @media (max-width: 960px) {
          .info-map-section {
            padding: 60px 0;
          }

          .info-content {
            margin-bottom: 40px;
          }

          .map-container::before {
            top: -12px;
            right: -12px;
          }
        }

        @media (max-width: 600px) {
          .info-map-section {
            padding: 40px 0;
          }

          .contact-icon-wrapper {
            width: 40px;
            height: 40px;
          }

          .contact-icon-wrapper svg {
            font-size: 20px;
          }

          .map-container::before {
            top: -8px;
            right: -8px;
          }
        }
      `}</style>
    </>
  );
}
