import Scoreboard from './Scoreboard.jsx'
import { t } from '../translations.js'

export default function RoundReady({ currentTeam, currentPlayer, teams, currentTeamIndex, onStartRound, onEndGame, language }) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-indigo-900 mb-2">
          {currentTeam?.name} {t('turn', language)}
        </h2>
        {currentPlayer && (
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            {currentPlayer}
          </h3>
        )}
        <p className="text-gray-600">{t('getReady', language)}</p>
      </div>

      <Scoreboard teams={teams} currentTeamIndex={currentTeamIndex} language={language} />

      <div className="flex gap-4 justify-center">
        <button
          onClick={onStartRound}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          {t('startRound', language)}
        </button>
        <button
          onClick={onEndGame}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          {t('endGame', language)}
        </button>
      </div>
    </div>
  )
}
