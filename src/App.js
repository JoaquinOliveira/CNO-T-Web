import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Tournaments from './components/Tournaments';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import TournamentDetails from './components/TournamentDetails';
import { createTournamentDrawsCollection } from './firebase/db';
const App = () => {
  useEffect(() => {
    createTournamentDrawsCollection();
  }, []);
  const location = useLocation();

  // Rutas en las que se debe mostrar el Navbar
  const showNavbarRoutes = ['/home', '/dashboard', '/tournaments', '/results'];

  // Verificar si la ruta actual está en la lista de rutas que deben mostrar el Navbar
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <>
    
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tournaments/:tournamentId" element={<TournamentDetails />} />
T
      </Routes>
    </>
  );
};

export default App;