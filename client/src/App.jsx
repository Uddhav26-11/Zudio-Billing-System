import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-left" />

      <Routes>
        <Route path="/" element={<RoleSelect />} />

        <Route path="/manager-login" element={<Login />} />

        <Route path="/cashier-login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/billing" element={<Billing />} />
        
      </Routes>
    </BrowserRouter>
  );
}
