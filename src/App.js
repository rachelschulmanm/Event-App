import "./App.css";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { UserProvider } from "./context/UserContext";
import { EventProvider } from "./context/EventContext";
import { RouterProvider } from "react-router-dom";

import { router } from "./router/router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d69316",
    },
    secondary: {
      main: green[500],
    },
  },
});
function App() {
  return (
    <UserProvider>
      <EventProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </EventProvider>
    </UserProvider>
  );
}

export default App;
