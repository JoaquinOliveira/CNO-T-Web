import React, { useEffect, useCallback, useMemo } from 'react';
import { Layout, Typography, List, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMatches } from '../redux/matchesSlices';
import { auth } from '../firebase/firebase-config';

const { Content } = Layout;
const { Title } = Typography;

const Results = () => {
    const dispatch = useDispatch();
    const user = auth.currentUser.uid;
    const { data: matches, loading, error } = useSelector((state) => state.matches);

    const fetchMatchesCallback = useCallback(() => {
        dispatch(fetchMatches(user));
    }, [dispatch, user]);

    useEffect(() => {
        fetchMatchesCallback();
    }, [fetchMatchesCallback]);

    const sortedMatches = useMemo(() => {
        return matches.sort((a, b) => {
            const tournamentCompare = a.tournament.name.localeCompare(b.tournament.name);
            if (tournamentCompare !== 0) return tournamentCompare;
            return new Date(a.date) - new Date(b.date);
        });
    }, [matches]);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spin size="large" />
    </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <Title level={2}>Results</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={sortedMatches}
                    renderItem={(match) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`${match.player1.name} vs ${match.player2.name} (${match.tournament.name})`}
                                description={`Score: ${match.score}`}
                            />
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default Results;