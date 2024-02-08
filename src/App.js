import { useState } from 'react';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from './LoginComponents/LoginPage';
import RegisterPage from './LoginComponents/RegisterPage';
import { useAuth,AuthContext,AuthProvider } from './Data/ContextHandler/AuthContext';

import MyApp from './MyApp';

function App() {
  const { contextData} = useAuth();
  const { token, user } = contextData;
  const [inputVal, setInputVal] = useState('');
  const handleInput = (e) => {
    setInputVal(e.target.value);
  };
  return (
    <>
      {/* <Routes>
      <Route path="/" element={
          token && user?._id ? (
            <Navigate to="/main" />
        
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Routes> */}
               
                        <HashRouter>
                        <AuthProvider>
                          <MyApp />
                         </AuthProvider>
                        </HashRouter>
                
              
     


    </>
  );
}

export default App;
