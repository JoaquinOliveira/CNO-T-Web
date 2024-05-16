import React from 'react';
import { Layout, Typography, List, Button } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const { Content } = Layout;
const { Title } = Typography;

const Tournaments = () => {
    // Datos de ejemplo
    const pastTournaments = [
        {
            id: 1,
            name: 'Club Championship 2023',
            date: '2023-05-15',
        },
        {
            id: 2,
            name: 'Summer Open 2023',
            date: '2023-07-10',
        },
    ];

    const upcomingTournaments = [
        {
            id: 3,
            name: 'Autumn Cup 2024',
            date: '2024-09-20',
        },
        {
            id: 4,
            name: 'Winter Classic 2024',
            date: '2024-12-05',
        },
    ];

    const handleRegister = (tournamentId) => {
        // Lógica para manejar el registro en un torneo
        console.log(`Registering for tournament with ID: ${tournamentId}`);
    };

    return (
        <Layout>
            <Navbar />
            <Content style={{ padding: '50px' }}>
                <Title level={2}>Past Tournaments</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={pastTournaments}
                    renderItem={(tournament) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<Link to={`/tournaments/${tournament.id}`}>{tournament.name}</Link>}
                                description={tournament.date}
                            />
                        </List.Item>
                    )}
                />

                <Title level={2} style={{ marginTop: '40px' }}>Upcoming Tournaments</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={upcomingTournaments}
                    renderItem={(tournament) => (
                        <List.Item
                            actions={[
                                <Button type="primary" onClick={() => handleRegister(tournament.id)}>
                                    Register
                                </Button>,
                            ]}
                        >
                            <List.Item.Meta
                                title={tournament.name}
                                description={tournament.date}
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default Tournaments;