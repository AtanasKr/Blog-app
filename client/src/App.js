import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Register from './pages/Register';
import Login from './pages/Login';
import Single from './pages/Single';
import Write from './pages/Write';
import Home from './pages/Home';
import Reset from './pages/Reset';
import Change from './pages/Change';
import ResetPass from './pages/ResetPass'
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import './style.scss'

const Layout = ()=>{
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }
    ]
  },{
    path: "/register",
    element: <Register/>,
  },{
    path: "/login",
    element: <Login/>,
  },{
    path: "/resetpassword",
    element: <Reset/>,
  },{
    path: "/changepassword",
    element: <Change/>,
  },{
    path: "/change-password/:id/:token",
    element: <ResetPass/>,
  }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
