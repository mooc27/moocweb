import * as React from "react";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import CustomAppBar from "./components/mainLayout/AppBar";
import Layout from "./components/mainLayout/Layout";
import Login from "./pages/Login";
import Page404 from "./pages/page404";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";

import { MenuDto } from "./types/menu";
import ProfileForm from "./pages/ProfileForm";
import CategoryPage from "./pages/category/CategoryPage";
import componentMaps from "./componentMaps";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Recursive generation of routing
  const renderRoutes = (items: MenuDto[]) => {
    return items.map((item) => {
      const Component =
        item.componentPath === undefined
          ? null
          : componentMaps[item.componentPath];
      return (
        <React.Fragment key={item.id}>
          <Route
            path={item.route}
            element={
              <Suspense>
                {Component ? <Component /> : null}
              </Suspense>
            }
          />
          {item.children && renderRoutes(item.children)}
        </React.Fragment>
      );
    });
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const { menuItems } = useSelector((state: RootState) => state.permission);

  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <>
                  <CustomAppBar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                  />
                  <Layout open={open} handleDrawerClose={handleDrawerClose}>
                    <ProtectedRoute />
                  </Layout>
                </>
              }
            >
              {menuItems && renderRoutes(menuItems)}
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/category" element={<CategoryPage />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
