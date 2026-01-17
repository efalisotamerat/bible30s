import Scoreboard from './Scoreboard.jsx'

export default function RoundReady({ currentTeam, teams, currentTeamIndex, onStartRound, onEndGame }) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          {currentTeam?.name}'s Turn
        </h2>
        <p className="text-gray-600">Get ready to describe 5 words in 30 seconds!</p>
      </div>

      <Scoreboard teams={teams} currentTeamIndex={currentTeamIndex} />

      <div className="flex gap-4 justify-center">
        <button
          onClick={onStartRound}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          Start Round
        </button>
        <button
          onClick={onEndGame}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          End Game
        </button>
      </div>
    </div>
  )
}
