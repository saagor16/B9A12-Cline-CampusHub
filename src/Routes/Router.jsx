import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error/Error";
import Meal from "../Pages/Meal/Meal";
import UpcomingMeals from "../Pages/UpcomingMeals/UpcomingMeals";
import Dashboard from "../Layout/Dashboard";
import MealDetail from "../Pages/MealDetail/MealDetail";
import MyProfile from "../Dashboard/User/MyProfile";
import RequestedMeals from "../Dashboard/User/RequestedMeals";
import MyReviews from "../Dashboard/User/MyReviews";
import PaymentHistory from "../Dashboard/User/PaymentHistory";
import AdminRoute from "../Pages/PrivateRoute/AdminRoute";
import AdminProfile from "../Dashboard/Admin/AdminProfile";
import AddMeal from "../Dashboard/Admin/AddMeal";
import AllMeals from "../Dashboard/Admin/AllMeals";
import AllReviews from "../Dashboard/Admin/AllReviews";
import ServeMeals from "../Dashboard/Admin/ServeMeals";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import AllUsers from "../Dashboard/Admin/AllUsers";
import Payment from "../Payment/Payment";
import UpAdminMeals from "../Dashboard/Admin/UpAdminMeals";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/meals",
        element: <Meal />,
      },
      {
        path: "/upcoming-meals",
        element: <UpcomingMeals />,
      },
      {
        path: "/meal/:id",
        element: <MealDetail />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/meals/${params.id}`),
      },
      {
        path: '/payment/:packageName',
        element: <Payment></Payment>
      },
      {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          // User routes
          {
            path: "myProfile",
            element: <MyProfile />,
          },
          {
            path: "requestedMeals",
            element: <RequestedMeals />,
          },
          {
            path: "myReviews",
            element: <MyReviews />,
          },
          {
            path: "paymentHistory",
            element: <PaymentHistory />,
          },

          // Admin routes
          {
            path: "adminProfile",
            element: <AdminRoute><AdminProfile /></AdminRoute>,
          },
          {
            path: "addMeal",
            element: <AdminRoute><AddMeal /></AdminRoute>,
          },
          {
            path: "allMeals",
            element: <AdminRoute><AllMeals /></AdminRoute>,
          },
          {
            path: "allReviews",
            element: <AdminRoute><AllReviews /></AdminRoute>,
          },
          {
            path: "serveMeals",
            element:<AdminRoute><ServeMeals></ServeMeals></AdminRoute>,
          },
          {
            path: "allUser",
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
          },
          {
            path: "upAdmin",
            element:<AdminRoute><UpAdminMeals></UpAdminMeals></AdminRoute>,
          },
        ],
      },
    ],
  },
]);
