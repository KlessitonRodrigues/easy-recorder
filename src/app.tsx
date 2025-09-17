import "src/style/global.css";

import { createRoot } from "react-dom/client";

import Router from "src/pages/router";

import AppProviders from "./lib/components/AppProviders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={createBrowserRouter(Router)} />
    </AppProviders>
  );
};

const rootEl = document.getElementById("root");
if (rootEl) createRoot(rootEl).render(<App />);
