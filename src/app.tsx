import "src/style/global.css";

import { createRoot } from "react-dom/client";
import Text from "./lib/common/Text";

// import Router from "src/pages/routes";

// import AppProviders from "./lib/components/AppProviders";

const App = () => {
  return (
    <div>
      <Text>TEST TAILWIND_CSS</Text>
    </div>
  );
  /*return (
    <AppProviders>
      <RouterProvider router={createBrowserRouter(Router)} />
    </AppProviders>
  );*/
};

const rootEl = document.getElementById("root");
if (rootEl) createRoot(rootEl).render(<App />);
