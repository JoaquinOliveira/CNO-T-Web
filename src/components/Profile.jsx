import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getUserById, updateUserInFirestore } from '../firebase/db';
import { auth } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import PlayPreference from './subcomponents/PlayPreference';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Profile = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [selectedHours, setSelectedHours] = useState([])
    const userData = useSelector((state) => state.user.data);
    const dispatch = useDispatch()
    
        useEffect(() => {
            if (userData) {
                form.setFieldsValue({
                    name: userData.name,
                    phone: userData.phone,
                    socio: userData.socio,
                });
                setSelectedHours(userData.playPreference || []);
            }
        }, [userData]);


    const handleSave = async (values) => {
        try {
            const userId = auth.currentUser.uid;
            const updatedData = {
                ...values,
                playPreference: selectedHours,
            };
            await updateUserInFirestore(userId, updatedData);
            dispatch(setUserData(updatedData));
            notification.success({
                message: 'Perfil actualizado',
                description: 'Tu perfil se ha actualizado exitosamente.',
            });
            navigate('/home');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            notification.error({
                message: 'Error al actualizar el perfil',
                description: 'Ocurrió un error al actualizar tu perfil. Por favor, intenta nuevamente.',
            });
        }
    };


    return (
        <>
            <Form form={form} onFinish={handleSave} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
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
                <PlayPreference selectedHours={selectedHours} setSelectedHours={setSelectedHours} />

                <Form.Item
                    name="socio"
                    label="Socio"
                    rules={[{ required: true, message: 'Please enter your socio number' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
};

export default Profile;

