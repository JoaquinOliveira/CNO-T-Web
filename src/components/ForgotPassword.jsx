import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography, Space, Card, notification } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import escudoClub from '../assets/CNLogo.png';


const { Title, Text } = Typography;

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleForgotPassword = async (values) => {
        try {
            await sendPasswordResetEmail(auth, values.email);
            notification.success({
                message: 'Correo electrónico enviado',
                description: 'Se ha enviado un correo electrónico con las instrucciones para restablecer tu contraseña.',
                placement: 'topRight',
            });
            navigate('/login');
        } catch (error) {
            console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error.message);
            notification.error({
                message: 'Error al enviar el correo electrónico',
                description: 'Ocurrió un error al enviar el correo electrónico de restablecimiento de contraseña. Por favor, inténtalo de nuevo.',
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
                        <Title level={3} style={{ textAlign: 'center' }}>Restablecer contraseña</Title>
                        <Form onFinish={handleForgotPassword} layout="vertical">
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Por favor, ingresa tu correo electrónico' }]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Correo electrónico" size="large" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block size="large">
                                    Enviar correo electrónico
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ textAlign: 'center' }}>
                            <Text>¿Recordaste tu contraseña? <Link to="/login">Iniciar sesión</Link></Text>
                        </div>
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};

export default ForgotPassword;