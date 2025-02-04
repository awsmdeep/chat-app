import React, { useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const initializeAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  console.log({ authUser });

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
