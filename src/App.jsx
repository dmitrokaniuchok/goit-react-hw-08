import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";
import RestrictedRoute from "./components/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegistrationPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const ContactsPage = lazy(() => import("./pages/ContactsPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const IsRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !IsRefreshing && (
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={<PrivateRoute component={<ContactsPage />} />}
            />
          </Routes>
        </Suspense>
      </Layout>
    )
  );
}
