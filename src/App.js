import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import Home from "./components/Home";

import theme from "./theme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
