import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import ProtectedRoute from "../components/ProtectedRoute";
import TodosGrid from "../pages/Todo/TodosGrid";
import TodoDetail from "../pages/Todo/TodoDetail";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../components/homepage")));
const Todos = Loadable(lazy(() => import("../pages/Todo/Todo")));

// const SamplePage = Loadable( lazy( () => import( 'views/sample-page/SamplePage' ) ) );

const Error = Loadable(lazy(() => import("../components/Error")));
const Register = Loadable(lazy(() => import("../components/signup")));
const Login = Loadable(lazy(() => import("../components/login")));

const Router = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      {
        path: "/todos",
        element: <Outlet />,
        children: [
          { path: "", element: <Navigate to="tasks" /> },
          {
            path: "tasks",
            element: <Todos />,
            children: [
              { path: "", element: <TodosGrid /> },
              { path: ":id", element: <TodoDetail /> },
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <Outlet />,
        children: [{ path: "", element: <Navigate to="settings" /> }],
      },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
