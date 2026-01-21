import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Check if popup should show
  useEffect(() => {
    const dontShowUntil = localStorage.getItem("offerPopupDontShowUntil");
    const subscribed = localStorage.getItem("offerPopupSubscribed");

    const now = new Date().getTime();

    if (!subscribed && (!dontShowUntil || parseInt(dontShowUntil) <= now)) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => setOpen(false);

  const handleSubscribe = () => {
    if (!email) return; // simple validation
    localStorage.setItem("offerPopupSubscribed", "true");
    console.log("Subscribed:", email);
    setOpen(false);
  };

  const handleDontShowToday = () => {
    const now = new Date();
    // Set until midnight today
    const midnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    ).getTime();
    localStorage.setItem("offerPopupDontShowUntil", midnight.toString());
    setOpen(false);
  };

  const handleMaybeLater = () => {
    setOpen(false);
    // Do not set anything in localStorage, will show again next visit
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          width: { xs: "90%", sm: 420 },
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: 18, sm: 20 },
          mb: 1,
        }}
      >
        🎉 Welcome! Get Exclusive Offers
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ fontSize: { xs: 14, sm: 15 } }}
          >
            Sign up now to receive discounts, new products, and special offers.
          </Typography>

          <TextField
            label="Your Email"
            type="email"
            fullWidth
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              },
              "& label": { fontSize: 13 },
            }}
          />
        </Stack>
      </DialogContent>

      {/* BUTTONS */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3, gap: 2 }}
      >
        {/* Subtle "Don't show today" */}
        <Button
          onClick={handleDontShowToday}
          color="inherit"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            fontSize: 13,
            color: "#888",
          }}
        >
          Don't show today
        </Button>

        <Stack direction="row" spacing={1}>
          {/* Secondary "Maybe Later" */}
          <Button
            onClick={handleMaybeLater}
            variant="outlined"
            color="inherit"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: 13,
              borderColor: "#ddd",
            }}
          >
            Maybe Later
          </Button>

          {/* Primary Subscribe */}
          <Button
            onClick={handleSubscribe}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1,
              borderRadius: 2,
              background: "linear-gradient(90deg, #3fbf7f, #38a169)",
              "&:hover": {
                background: "linear-gradient(90deg, #38a169, #2f855a)",
              },
            }}
          >
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
