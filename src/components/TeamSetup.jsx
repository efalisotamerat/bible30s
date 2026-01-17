export default function TeamSetup({ teams, teamNameInput, setTeamNameInput, onAddTeam, onRemoveTeam, onStartGame }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Create Teams</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={teamNameInput}
            onChange={(e) => setTeamNameInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAddTeam()}
            placeholder="Enter team name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={onAddTeam}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center min-w-[48px]"
            aria-label="Add team"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Teams:</h3>
          <div className="space-y-2">
            {teams.map((team, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-800">{team.name}</span>
                <button
                  onClick={() => onRemoveTeam(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {teams.length >= 2 && (
        <div className="text-center">
          <button
            onClick={onStartGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
          >
            Start Game
          </button>
        </div>
      )}

      {teams.length < 2 && teams.length > 0 && (
        <p className="text-center text-gray-500">Add at least 2 teams to start</p>
      )}
    </div>
  )
}
