import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Typography, Space, Card, notification } from 'antd';
import { GoogleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import escudoClub from '../../assets/CNLogo.png';
import { createUserInFirestore, getUserById } from '../../firebase/db';
/* import fondoLogin from '../assets/fondo-login.jpg';  */

const { Text } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = async (values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            if (user.emailVerified) {
                navigate('/home');
            } else {
                notification.warning({
                    message: 'Correo electrónico no verificado',
                    description: 'Por favor, verifica tu correo electrónico antes de iniciar sesión.',
                    placement: 'topRight',
                });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            notification.error({
                message: 'Error al iniciar sesión',
                description: error.message,
                placement: 'topRight',
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            // Verificar si el usuario ya existe en la base de datos
            const userSnapshot = await getUserById(user.uid);
    
            if (!userSnapshot) {
                // Si el usuario no existe, registrarlo automáticamente y redirigir a la página de perfil
                const newUser = {
                    id: user.uid,
                    email: user.email,
                    // Agrega otros campos iniciales si es necesario
                };
                await createUserInFirestore(user.uid, newUser);
                navigate('/profile');
            } else {
                // Si el usuario ya existe, redirigir a la página de inicio
                navigate('/home');
            }
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error.message);
            notification.error({
                message: 'Error al iniciar sesión con Google',
                description: 'Ocurrió un error al iniciar sesión con Google',
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
                            <Form onFinish={handleLogin} layout="vertical">
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Por favor, ingresa tu correo electrónico' }]}
                                >
                                    <Input prefix={<MailOutlined />} placeholder="Correo electrónico" size="large" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" size="large" />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block size="large">
                                        Iniciar sesión
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Button
                                onClick={handleGoogleLogin}
                                icon={<GoogleOutlined />}
                                block
                                size="large"
                                style={{ backgroundColor: '#db4437', color: '#fff' }}
                            >
                                Iniciar sesión con Google
                            </Button>
                            <div style={{ textAlign: 'center' }}>
                                <Text>¿Olvidaste tu contraseña? <Link to="/forgot-password">Restablecer contraseña</Link></Text>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Text>¿No tienes una cuenta? <Link to="/register">Regístrate</Link></Text>
                            </div>
                        </Space>
                    </Card>
                </Col>
            </Row>

    );
};

export default Login;