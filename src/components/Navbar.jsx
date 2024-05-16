import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { auth } from '../firebase/firebase-config';
import escudoClub from '../assets/CNLogo.png'
const { Header } = Layout;

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
        <Header>
            <div className="logo">
                <Link to="/home">
                    <img
                        src={escudoClub}
                        style={{ height: '40px', marginRight: '10px', marginTop: '10px' }}
                        alt="Club Logo"
                    />
                </Link>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                <Menu.Item key="home">
                    <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="tournaments">
                    <Link to="/tournaments">Tournaments</Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="signout">
                    <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                    </Button>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default Navbar;