// matchesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserMatches, getUserById, getTournamentById, getMatchesByTournamentId, createMatch, updateMatch, deleteMatch } from '../firebase/db';

export const fetchMatchesByTournamentId = createAsyncThunk('matches/fetchMatchesByTournamentId', async (tournamentId) => {
    const matches = await getMatchesByTournamentId(tournamentId);
    return { tournamentId, matches };
});
export const fetchMatches = createAsyncThunk('matches/fetchMatches', async (userId) => {
    const userMatches = await getUserMatches();
    const tournamentIds = [...new Set(userMatches.map((match) => match.tournamentId))];
    const playerIds = [...new Set([...userMatches.map((match) => match.player1), ...userMatches.map((match) => match.player2)])];

    const [tournaments, players] = await Promise.all([
        Promise.all(tournamentIds.map((id) => getTournamentById(id))),
        Promise.all(playerIds.map((id) => getUserById(id))),
    ]);

    const matchesWithData = userMatches.map((match) => {
        const tournament = tournaments.find((t) => t.id === match.tournamentId);
        const player1 = players.find((p) => p.id === match.player1);
        const player2 = players.find((p) => p.id === match.player2);
        return { ...match, tournament, player1, player2 };
    });

    return matchesWithData;
});

export const addMatch = createAsyncThunk('matches/addMatch', async (matchData) => {
    const matchId = await createMatch(matchData);
    return { id: matchId, ...matchData };
});

export const editMatch = createAsyncThunk('matches/editMatch', async ({ matchId, updatedData }) => {
    await updateMatch(matchId, updatedData);
    return { id: matchId, ...updatedData };
});

export const removeMatch = createAsyncThunk('matches/removeMatch', async (matchId) => {
    await deleteMatch(matchId);
    return matchId;
});

const matchesSlice = createSlice({
    name: 'matches',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMatches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addMatch.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(editMatch.fulfilled, (state, action) => {
                const index = state.data.findIndex((match) => match.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(removeMatch.fulfilled, (state, action) => {
                state.data = state.data.filter((match) => match.id !== action.payload);
            });
    },
});

export default matchesSlice.reducer;