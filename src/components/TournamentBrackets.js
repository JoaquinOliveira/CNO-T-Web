export const TournamentBracket = ({ draw }) => {
    const renderMatch = (match, level) => (
        <div key={match.id} className={`match level-${level}`}>
            <div className="players">
                <div>{match.player1}</div>
                <div>{match.player2}</div>
            </div>
            <div className="winner">{match.winner || 'TBD'}</div>
            {match.nextMatch && (
                <div className="next-match">
                    {renderMatch(match.nextMatch, level + 1)}
                </div>
            )}
        </div>
    );

    const renderRound = (round, level) => (
        <div key={`round-${level}`} className="round">
            {round.map((match) => renderMatch(match, level))}
        </div>
    );

    return (
        <div className="tournament-bracket">
            {draw.rounds.map((round, index) => renderRound(round, index + 1))}
        </div>
    );
};