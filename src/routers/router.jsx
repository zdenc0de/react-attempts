import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Page404 } from "../pages/Page404";
import { UseEffectPage } from "../pages/UseEffectPage";
import { ImagenesPage } from "../pages/ImagenesPage";
import { RutasAnidadasPage } from "../pages/RutasAnidadasPage";
import { PerfilPage } from "../pages/PerfilPage";
import { ConfiguracionPage } from "../pages/ConfiguracionPage";

export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/useEffect" element={<UseEffectPage />} />
      <Route path="/imagenes" element={<ImagenesPage />} />
      <Route path="/rutasanidadas" element={<RutasAnidadasPage />} >
        <Route path="perfil" element={<PerfilPage />} />
        <Route path="configuracion" element={<ConfiguracionPage />} />
      </Route>


      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
);