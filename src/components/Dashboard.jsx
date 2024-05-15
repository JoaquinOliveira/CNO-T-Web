import './Dashboard.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { Switch } from 'antd';
import { FaSun, FaMoon } from 'react-icons/fa';
import useTheme from '../utils/useTheme';

const { Title } = Typography;

const Dashboard = () => {
    const navigate = useNavigate();
    const { isDarkMode, handleThemeChange } = useTheme();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    return (
        <div className={`dashboard ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="switch-container">
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            checkedChildren={<FaMoon className="switch-icon" />}
            unCheckedChildren={<FaSun className="switch-icon" />}
            className="custom-switch"
          />
        </div>
            <Title level={2}>¡Bienvenido al Dashboard!</Title>
            <p>Has iniciado sesión correctamente.</p>
            <Button type="primary" onClick={handleLogout}>
                Cerrar sesión
            </Button>
        </div>
    );
};

export default Dashboard;
