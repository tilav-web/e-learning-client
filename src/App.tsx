import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/auth";
import RootLayout from "./layouts/root-layout";
import SubLayout from "./layouts/sub-layout";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from "./private/private-route";
import { useAuth } from "./stores/auth/auth";
import { useEffect } from "react";
import { authService } from "./services/auth.service";
import type { AxiosError } from "axios";

export default function App() {
  const { login, logout } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const data = await authService.findMe();
        login(data);
      } catch (error) {
        const err = error as AxiosError;
        console.error(err);
        logout();
      }
    })();
  }, [login, logout]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <AuthPage />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute roles={["student", "teacher"]}>
          <SubLayout />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
