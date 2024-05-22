import { collectionRef, addDoc, query, where, doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from './firebase-config'
import moment from 'moment';



// Configuración de Firebase



// Función para crear un nuevo usuario en Firestore
const createUserInFirestore = async (userId, userData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, userData);
    } catch (error) {
        console.error('Error al crear usuario en Firestore:', error);
        throw error;
    }
};

// Función para obtener un usuario de Firestore por su ID
const getUserById = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            return userData;
        } else {
            console.log('Usuario no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
};

// Función para actualizar un usuario en Firestore
const updateUserInFirestore = async (userId, updatedData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, updatedData);
    } catch (error) {
        console.error('Error al actualizar usuario en Firestore:', error);
        throw error;
    }
};

// Función para eliminar un usuario de Firestore
const deleteUserFromFirestore = async (userId) => {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
        console.log('Usuario eliminado de Firestore');
    } catch (error) {
        console.error('Error al eliminar usuario de Firestore:', error);
        throw error;
    }
};
const createTournament = async (tournamentData) => {
    try {
        const tournamentRef = doc(collection(db, 'tournaments'));
        // Convertir la fecha a una cadena de texto en formato ISO
        tournamentData.startDate = tournamentData.startDate.toISOString();
        tournamentData.endDate = tournamentData.endDate.toISOString();
        await setDoc(tournamentRef, tournamentData);
        console.log('Tournament created successfully');
        return tournamentRef.id;
    } catch (error) {
        console.error('Error creating tournament:', error);
        throw error;
    }
};
// Función para obtener un torneo por su ID
const getTournamentById = async (tournamentId) => {
    try {
        const tournamentRef = doc(db, 'tournaments', tournamentId);
        const tournamentSnapshot = await getDoc(tournamentRef);
        if (tournamentSnapshot.exists()) {
            const tournamentData = tournamentSnapshot.data();
            return { id: tournamentSnapshot.id, ...tournamentData };
        } else {
            console.log('Tournament not found');
            return null;
        }
    } catch (error) {
        console.error('Error getting tournament:', error);
        throw error;
    }
};

// Función para actualizar un torneo en Firestore
const updateTournament = async (tournamentId, updatedData) => {
    try {
        const tournamentRef = doc(db, 'tournaments', tournamentId);
        await updateDoc(tournamentRef, updatedData);
        console.log('Tournament updated successfully');
    } catch (error) {
        console.error('Error updating tournament:', error);
        throw error;
    }
};

// Función para eliminar un torneo de Firestore
const deleteTournament = async (tournamentId) => {
    try {
        const tournamentRef = doc(db, 'tournaments', tournamentId);
        await deleteDoc(tournamentRef);
        console.log('Tournament deleted successfully');
    } catch (error) {
        console.error('Error deleting tournament:', error);
        throw error;
    }
};

// Función para inscribir a un participante en un torneo
const enrollParticipant = async (tournamentId, participantData) => {
    try {
        const tournamentRef = doc(db, 'tournaments', tournamentId);
        await updateDoc(tournamentRef, {
            participants: arrayUnion(participantData),
        });
        console.log('Participant enrolled successfully');
    } catch (error) {
        console.error('Error enrolling participant:', error);
        throw error;
    }
};

// Función para desinscribir a un participante de un torneo
const withdrawParticipant = async (tournamentId, participantId) => {
    try {
        const tournamentRef = doc(db, 'tournaments', tournamentId);
        const tournamentSnapshot = await getDoc(tournamentRef);
        if (tournamentSnapshot.exists()) {
            const tournamentData = tournamentSnapshot.data();
            const updatedParticipants = tournamentData.participants.filter(
                (participant) => participant !== participantId
            );
            await updateDoc(tournamentRef, {
                participants: updatedParticipants,
            });
            console.log('Participant withdrawn successfully');
        } else {
            console.log('Tournament not found');
        }
    } catch (error) {
        console.error('Error withdrawing participant:', error);
        throw error;
    }
};
// db.js
const getTournaments = async () => {
    try {
        const tournamentsRef = collection(db, 'tournaments');
        const tournamentsSnapshot = await getDocs(tournamentsRef);
        const tournaments = tournamentsSnapshot.docs.map(doc => {
            const data = doc.data();
            const now = moment().valueOf();
            const endDate = moment(data.endDate).valueOf();
            const isPast = endDate < now;
            const isUpcoming = endDate >= now;
            return {
                id: doc.id,
                ...data,
                isPast,
                isUpcoming
            };
        });
        return tournaments;
    } catch (error) {
        console.error('Error getting tournaments:', error);
        throw error;
    }
};
const getUserEnrolledTournaments = async (userId) => {
    try {
        const tournamentsRef = collection(db, 'tournaments');
        const querySnapshot = await getDocs(
            query(tournamentsRef, where('participants', 'array-contains', userId))
        );

        const enrolledTournaments = querySnapshot.docs.map(doc => doc.id);
        return enrolledTournaments;
    } catch (error) {
        console.error('Error getting user enrolled tournaments:', error);
        throw error;
    }
};

// Función para obtener todos los partidos de un torneo específico
export const getMatchesByTournamentId = async (tournamentId) => {
    try {
        const matchesRef = collection(db, 'matches');
        const q = query(matchesRef, where('tournamentId', '==', tournamentId));
        const querySnapshot = await getDocs(q);
        const matches = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return matches;
    } catch (error) {
        console.error('Error getting matches:', error);
        throw error;
    }


}; export const getUserMatches = async () => {
    try {
        const user = auth.currentUser;
        const matchesRef = collection(db, 'matches');
        const q = query(
            matchesRef,
            where('player1', '==', user.uid),
            where('player2', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const matches = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return matches;
    } catch (error) {
        console.error('Error getting matches:', error);
        throw error;
    }
};

// Función para crear un nuevo partido
export const createMatch = async (matchData) => {
    try {
        const matchesRef = collection(db, 'matches');
        const docRef = await addDoc(matchesRef, matchData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating match:', error);
        throw error;
    }
};

// Función para actualizar un partido existente
export const updateMatch = async (matchId, updatedData) => {
    try {
        const matchRef = doc(db, 'matches', matchId);
        await updateDoc(matchRef, updatedData);
    } catch (error) {
        console.error('Error updating match:', error);
        throw error;
    }
};

// Función para eliminar un partido
export const deleteMatch = async (matchId) => {
    try {
        const matchRef = doc(db, 'matches', matchId);
        await deleteDoc(matchRef);
    } catch (error) {
        console.error('Error deleting match:', error);
        throw error;
    }
};
export const getAllMatches = async () => {
    try {
        const matchesRef = collection(db, 'matches');
        const querySnapshot = await getDocs(matchesRef);
        const matches = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        return matches;
    } catch (error) {
        console.error('Error getting matches:', error);
        throw error;
    }
};

export const getTournamentDraw = async (tournamentId) => {
    try {
        const tournamentDrawRef = doc(db, 'tournamentDraws', tournamentId);
        const tournamentDrawSnapshot = await getDoc(tournamentDrawRef);

        if (tournamentDrawSnapshot.exists()) {
            const tournamentDrawData = tournamentDrawSnapshot.data();
            const roundsCollection = collection(tournamentDrawRef, 'rounds');
            const roundsSnapshot = await getDocs(roundsCollection);

            const rounds = roundsSnapshot.docs.map((doc) => doc.data().matches);

            return {
                tournamentId: tournamentDrawData.tournamentId,
                numRounds: tournamentDrawData.numRounds,
                rounds,
            };
        } else {
            console.log('Tournament draw does not exist');
            return null;
        }
    } catch (error) {
        console.error('Error getting tournament draw:', error);
        throw error;
    }
};

export const createTournamentDrawsCollection = async () => {
    try {
        const collectionRef = collection(db, 'tournamentDraws');
        console.log('Collection "tournamentDraws" created successfully');
    } catch (error) {
        console.error('Error creating collection "tournamentDraws":', error);
    }
};

export const saveTournamentDraw = async (tournamentId, draw) => {
    try {
        const drawRef = doc(db, 'draws', tournamentId);
        await setDoc(drawRef, draw);
        console.log('Tournament draw saved successfully');
    } catch (error) {
        console.error('Error saving tournament draw:', error);
        throw error;
    }
};

export const createTournamentDraw = async (tournamentId, players) => {
    try {
        const drawStructure = generateDrawStructure(tournamentId, players);
        const tournamentDrawRef = doc(db, 'tournamentDraws', tournamentId);
        const roundsCollection = collection(tournamentDrawRef, 'rounds');

        // Guardar información general del torneo
        await setDoc(tournamentDrawRef, {
            tournamentId: drawStructure.tournamentId,
            numRounds: drawStructure.rounds.length,
        });

        // Guardar cada ronda en un documento separado
        for (let i = 0; i < drawStructure.rounds.length; i++) {
            const roundRef = doc(roundsCollection, `round${i + 1}`);
            await setDoc(roundRef, { matches: drawStructure.rounds[i] });
        }

        console.log('Tournament draw created successfully');
    } catch (error) {
        console.error('Error creating tournament draw:', error);
        throw error;
    }
};

export const generateDrawStructure = (tournamentId, players) => {
    const rounds = [];
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);
    let currentPlayers = shuffledPlayers.map((player) => ({ playerId: player, eliminated: false }));

    while (currentPlayers.length > 1) {
        const round = [];
        for (let i = 0; i < currentPlayers.length; i += 2) {
            const match = {
                id: `match${round.length + 1}`,
                player1: currentPlayers[i].playerId,
                player2: currentPlayers[i + 1] ? currentPlayers[i + 1].playerId : null,
                winner: null,
            };
            round.push(match);
        }
        rounds.push(round);
        currentPlayers = currentPlayers.filter((player, index) => index % 2 === 0 && !player.eliminated);
    }

    return {
        tournamentId,
        rounds,
    };
};
// Exportar las funciones
export {
    createUserInFirestore,
    getUserById,
    updateUserInFirestore,
    deleteUserFromFirestore,
    createTournament,
    getTournamentById,
    updateTournament,
    deleteTournament,
    enrollParticipant,
    withdrawParticipant,
    getTournaments,
    getUserEnrolledTournaments,

};