// import { red } from '@material-ui/core/colors';
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FBD96E",
    },
    secondary: {
      main: "#64E38A",
    },
  },
  typography: {
    subtitle1: {
      fontSize: "0.8rem",
    },
  },
});

export default theme;
