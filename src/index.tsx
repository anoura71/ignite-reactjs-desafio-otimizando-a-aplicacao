import { render } from "react-dom";

import { App } from "./App";
import { MoviesProvider } from "./context/MoviesContext";

render(
  <MoviesProvider>
    <App />
  </MoviesProvider>,
  document.getElementById("root")
);
