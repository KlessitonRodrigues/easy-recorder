import { Route, createRoutesFromElements } from "react-router-dom";

const Router = createRoutesFromElements(
  <>
    <Route path="/" lazy={() => import("./home")} />
    <Route path="/*" lazy={() => import("./404")} />
  </>
);

export default Router;
