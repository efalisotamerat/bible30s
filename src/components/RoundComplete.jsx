import Scoreboard from './Scoreboard.jsx'
import { t } from '../translations.js'

export default function RoundComplete({ currentTeam, currentPlayer, points, teams, currentTeamIndex, onNextTeam, onResetGame, onEndGame, language }) {
  return (
    <div className="text-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">{t('roundComplete', language)}</h2>
        {currentPlayer && (
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">
            {currentPlayer}
          </h3>
        )}
        <div className="text-5xl font-bold text-indigo-600 mb-2">
          {points}
        </div>
        <div className="text-gray-600">{t('pointsFor', language)} {currentTeam?.name}</div>
      </div>

      <Scoreboard teams={teams} currentTeamIndex={currentTeamIndex} language={language} />

      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={onNextTeam}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          {t('nextTeam', language)}
        </button>
        <button
          onClick={onEndGame}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          {t('endGame', language)}
        </button>
        <button
          onClick={onResetGame}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg"
        >
          {t('resetGame', language)}
        </button>
      </div>
    </div>
  )
}
