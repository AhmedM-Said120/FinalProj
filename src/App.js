import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Category from "./Components/Category/Category";
import Brands from "./Components/Brands/Brands";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Notfond from "./Components/Notfond/Notfond";
import Cart from "./Components/Cart/Cart";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import RestPassword from './Components/RestPassword/RestPassword';
import UserContextProvider from "./Context/userTokenContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Details from "./Components/Details/Details";
import DetailsCategory from './Components/detailsCategory/detailsCategory';
import CountContextProvider from "./Context/countContext";
import CartContextProvider from "./Context/cartContext";
import { Toaster } from "react-hot-toast";
import WishListProvider from "./Context/wishlistContext";
import WishList from "./Components/WishList/WishList";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from './Components/Allorders/Allorders';


function App() {

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "product", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "category", element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute> <Brands /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
        { path: "wishList", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "detailsCategory/:id", element: <ProtectedRoute><DetailsCategory /></ProtectedRoute> },
        { path: "details/:id", element: <ProtectedRoute><Details /></ProtectedRoute> },
        { path: "*", element: <ProtectedRoute><Notfond /></ProtectedRoute> },
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "restPassword", element: <RestPassword /> },
      ],
    },
  ]);
  return <>

    <UserContextProvider>
      <CountContextProvider>


        <CartContextProvider>
          <WishListProvider>
            <RouterProvider router={router} ></RouterProvider>
            <Toaster position="top-right" color='red' />

          </WishListProvider>
        </CartContextProvider>
      </CountContextProvider>

    </UserContextProvider>

  </>;
}

export default App;
