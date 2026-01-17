export default function Scoreboard({ teams, currentTeamIndex }) {
  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Scores:</h3>
      <div className="grid grid-cols-2 gap-2">
        {teams.map((team, index) => (
          <div
            key={index}
            className={`p-3 rounded ${
              index === currentTeamIndex ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-white'
            }`}
          >
            <div className="font-medium">{team.name}</div>
            <div className="text-2xl font-bold text-indigo-600">{team.score} pts</div>
          </div>
        ))}
      </div>
    </div>
  )
}
