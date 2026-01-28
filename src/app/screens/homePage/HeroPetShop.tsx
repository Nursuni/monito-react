import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function HeroPetShop() {
  const history = useHistory();

  return (
    <Box display="flex" justifyContent="center" py={3} bgcolor="#fff">
      <Box
        sx={{
          width: 1300,
          height: 460,
          position: "relative",
          overflow: "hidden",
          borderRadius: "32px",
        }}
      >
        {/* Base background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "#083a5a",
            zIndex: 0,
          }}
        />

        {/* Diagonal overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "#062f49",
            clipPath: "polygon(0 0, 65% 0, 45% 100%, 0% 100%)",
            zIndex: 1,
          }}
        />

        {/* Light blob */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "55%",
            bgcolor: "#fff1d6",
            borderRadius: "180px 0 0 180px",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            px: 10,
          }}
        >
          {/* Image */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Box
              component="img"
              src="/img/pets-banner.png"
              alt="Pet"
              sx={{
                height: 390,
                display: "block",
              }}
            />
          </Box>

          {/* Text */}
          <Box
            sx={{
              maxWidth: 480,
              textAlign: "right",
              pt: 3,
            }}
          >
            {/* MAIN headline */}
            <Typography
              sx={{
                fontFamily: "SVN-Gilroy",
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: "68px",
                color: "#003459",
                textTransform: "capitalize",
                mt: 1,
              }}
            >
              Thousands More Fun!
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "rgba(0, 52, 89, 0.7)",
                lineHeight: "26px",
                fontSize: "16px",
              }}
            >
              Having a pet means more joy, a loyal companion, and unforgettable
              moments. Discover pets, food, toys, and accessories made just for
              them.
            </Typography>

            {/* Buttons */}
            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={() => history.push("/products")}
                sx={{
                  borderRadius: "999px",
                  px: 4,
                  borderColor: "#003459",
                  color: "#003459",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#003459",
                    color: "#fff",
                  },
                }}
              >
                View Products
              </Button>

              <Button
                variant="contained"
                onClick={() => history.push("/products")}
                sx={{
                  borderRadius: "999px",
                  px: 4,
                  bgcolor: "#003459",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#002a45",
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
