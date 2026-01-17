import Scoreboard from './Scoreboard.jsx'

export default function GameOver({ teams, onNewGame }) {
  // Find winning team(s)
  const maxScore = Math.max(...teams.map(team => team.score))
  const winners = teams.filter(team => team.score === maxScore)

  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-4xl font-bold text-indigo-900 mb-4">Game Over!</h2>
        <p className="text-lg text-gray-600 mb-2">All words have been used.</p>
      </div>

      <div className="mb-6">
        {winners.length === 1 ? (
          <div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">🏆 Winner!</div>
            <div className="text-2xl font-bold text-indigo-900">{winners[0].name}</div>
            <div className="text-xl text-gray-600 mt-2">{winners[0].score} points</div>
          </div>
        ) : (
          <div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">🏆 It's a Tie!</div>
            <div className="space-y-2">
              {winners.map((team, index) => (
                <div key={index} className="text-xl font-bold text-indigo-900">
                  {team.name} - {team.score} points
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Scoreboard teams={teams} currentTeamIndex={-1} />

      <button
        onClick={onNewGame}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
      >
        New Game
      </button>
    </div>
  )
}
