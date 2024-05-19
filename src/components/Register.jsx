import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography, Space, Card, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import escudoClub from '../assets/CNLogo.png';
import { createUserInFirestore } from '../firebase/db';


const { Title, Text } = Typography;

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (values) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log('Usuario registrado:', user);
    
            // Crear el usuario en Firestore
            const newUser = {
                id: user.uid,
                email: user.email,
                // Agrega otros campos iniciales si es necesario
            };
            await createUserInFirestore(user.uid, newUser);
    
            // Enviar correo electrónico de verificación
            await sendEmailVerification(user);
    
            notification.success({
                message: 'Registro exitoso',
                description: 'Se ha enviado un correo electrónico de verificación. Por favor, verifica tu cuenta.',
                placement: 'topRight',
            });
    
            navigate('/profile');
        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            notification.error({
                message: 'Error al registrar usuario',
                description: error.message,
                placement: 'topRight',
            });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', backgroundImage: `url(${''})`, backgroundSize: 'cover' }}>
            <Col xs={20} sm={16} md={12} lg={8}>
                <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={escudoClub} alt="Escudo del Club Centro Naval de Olivos" style={{ width: '100px', height: 'auto' }} />
                        </div>
                        <Title level={3} style={{ textAlign: 'center' }}>Registro de usuario</Title>
                        <Form onFinish={handleRegister} layout="vertical">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Por favor, ingresa tu correo electrónico' }]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Correo electrónico" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Por favor, ingresa tu contraseña' },
                                    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block size="large">
                                    Registrarse
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ textAlign: 'center' }}>
                            <Text>¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></Text>
                        </div>
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;