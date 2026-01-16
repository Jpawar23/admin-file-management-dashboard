import { Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layout/MainLayout";
import { AuthProvider } from "../utils/AuthContext";
import ProtectedRoutes from "../utils/ProtectedRoutes";
const App = () => {
  return (



    <AuthProvider>


      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/files" element={<Files />} />
          </Route>
        </Route>
      </Routes>

    </AuthProvider>


  );
};
export default App;