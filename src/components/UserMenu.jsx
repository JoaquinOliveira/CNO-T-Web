import React, { useState } from 'react';
import { Menu, Dropdown, Avatar, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Profile from './Profile';

const UserMenu = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    const handleVisibleChange = (flag) => {
        setVisible(flag);
    };

    const openProfileModal = () => {
        setProfileModalVisible(true);
    };

    const closeProfileModal = () => {
        setProfileModalVisible(false);
    };
const fullName = 'Joaquin Oliveira'
    // Obtener las iniciales del usuario
    const getInitials = (fullName) => {
        const names = fullName.split(' ');
        const initials = names.map((name) => name.charAt(0).toUpperCase());
        return initials.join('');
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" onClick={openProfileModal}>
                Profile
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown
                overlay={menu}
                onVisibleChange={handleVisibleChange}
                visible={visible}
                trigger={['click']}
            >
                <Avatar
                    size="large"
                    style={{
                        backgroundColor: '#1890ff',
                        verticalAlign: 'middle',
                        cursor: 'pointer',
                    }}
                >
                    {getInitials(fullName)}
                </Avatar>
            </Dropdown>
            <Modal
                title="Profile"
                visible={profileModalVisible}
                onCancel={closeProfileModal}
                footer={null}
            >
                <Profile user={user} />
            </Modal>
        </>
    );
};

export default UserMenu;