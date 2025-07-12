import {
  Route,
  Routes,
  // useLocation, matchPath,
  Navigate,
} from "react-router-dom";
//? Client Side routes
import Home from "./views/pages/Home";
//? Admin routes
import AdminLayout from "@/views/admin/layouts/AdminLayout";
import ProtectedRoute from "./views/admin/layouts/ProtectedRouter";
import Dashboard from "./views/admin/views/Dashboard/Dashboard";
import Product from "./views/admin/views/Product/Product";
import Category from "./views/admin/views/Category/Category";
import Login from "./views/admin/views/auth/Login";

export default function Router() {
  // const location = useLocation();

  // Routes where layout should be visible
  // const layoutRoutes = ["/"];

  // const showLayout = layoutRoutes.some((route) => matchPath({ path: route, end: true }, location.pathname));

  return (
    <>
      {/* {showLayout && <Navbar />} */}

      <Routes>
        {/* Public pages */}
        <Route index element={<Home />} />
        {/* Admin Dashboard layout + nested pages */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="category" element={<Category />}></Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
        {/* 404 - Not Found */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>

      {/* {showLayout && <Footer />} */}
    </>
  );
}
