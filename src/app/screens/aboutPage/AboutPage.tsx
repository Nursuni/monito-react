import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Address from "./Address";

export default function AboutUsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="about-us-page">
        {/* Hero Section - Clean and Simple */}
        <section className="about-hero">
          <Container maxWidth="lg">
            <Box className="hero-content">
              <h1 className="hero-title">About Our Company</h1>
              <p className="hero-subtitle">
                Your trusted partner for premium pet care products and
                accessories
              </p>
            </Box>
          </Container>
        </section>

        {/* Mission Section with Image */}
        <section className="mission-section">
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box className="mission-content">
                  <h2 className="section-title">Our Mission</h2>
                  <p className="mission-text">
                    We believe every pet deserves the best. Our mission is to
                    provide premium quality products that bring joy and comfort
                    to your furry friends.
                  </p>
                  <p className="mission-text">
                    From nutritious food to engaging toys and accessories, we
                    carefully select every product to enhance the bond between
                    you and your pet.
                  </p>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box className="mission-image">
                  <img src="/img/home-nav.png" alt="Happy pets" />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>

        {/* What We Offer Section */}
        <section className="what-we-offer">
          <Container maxWidth="lg">
            <Box className="section-header">
              <h2 className="section-title-center">What We Offer</h2>
              <p className="section-subtitle">
                Everything your pet needs, all in one place
              </p>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                <Box className="offer-card">
                  <div className="offer-icon">🚚</div>
                  <h3 className="offer-title">Free Delivery</h3>
                  <p className="offer-description">
                    Free shipping on all orders over $49.99
                  </p>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box className="offer-card">
                  <div className="offer-icon">⭐</div>
                  <h3 className="offer-title">Premium Quality</h3>
                  <p className="offer-description">
                    Only the finest products for your pets
                  </p>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box className="offer-card">
                  <div className="offer-icon">🔒</div>
                  <h3 className="offer-title">Secure Payment</h3>
                  <p className="offer-description">
                    100% secure and encrypted transactions
                  </p>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Box className="offer-card">
                  <div className="offer-icon">💬</div>
                  <h3 className="offer-title">24/7 Support</h3>
                  <p className="offer-description">
                    Always here to help you and your pet
                  </p>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>

        {/* Address Section */}
        <Address />
      </div>

      <style>{`
        .about-us-page {
          width: 100%;
          background: white;
        }

        /* Hero Section - Minimal and Clean */
        .about-hero {
          background: white;
          padding: 60px 0 40px;
          text-align: center;
          border-bottom: 1px solid #e5e7eb;
        }

        .hero-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #003459;
        }

        .hero-subtitle {
          font-size: 18px;
          font-weight: 400;
          color: #667085;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Mission Section */
        .mission-section {
          padding: 80px 0;
          background: white;
        }

        .mission-content {
          padding-right: 20px;
        }

        .section-title {
          font-size: 36px;
          font-weight: 700;
          color: #003459;
          margin-bottom: 24px;
        }

        .mission-text {
          font-size: 16px;
          line-height: 1.8;
          color: #667085;
          margin-bottom: 20px;
        }

        .mission-image img {
          width: 100%;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 52, 89, 0.1);
        }

        /* What We Offer Section */
        .what-we-offer {
          padding: 80px 0;
          background: white;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title-center {
          font-size: 36px;
          font-weight: 700;
          color: #003459;
          margin-bottom: 12px;
        }

        .section-subtitle {
          font-size: 16px;
          color: #667085;
        }

        .offer-card {
          background: white;
          padding: 40px 24px;
          border-radius: 16px;
          text-align: center;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          height: 100%;
        }

        .offer-card:hover {
          border-color: #1976d2;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(25, 118, 210, 0.15);
        }

        .offer-icon {
          font-size: 48px;
          margin-bottom: 20px;
          display: block;
        }

        .offer-title {
          font-size: 20px;
          font-weight: 600;
          color: #003459;
          margin-bottom: 12px;
        }

        .offer-description {
          font-size: 14px;
          color: #667085;
          line-height: 1.6;
        }

        /* Special Features Section */
        .special-features {
          padding: 80px 0;
          background: white;
        }

        .feature-card {
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
          padding: 40px 32px;
          border-radius: 16px;
          text-align: center;
          color: white;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(25, 118, 210, 0.3);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: block;
        }

        .feature-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: white;
        }

        .feature-text {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.95);
        }

        /* Responsive Design */
        @media (max-width: 960px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .section-title,
          .section-title-center {
            font-size: 28px;
          }

          .mission-section,
          .what-we-offer,
          .special-features {
            padding: 60px 0;
          }

          .mission-content {
            padding-right: 0;
            margin-bottom: 20px;
          }
        }

        @media (max-width: 600px) {
          .about-hero {
            padding: 40px 0 30px;
          }

          .hero-title {
            font-size: 28px;
          }

          .section-title,
          .section-title-center {
            font-size: 24px;
          }

          .mission-section,
          .what-we-offer,
          .special-features {
            padding: 40px 0;
          }
        }
      `}</style>
    </>
  );
}
