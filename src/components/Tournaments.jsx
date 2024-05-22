// Tournaments.jsx
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Typography, List, Button, message, Spin } from 'antd';
import { fetchTournaments, enrollTournament, withdrawTournament } from '../redux/tournamentsSlice';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const TournamentItem = React.memo(({ tournament, isEnrolled, handleEnroll, handleWithdraw }) => (
    <List.Item
        actions={[
            <Link to={`/tournaments/${tournament.id}`}>
                <Button type="primary">View Details</Button>
            </Link>,
            isEnrolled(tournament.id) ? (
                <Button type="default" onClick={() => handleWithdraw(tournament.id)}>
                    Withdraw
                </Button>
            ) : (
                <Button type="primary" onClick={() => handleEnroll(tournament.id)}>
                    Enroll
                </Button>
            ),
        ]}
    >
        <List.Item.Meta title={tournament.name} description={tournament.date} />
    </List.Item>
));

const Tournaments = () => {
    const dispatch = useDispatch();
    const { data: tournaments, pastTournaments, upcomingTournaments, enrolledTournaments, loading, error } = useSelector((state) => state.tournaments);
    const user = useSelector((state) => state.user.data);

    const fetchTournamentsCallback = useCallback(() => {
        dispatch(fetchTournaments());
    }, [dispatch]);

    useEffect(() => {
        fetchTournamentsCallback();
    }, [fetchTournamentsCallback]);

    const handleEnroll = useCallback((tournamentId) => {
        if (user) {
            dispatch(enrollTournament({ tournamentId, userId: user.id }));
        } else {
            console.error('User is not authenticated.');
            message.error('Failed to enroll in the tournament. Please try again.');
        }
    }, [dispatch, user]);

    const handleWithdraw = useCallback((tournamentId) => {
        dispatch(withdrawTournament({ tournamentId, userId: user.id }));
    }, [dispatch, user]);

    const isEnrolled = useCallback((tournamentId) => {
        return enrolledTournaments.includes(tournamentId);
    }, [enrolledTournaments]);

    const pastTournamentsMemo = useMemo(() => pastTournaments, [pastTournaments]);
    const upcomingTournamentsMemo = useMemo(() => upcomingTournaments, [upcomingTournaments]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                {(pastTournamentsMemo.length > 0 || upcomingTournamentsMemo.length > 0) && (
                    <>
                        <Title level={2}>Past Tournaments</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={pastTournamentsMemo}
                            renderItem={(tournament) => (
                                <TournamentItem key={tournament.id} tournament={tournament} />
                            )}
                        />

                        <Title level={2} style={{ marginTop: '40px' }}>Upcoming Tournaments</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={upcomingTournamentsMemo}
                            renderItem={(tournament) => (
                                <TournamentItem
                                    key={tournament.id}
                                    tournament={tournament}
                                    isEnrolled={isEnrolled}
                                    handleEnroll={handleEnroll}
                                    handleWithdraw={handleWithdraw}
                                />
                            )}
                        />
                    </>
                )}
            </Content>
        </Layout>
    );
};

export default Tournaments;