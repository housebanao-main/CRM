import React, { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";
import Transport from "./pages/Transport";
import Boq from "./pages/Boq";
import Quotation from "./pages/Quotation";
import Lead from "./pages/Lead";
import PrivateRoute from './components/PrivateRoute';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Dashboard";
        metaDescription = "Dashboard page";
        break;
      case "/login":
        title = "Login";
        metaDescription = "Login page";
        break;
      case "/customers":
        title = "Customers";
        metaDescription = "Customers page";
        break;
      case "/admin":
        title = "Admin";
        metaDescription = "Admin page";
        break;
      case "/partner":
        title = "Partners";
        metaDescription = "Partners page";
        break;
      case "/transport":
        title = "Transport";
        metaDescription = "Transport page";
        break;
      case "/boq":
        title = "Boq";
        metaDescription = "Boq Page";
        break;
        case "/Quotation":
          title = "Quotation";
          metaDescription = "Quotation Page";
          break;
      case "/lead":
        title = "Lead";
        metaDescription = "Lead Page";
        break;
      default:
        title = "App";
        metaDescription = "App page";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={Dashboard} requiredRole="user" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customers" element={<PrivateRoute element={Customers} requiredRole="user" />} />
      <Route path="/admin" element={<PrivateRoute element={Admin} requiredRole="admin" />} />
      <Route path="/partner" element={<PrivateRoute element={Partner} requiredRole="user" />} />
      <Route path="/transport" element={<PrivateRoute element={Transport} requiredRole="user" />} />
      <Route path="/boq" element={<PrivateRoute element={Boq} requiredRole="user" />} />
      <Route path="/quotation" element={<PrivateRoute element={Quotation} requiredRole="user" />} />
      <Route path="/lead" element={<PrivateRoute element={Lead} requiredRole="user" />} />
    </Routes>
  );
}

export default App;
