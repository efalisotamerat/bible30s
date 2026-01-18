import { useState } from 'react'
import { t } from '../translations.js'

export default function TeamSetup({ teams, teamNameInput, setTeamNameInput, onAddTeam, onRemoveTeam, onAddPlayer, onRemovePlayer, onUpdateTeamName, onStartGame, language }) {
  const [playerInputs, setPlayerInputs] = useState({})
  const [editingTeamIndex, setEditingTeamIndex] = useState(null)
  const [editingTeamName, setEditingTeamName] = useState('')

  const handlePlayerInputChange = (teamIndex, value) => {
    setPlayerInputs({ ...playerInputs, [teamIndex]: value })
  }

  const handleAddPlayer = (teamIndex) => {
    const playerName = playerInputs[teamIndex] || ''
    if (playerName.trim()) {
      onAddPlayer(teamIndex, playerName)
      setPlayerInputs({ ...playerInputs, [teamIndex]: '' })
    }
  }

  const handleStartEditTeam = (teamIndex, currentName) => {
    setEditingTeamIndex(teamIndex)
    setEditingTeamName(currentName)
  }

  const handleSaveTeamName = (teamIndex) => {
    if (editingTeamName.trim()) {
      onUpdateTeamName(teamIndex, editingTeamName)
    }
    setEditingTeamIndex(null)
    setEditingTeamName('')
  }

  const handleCancelEdit = () => {
    setEditingTeamIndex(null)
    setEditingTeamName('')
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">{t('createTeams', language)}</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={teamNameInput}
            onChange={(e) => setTeamNameInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onAddTeam()}
            placeholder={t('enterTeamName', language)}
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
        <div className="mb-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">{t('teams', language)}</h3>
          {teams.map((team, teamIndex) => (
            <div key={teamIndex} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                {editingTeamIndex === teamIndex ? (
                  <div className="flex items-center gap-2 flex-1 mr-2">
                    <input
                      type="text"
                      value={editingTeamName}
                      onChange={(e) => setEditingTeamName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveTeamName(teamIndex)
                        } else if (e.key === 'Escape') {
                          handleCancelEdit()
                        }
                      }}
                      className="flex-1 px-3 py-1 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-medium"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveTeamName(teamIndex)}
                      className="text-green-600 hover:text-green-700 font-bold text-sm px-2"
                      aria-label={t('save', language)}
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500 hover:text-gray-700 font-bold text-sm px-2"
                      aria-label={t('cancel', language)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium text-gray-800 text-lg">{team.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEditTeam(teamIndex, team.name)}
                        className="text-indigo-600 hover:text-indigo-700 font-bold text-sm"
                        aria-label={t('edit', language)}
                      >
                        {t('edit', language)}
                      </button>
                      <button
                        onClick={() => onRemoveTeam(teamIndex)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                      >
                        {t('remove', language)}
                      </button>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mb-3">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={playerInputs[teamIndex] || ''}
                    onChange={(e) => handlePlayerInputChange(teamIndex, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer(teamIndex)}
                    placeholder={t('addPlayerName', language)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                  <button
                    onClick={() => handleAddPlayer(teamIndex)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-sm"
                    aria-label="Add player"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                {team.players && team.players.length > 0 && (
                  <div className="space-y-1">
                    {team.players.map((player, playerIndex) => (
                      <div key={playerIndex} className="flex items-center justify-between bg-white p-2 rounded text-sm">
                        <span className="text-gray-700">{player}</span>
                        <button
                          onClick={() => onRemovePlayer(teamIndex, playerIndex)}
                          className="text-red-500 hover:text-red-700 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {(!team.players || team.players.length === 0) && (
                  <p className="text-xs text-gray-500 italic">{t('noPlayersAdded', language)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {teams.length >= 2 && (
        <div className="text-center">
          <button
            onClick={onStartGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
          >
            {t('startGame', language)}
          </button>
        </div>
      )}

      {teams.length < 2 && teams.length > 0 && (
        <p className="text-center text-gray-500">{t('addAtLeast2Teams', language)}</p>
      )}
    </div>
  )
}
