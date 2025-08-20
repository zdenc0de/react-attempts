import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Page404 } from "../pages/Page404";
import { UseEffectPage } from "../pages/UseEffectPage";
import { ImagenesPage } from "../pages/ImagenesPage";

export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/useEffect" element={<UseEffectPage />} />
      <Route path="/imagenes" element={<ImagenesPage />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);