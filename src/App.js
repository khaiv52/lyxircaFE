import { library } from "@fortawesome/fontawesome-svg-core";
import { faFontAwesome, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const CustomerRouters = lazy(() => import("./Routers/CustomerRouters")) ;
const AdminRouters = lazy(() => import("./Routers/AdminRouters")) ;

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRouters />} />
        <Route path="/admin/*" element={<AdminRouters />} />
      </Routes>
    </div>
  );
}

library.add(fas, faTwitter, faFontAwesome);

export default App;
