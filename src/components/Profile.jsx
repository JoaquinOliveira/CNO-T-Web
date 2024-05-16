import React from 'react';
import { Layout, Typography, Form, Input, Button, Switch } from 'antd';
import useTheme from '../utils/useTheme';
import Navbar from './Navbar';

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
    const { isDarkMode, handleThemeChange } = useTheme();
    const [form] = Form.useForm();

    const handleSave = (values) => {
        // Lógica para guardar los datos del perfil
        console.log('Profile data:', values);
    };

    return (
        <Layout>
            <Navbar />
            <Content style={{ padding: '50px' }}>
                <Title level={2}>Profile</Title>
                <Form form={form} onFinish={handleSave} layout="vertical">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="membershipNumber"
                        label="Membership Number"
                        rules={[{ required: true, message: 'Please enter your membership number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please enter your email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="theme" label="Theme">
                        <Switch
                            checked={isDarkMode}
                            onChange={handleThemeChange}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default Profile;