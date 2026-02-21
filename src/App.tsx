import * as React from "react";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CircularProgress, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import CustomAppBar from "./components/mainLayout/AppBar";
import Layout from "./components/mainLayout/Layout";
import Login from "./pages/Login";
import Page404 from "./pages/page404";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";

import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useDispatch } from "react-redux";

import { MenuDto, UserPermissionDto } from "./types/menu";
import ProfileForm from "./pages/ProfileForm";
import componentMaps from "./componentMaps";

import Demo from "./pages/demo/index";

import Dashboard from "./pages/Dashboard";
const UserManagement = lazy(() => import("./pages/UserManagement"));

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  //Recursive generation of routing
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
              // <Suspense fallback={<CircularProgress />}>
              //   {Component ? <Component /> : null} {/* If the component exists, render; otherwise, return null */}
              // </Suspense>
              <Suspense>
                {Component ? <Component /> : null}{" "}
                {/* If the component exists, render; otherwise, return null */}
              </Suspense>
            }
          />
          {item.children && renderRoutes(item.children)}{" "}
          {/* Recursive rendering sub route */}
        </React.Fragment>
      );
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  const { menuItems } = useSelector((state: RootState) => state.permission);
  const dispatch = useDispatch();

  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Routes>
            {/* Login page not required Layout */}
            <Route path="/login" element={<Login />} />

            {/* Other pages require Layout */}
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

              {/* <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} /> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/user-management" element={
                <Suspense fallback={<CircularProgress />}>
                  <UserManagement />
                </Suspense>
              } />
              <Route path="/profile" element={<ProfileForm />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
