import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import Products from "./Products";
import EditProducts from "./EditProducts";
import { EditProductContext } from './ContextCreator';
import ImageList from "./ImageList";
import NewProduct from "./NewProduct";
import UsersConainer from "./UsersConainer";
import UsersDetailPage from "./UserComponents/UsersDetailPage";
import UserContextProvider from "./Data/ContextHandler/UsersContext";
import ToDoListContextProvider from "./Data/ContextHandler/ToDoListContext";
import LoginPage from './LoginComponents/LoginPage';
import RegisterPage from './LoginComponents/RegisterPage';
import { socket } from './socket';
import { useAuth } from './Data/ContextHandler/AuthContext';
import ProtectedRoutes from "./LoginComponents/ProtectedRoutes";
import ResetPassword from "./LoginComponents/ResetPassword";
import WelcomeScreen from "./WelcomePage/WelcomeScreen";
import AboutPage from "./WelcomePage/AboutPage";
import ContactPage from "./WelcomePage/ContactPage";
import Loader from "./LoginComponents/Loader";
import ToDoMainPage from "./ToDoComponents/ToDoMainPage";
import NewsPage from "./RapidAPI/News/NewsPage";
import UsefulLinkMainPage from "./UsefulLinks/UsefulLinkMainPage";
import ImageListMainPage from "./ImageContainer/ImageListMainPage";
import WeatherMainPage from "./WeatherPage/WeatherMainPage";
import SettingPage from "./SettingPage";
import HelpPage from "./HelpPage";
import CountriesMainPage from "./CountriesCompoents/CountriesMainPage";
import UnProtectedRoutes from "./LoginComponents/UnProtectedRoutes";
export default function MyApp() {
  const { contextData } = useAuth();
  const {  user } = contextData;
  //console.log(settingConfig);
  const [isConnected, setIsConnected] = useState(socket.connected);
  // let onlineStatus = "Online";
  //console.log(socket);
  const { logout } = useAuth();
  
  //  const EditProductContext = React.createContext();
  const [editRows, setEditRows] = useState([]);

    return (  
          <Routes>
          <Route element={<UnProtectedRoutes />}>
            <Route exact path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginPage /> } />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/about" element={<AboutPage />} />
            <Route exact path="/contact" element={<ContactPage />} />
            <Route exact path="/images" element={<ImageListMainPage />} />
            <Route exact path="/weather" element={<WeatherMainPage />} />
            <Route exact path="/news" element={<NewsPage />} />
            <Route exact path="/countries" element={<CountriesMainPage />} />
            <Route exact path="/help" element={<HelpPage />} />
            {/* <Route exact path="/loader" element={<Loader />} /> */}
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/home" element={<Home /> } />
              <Route exact path="/detail" element={<Detail /> } />
              <Route exact path="/products" element={<Products setEditRows={setEditRows} /> } />
              <Route exact path="/settings" element={<SettingPage /> } />
              <Route exact path="/editproducts" element={<EditProductContext.Provider value={{ editRows }}><EditProducts /> </EditProductContext.Provider>} />
              <Route exact path="/imagelist" element={<ImageList /> } />
              <Route exact path="/addproduct" element={<NewProduct /> } />
              <Route exact path="/users" element={<UserContextProvider><UsersConainer /> </UserContextProvider>} />
              <Route exact path="/users/:id" element={<UsersDetailPage /> } />
              <Route exact path="/myprofile" element={<UsersDetailPage /> } />
              <Route path="/resetPassword" element={<ResetPassword /> } />
              <Route path="/usefullinks" element={<UsefulLinkMainPage /> } />
              <Route exact path="/todolist" element={<ToDoListContextProvider><ToDoMainPage user={user} /> </ToDoListContextProvider>} />
              {/* <Route path="/" element={<Navigate replace to="/home" />} /> */}
              <Route path="*" element={<Navigate replace to="/home" />} />
            </Route>

          </Routes>
      
  );
}

