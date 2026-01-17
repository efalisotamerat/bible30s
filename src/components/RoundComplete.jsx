import Scoreboard from './Scoreboard.jsx'

export default function RoundComplete({ currentTeam, points, teams, currentTeamIndex, onNextTeam, onResetGame, onEndGame }) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Round Complete!</h2>
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {points}
        </div>
        <div className="text-gray-600">points for {currentTeam?.name}</div>
      </div>

      <Scoreboard teams={teams} currentTeamIndex={currentTeamIndex} />

      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onNextTeam}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          Next Team
        </button>
        <button
          onClick={onEndGame}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          End Game
        </button>
        <button
          onClick={onResetGame}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}
