// TournamentDetails.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import MatchesList from './MatchesList';
import { fetchTournamentById } from '../redux/tournamentsSlice';
import { fetchMatchesByTournamentId } from '../redux/matchesSlices';
import { Spin } from 'antd';
import Navbar from './Navbar';
import TournamentDraw from './TournamentDraw';


const TournamentDetails = () => {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`}

    const { tournamentId } = useParams();
    const dispatch = useDispatch();
    const tournament = useSelector((state) => state.tournaments.currentTournament);
    useEffect(() => {
        dispatch(fetchTournamentById(tournamentId));
        dispatch(fetchMatchesByTournamentId(tournamentId));
    }, [dispatch, tournamentId]);
    if (!tournament) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <Spin size="large" />
            </div>
    }

    return (
        <div>
        <Navbar />
            <h1>{tournament.name}</h1>
            <p>Date: {formatDate(tournament.startDate)} / {formatDate(tournament.endDate)}</p>
            {/* Otros detalles del torneo */}
            <MatchesList tournamentId={tournamentId} />
            <TournamentDraw />
        </div>
    );
};

export default TournamentDetails;