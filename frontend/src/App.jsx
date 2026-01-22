import { Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./Layout/MainLayout";
import { AuthProvider } from "../utils/AuthContext";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
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