import { createTheme } from "@mui/material/styles";
import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 * LIGHT THEME (BLUE VERSION)
 */
const light = {
  palette: {
    type: "light",
    background: {
      default: "#f0f4ff", // light blue background
      paper: common.white,
    },
    primary: {
      main: "#1e3a8a", // deep blue
      contrastText: "#ffffff", // white text on primary
    },
    secondary: {
      main: "#3b82f6", // lighter blue accent
      contrastText: "#ffffff",
    },
    text: {
      primary: "#1e3a8a", // dark blue text
      secondary: "#3b82f6", // accent blue text
      dark: common.black,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#f0f4ff", height: "100%", minHeight: "100%" },
      },
    },
  },
  shadow,
  typography,
};

// Create the theme
let theme = createTheme(light);
theme = createTheme(theme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          [theme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
          defaultProps: {
            disableFocusRipple: true, // removes ripple focus
          },
        },
      },
    },
  },
});

export default theme;
