import { createMuiTheme } from "@material-ui/core";

import { primary, secondary, tertiary } from "./components/colors/colors";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        //textTransform: "none",              DeCapitalize buttons
      },
    },
    MuiInputBase: {
      root: {
        color: tertiary,
      },
    },
    MuiFormLabel: {
      root: { color: secondary },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "4px 0 0 4px", //rounded left, straight right
        "&:hover $notchedOutline": {
          borderColor: secondary,
        },
      },
      notchedOutline: {
        borderColor: secondary,
      },
      // "&:hover": {
      //   borderColor: secondary,
      // },
    },
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
  typography: {
    fontFamily: "Nunito, Roboto, sans-serif",
  },
  spacing: 10,
  props: {
    MuiButton: {
      disableRipple: true,
      disableFocusRipple: true,
      disableElevation: true,
      variant: "contained",
    },
    MuiIconButton: {
      disableRipple: true,
      disableFocusRipple: true,
    },
    MuiTextField: {
      InputLabelProps: {
        //shrink: true,                        disable input animation
      },
    },
  },
});

export default theme;
