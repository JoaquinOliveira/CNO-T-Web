// tournamentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTournaments, getTournamentById, enrollParticipant, withdrawParticipant, getTournamentDraw, createTournamentDraw } from '../firebase/db';
import { fetchMatchesByTournamentId } from './matchesSlices';
import { formatDrawForBracket } from '../components/subcomponents/utils'


export const fetchTournamentById = createAsyncThunk('tournaments/fetchTournamentById', async (tournamentId) => {
    const tournament = await getTournamentById(tournamentId);
    return tournament;
});
export const fetchTournaments = createAsyncThunk('tournaments/fetchTournaments', async () => {
    const tournaments = await getTournaments();
    return tournaments;
});
export const enrollTournament = createAsyncThunk('tournaments/enrollTournament', async ({ tournamentId, userId }) => {
    await enrollParticipant(tournamentId, userId);
    return { tournamentId, userId };
});

export const withdrawTournament = createAsyncThunk('tournaments/withdrawTournament', async ({ tournamentId, userId }) => {
    await withdrawParticipant(tournamentId, userId);
    return { tournamentId, userId };
});

export const fetchTournamentDraw = createAsyncThunk('tournamentDraw/fetchTournamentDraw', async (tournamentId) => {
    const draw = await getTournamentDraw(tournamentId);
    return draw;
});

export const createDraw = createAsyncThunk('tournamentDraw/createDraw', async (tournamentId, { getState }) => {
    console.log('Creating draw for tournament:', tournamentId);
    const state = getState();
    const tournament = state.tournaments.data.find((t) => t.id === tournamentId);
    
    if (tournament) {
      const players = tournament.participants;
      await createTournamentDraw(tournamentId, players);
      const draw = await getTournamentDraw(tournamentId);
      return draw;
    }
    
    return null;
  });
const tournamentsSlice = createSlice({
    name: 'tournaments',
    initialState: {
        draw: null,
        data: [],
        pastTournaments: [],
        upcomingTournaments: [],
        enrolledTournaments: [],
        currentTournament: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTournaments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTournaments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.pastTournaments = action.payload.filter((tournament) => tournament.isPast);
                state.upcomingTournaments = action.payload.filter((tournament) => tournament.isUpcoming);
            })
            .addCase(enrollTournament.fulfilled, (state, action) => {
                const { tournamentId } = action.payload;
                state.enrolledTournaments.push(tournamentId);
            })
            .addCase(withdrawTournament.fulfilled, (state, action) => {
                const { tournamentId } = action.payload;
                state.enrolledTournaments = state.enrolledTournaments.filter((id) => id !== tournamentId);
            })
            .addCase(fetchTournaments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchTournamentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTournamentById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTournament = action.payload;
            })
            .addCase(fetchTournamentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMatchesByTournamentId.fulfilled, (state, action) => {
                const { tournamentId, matches } = action.payload;
                const tournament = state.data.find((t) => t.id === tournamentId);
                if (tournament) {
                    tournament.matches = matches;
                }
            })
            .addCase(createDraw.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            /* .addCase(createDraw.fulfilled, (state, action) => {
                state.loading = false;
                state.draw = action.payload;
            }) */
            .addCase(createDraw.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createDraw.fulfilled, (state, action) => {
                state.loading = false;
                state.draw = action.payload;
                state.formattedDraw = formatDrawForBracket(action.payload);
            });

    },
});

export default tournamentsSlice.reducer;