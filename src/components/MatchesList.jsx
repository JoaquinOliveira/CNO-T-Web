// MatchesList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Button, Spin } from 'antd';
import { fetchMatches, addMatch, editMatch, removeMatch } from '../redux/matchesSlices';

const MatchesList = ({ tournamentId }) => {
    const dispatch = useDispatch();
    const { data: matches, loading, error } = useSelector((state) => state.matches);
    
console.log(matches)

    useEffect(() => {
        dispatch(fetchMatches(tournamentId));
    }, [dispatch, tournamentId]);

    const handleAddMatch = () => {
        const newMatch = {
            player1: '',
            player2: '',
            score: '',
            tournamentId,
            winner: '',
        };
        dispatch(addMatch(newMatch));
    };

    const handleEditMatch = (matchId, updatedData) => {
        dispatch(editMatch({ matchId, updatedData }));
    };

    const handleRemoveMatch = (matchId) => {
        dispatch(removeMatch(matchId));
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spin size="large" />
    </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Matches</h2>
            <Button onClick={handleAddMatch}>Add Match</Button>
            <List
                itemLayout="horizontal"
                dataSource={matches}
                renderItem={(match) => (
                    <List.Item
                        actions={[
                            <Button onClick={() => handleEditMatch(match.id, { score: '6-4, 6-3' })}>Edit</Button>,
                            <Button onClick={() => handleRemoveMatch(match.id)}>Remove</Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={`${match.player1.name} vs ${match.player2.name}`}
                            description={`Score: ${match.score}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MatchesList;