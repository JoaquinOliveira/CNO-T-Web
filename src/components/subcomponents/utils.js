
export const formatMatchesForBracket = (rounds) => {
    const matches = [];
    console.log('Rounds:', rounds);

    rounds.forEach((round, roundIndex) => {
        round.forEach((match) => {
            const formattedMatch = {
                id: match.id,
                name: `Round ${roundIndex + 1} - Match`,
                nextMatchId: null,
                tournamentRoundText: `${roundIndex + 1}`,
                startTime: '',
                state: 'DONE',
                participants: [
                    {
                        id: match.player1,
                        resultText: '',
                        isWinner: match.winner === match.player1,
                        status: null,
                        name: match.player1,
                    },
                    {
                        id: match.player2,
                        resultText: '',
                        isWinner: match.winner === match.player2,
                        status: null,
                        name: match.player2,
                    },
                ],
            };
            matches.push(formattedMatch);
            console.log('Formatted matches:', matches);
        });
    });

    return matches;
};
export const formatDrawForBracket = (drawStructure) => {
    if (!drawStructure || !drawStructure.rounds) {
        return [];
    }

    const matches = [];

    drawStructure.rounds.forEach((round, roundIndex) => {
        round.forEach((match) => {
            const formattedMatch = {
                id: match.id,
                name: `Round ${roundIndex + 1} - Match`,
                nextMatchId: null,
                tournamentRoundText: `${roundIndex + 1}`,
                startTime: '',
                state: 'DONE',
                participants: [
                    {
                        id: match.player1,
                        resultText: '',
                        isWinner: false,
                        status: null,
                        name: match.player1,
                    },
                    {
                        id: match.player2,
                        resultText: '',
                        isWinner: false,
                        status: null,
                        name: match.player2,
                    },
                ],
            };
            matches.push(formattedMatch);
        });
    });

    return matches;
};