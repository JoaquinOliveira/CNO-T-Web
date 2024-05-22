import React, { useCallback, useMemo, useState } from 'react';
import { Menu, Dropdown, Avatar, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { useSelector } from 'react-redux';



const UserMenu = () => {

    const [visible, setVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const userData = useSelector((state) => state.user.data);

    const handleVisibleChange = (flag) => {
        setVisible(flag);
    };

    const openProfileModal = () => {
        setProfileModalVisible(true);
    };

    const closeProfileModal = () => {
        setProfileModalVisible(false);
    };    

    
    const getInitials = useCallback((fullName) => {
        const names = fullName.split(' ');
        const initials = names.map((name) => name.charAt(0).toUpperCase());
        return initials.join('');
    }, []);

    const memoizedInitials = useMemo(() => {
        if (userData && userData.name) {
            return getInitials(userData.name);
        }
        return '';
    }, [userData, getInitials]);



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
                    {memoizedInitials}
                </Avatar>
            </Dropdown>
            <Modal
                title="Profile"
                visible={profileModalVisible}
                onCancel={closeProfileModal}
                footer={null}
            >
                <Profile  />
            </Modal>
        </>
    );
};

export default UserMenu;