import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Col, notification, Checkbox, Row, Tag, Modal } from 'antd';
import { getUserById, updateUserInFirestore } from '../firebase/db';
import { auth } from '../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHours, setSelectedHours] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = auth.currentUser.uid;
                const userData = await getUserById(userId);
                if (userData) {
                    form.setFieldsValue({
                        name: userData.name,
                        phone: userData.phone,
                        socio: userData.socio,
                    });
                    setSelectedHours(userData.playPreference || []);
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, [form]);

    const handleSave = async (values) => {
        try {
            const userId = auth.currentUser.uid;
            const updatedData = {
                name: values.name,
                phone: values.phone,
                playPreference: selectedHours,
                socio: values.socio,
            };
            await updateUserInFirestore(userId, updatedData);
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

 

    const handleTagClose = (selectedHour) => {
        setSelectedHours((prevSelectedHours) =>
            prevSelectedHours.filter((h) => h !== selectedHour)
        );
    };

    const openModal = (day) => {
        setSelectedDay(day);
        setVisibleModal(true);
    };

    const closeModal = () => {
        setSelectedDay(null);
        setVisibleModal(false);
    };

    const renderPlayPreference = () => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return (
            <>
                <Form.Item label="Select Preferred Days">
                    <Row gutter={[8, 8]}>
                        {days.map((day) => (
                            <Col key={day}>
                                <Button onClick={() => openModal(day)}>{day}</Button>
                            </Col>
                        ))}
                    </Row>
                </Form.Item>
                <Form.Item label="Selected Hours">
                    {selectedHours.map((selectedHour) => (
                        <Tag
                            key={selectedHour}
                            closable
                            onClose={() => handleTagClose(selectedHour)}
                        >
                            {selectedHour}
                        </Tag>
                    ))}
                </Form.Item>
            </>
        );
    };

    const renderHoursModal = () => {
        const hours = Array.from({ length: 11 }, (_, index) => `${index + 10}:00`);

        return (
            <Modal
                title={`Select Hours for ${selectedDay}`}
                visible={visibleModal}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Close
                    </Button>,
                ]}
            >
                <Checkbox.Group
                    style={{ width: '100%' }}
                    value={selectedHours
                        .filter((h) => h.startsWith(selectedDay))
                        .map((h) => h.split(' - ')[1])}
                    onChange={(checkedValues) => {
                        const newSelectedHours = selectedHours.filter(
                            (h) => !h.startsWith(selectedDay)
                        );
                        const updatedSelectedHours = Array.from(
                            new Set([...newSelectedHours, ...checkedValues.map((hour) => `${selectedDay} - ${hour}`)])
                        );
                        setSelectedHours(updatedSelectedHours);
                    }}
                >
                    <Row gutter={[8, 8]}>
                        {hours.map((hour) => (
                            <Col key={`${selectedDay}-${hour}`} span={8}>
                                <Checkbox value={hour}>{hour}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </Modal>
        );
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
                {renderPlayPreference()}

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
                {renderHoursModal()}
            </Form>
        </>
    );
};

export default Profile;

