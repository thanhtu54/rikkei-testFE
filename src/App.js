import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage";
import Login from "./components/login";
import NotFound from "./components/not-found";
import Product from "./components/product";
import PrivateRoutes from "./utils/privateRoutes";
import PublicRoutes from "./utils/publicRoutes";
import "./styles/index.scss";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/products" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
