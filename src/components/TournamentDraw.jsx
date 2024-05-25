// TournamentDraw.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createDraw, fetchTournamentDraw } from '../redux/tournamentsSlice';
import { Spin, Button } from 'antd';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { formatMatchesForBracket } from './subcomponents/utils';


const TournamentDraw = () => {
    const { tournamentId } = useParams();
    const dispatch = useDispatch();
    const { draw, loading, error } = useSelector((state) => state.tournaments);
    useEffect(() => {
        dispatch(fetchTournamentDraw(tournamentId));
    }, [dispatch, tournamentId]);

    const handleCreateDraw = () => { 
        dispatch(createDraw(tournamentId));
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
            <h2>Tournament Draw</h2>
            <Button onClick={handleCreateDraw}>Create Draw</Button>

            {draw && draw.rounds && Array.isArray(draw.rounds) && (
                <SingleEliminationBracket
                    matches={formatMatchesForBracket(draw.rounds)}
                    matchComponent={Match}
                    svgWrapper={({ children, ...props }) => (
                        <SVGViewer width={10000} height={200} {...props}>
                            {children}
                        </SVGViewer>
                    )}
                />
            )}


        </div>
    );
};

export default TournamentDraw;


