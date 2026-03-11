import { ErrorPage } from "@/pages/ErrorPage"
import Home from "@/pages/Home"
import { Login } from "@/pages/Login"
import { Register } from "@/pages/Register"
import Welcome from "@/pages/Welcome"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
])
