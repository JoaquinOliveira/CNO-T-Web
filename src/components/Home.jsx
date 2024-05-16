import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import Navbar from './Navbar';

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

const Home = () => {
    // Datos de ejemplo
    const ranking = {
        position: 10,
        lastPosition: 12,
        lastUpdate: '2023-06-08',
    };

    const division = 'Primera División';

    const lastMatch = {
        opponent: 'John Doe',
        result: 'Won',
        score: '6-4, 6-3',
    };

    const lastTournament = {
        name: 'Club Championship',
        result: 'Semifinalist',
    };

    return (
        <Layout>
            <Navbar />
            <Content style={{ padding: '50px' }}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Card title="Ranking">
                            <Title level={2}>Current Position: {ranking.position}</Title>
                            <Text>
                                Last Position: {ranking.lastPosition} ({ranking.lastUpdate})
                            </Text>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Division">
                            <Title level={2}>{division}</Title>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                    <Col span={12}>
                        <Card title="Last Match">
                            <Text>
                                Opponent: {lastMatch.opponent}
                            </Text>
                            <Text>
                                Result: {lastMatch.result}
                            </Text>
                            <Text>
                                Score: {lastMatch.score}
                            </Text>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Last Tournament">
                            <Text>
                                Tournament: {lastTournament.name}
                            </Text>
                            <Text>
                                Result: {lastTournament.result}
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <Text>
                    Central Naval de Olivos - Tenis <CopyrightOutlined /> 2024
                </Text>
            </Footer>
        </Layout>
    );
};

export default Home;