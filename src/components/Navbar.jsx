import React from 'react';
import { Menu } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { auth } from '../firebase/firebase-config';
import escudoClub from '../assets/CNLogo.png';
import UserMenu from './UserMenu';



const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[window.location.pathname]}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Menu.Item key="logo">
                <NavLink to="/home">
                    <img src={escudoClub} alt="Club Logo" style={{ height: '40px', marginRight: '10px', marginTop: '15px' }} />
                </NavLink>
            </Menu.Item>
            <div style={{ display: 'flex', justifyContent: 'left', flexGrow: 1 }}>
                <Menu.Item key="/home">
                    <NavLink to="/home" activeClassName="active-link">
                        Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/tournaments">
                    <NavLink to="/tournaments" activeClassName="active-link">
                        Tournaments
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/profile">
                    <NavLink to="/results" activeClassName="active-link">
                        Results
                    </NavLink>
                </Menu.Item>
            </div>
            <UserMenu />
            <Menu.Item key="logout" onClick={handleLogout}>
                <LogoutOutlined style={{ fontSize: '20px', marginRight: '15px' }} />
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;