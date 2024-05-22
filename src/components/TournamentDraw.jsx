// TournamentDraw.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createDraw, fetchTournamentDraw } from '../redux/tournamentsSlice';
import { Spin, Tree, Button } from 'antd';
import { SingleEliminationBracket } from '@g-loot/react-tournament-brackets';


const TournamentDraw = () => {
    const { tournamentId } = useParams();
    const dispatch = useDispatch();
    const { draw, loading, error } = useSelector((state) => state.tournaments);
    useEffect(() => {
        dispatch(fetchTournamentDraw(tournamentId));
    }, [dispatch, tournamentId]);

    const handleCreateDraw = () => {
        const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8'];
        dispatch(createDraw({ tournamentId, players }));
    };


    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Spin size="large" />
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const renderMatch = ({ match }) => (
        <div>
            <div>{match.player1}</div>
            <div>{match.player2}</div>
            <div>{match.winner || 'TBD'}</div>
        </div>
    );

    const renderDrawTree = (draw) => {
        const treeData = [];

        const createTreeNode = (match, level) => {
            const { player1, player2, winner } = match;
            const title = `${player1} vs ${player2}`;
            const result = winner ? `Winner: ${winner}` : 'Match Pending';
            return {
                title: `Level ${level}: ${title}`,
                key: match.id,
                description: result,
            };
        };

        const createTreeData = (matches, level) => {
            matches.forEach((match) => {
                const treeNode = createTreeNode(match, level);
                treeData.push(treeNode);
            });
        };

        // Transformar la estructura de datos para react-bracket
        const adjustedRounds = draw.rounds ? draw.rounds.map((round) => round.map(({ player1, player2 }) => ({ player1, player2 }))) : [];

        adjustedRounds.forEach((round, index) => {
            createTreeData(round, index + 1);
        });

        return <Tree treeData={treeData} />;
    };

    return (
        <div>
            <h2>Tournament Draw</h2>
            <Button onClick={handleCreateDraw}>Create Draw</Button>

            {draw && draw.rounds && (
                <SingleEliminationBracket
                    rounds={draw.rounds}
                    renderMatch={renderMatch}
                    bracketClassName="my-bracket"
                />
            )}
        </div>
    );
};

export default TournamentDraw;


