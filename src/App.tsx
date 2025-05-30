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
import Courses from "./pages/courses/courses";
import Course from "./pages/courses/course";
import Lesson from "./pages/lesson/lesson";
import Groups from "./pages/groups/groups";
import Curriculum from "./pages/curriculum/curriculum";
import LessonSchedule from "./pages/lesson_schedule/lesson_schedule";

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
        {
          path: "courses",
          element: (
            <PrivateRoute roles={["teacher", "student"]}>
              <Courses />
            </PrivateRoute>
          ),
        },
        {
          path: "groups",
          element: (
            <PrivateRoute roles={["teacher"]}>
              <Groups />
            </PrivateRoute>
          ),
        },
        {
          path: "courses/course/:id",
          element: (
            <PrivateRoute roles={["teacher", "student"]}>
              <Course />
            </PrivateRoute>
          ),
        },
        {
          path: "courses/course/:courseId/:lessonId",
          element: (
            <PrivateRoute roles={["teacher", "student"]}>
              <Lesson />
            </PrivateRoute>
          ),
        },
        {
          path: "curriculum",
          element: (
            <PrivateRoute roles={["student"]}>
              <Curriculum />
            </PrivateRoute>
          ),
        },
        {
          path: "lesson-schedule",
          element: (
            <PrivateRoute roles={["teacher", "student"]}>
              <LessonSchedule />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
