import { t } from '../translations.js'

export default function RoundPlaying({ currentTeam, currentPlayer, timeLeft, words, language }) {
  return (
    <div className="text-center">
      <div className="mb-3 md:mb-6">
        <h2 className="text-sm md:text-xl font-bold text-indigo-900 mb-1 md:mb-2">
          {currentTeam?.name}'s Turn
        </h2>
        {currentPlayer && (
          <h3 className="text-xs md:text-lg font-semibold text-indigo-700 mb-1 md:mb-2">
            {currentPlayer}
          </h3>
        )}
        <div className="text-4xl md:text-6xl font-bold text-indigo-600 mb-1 md:mb-2">
          {timeLeft}
        </div>
        <div className="text-xs md:text-sm text-gray-500">{t('secondsRemaining', language)}</div>
      </div>

      <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
        {words.map((word, index) => (
          <div
            key={index}
            className="bg-indigo-50 rounded-xl p-3 md:p-6 flex items-center justify-center"
          >
            <h3 className="text-lg md:text-2xl font-bold text-indigo-900 text-center break-words">
              {word}
            </h3>
          </div>
        ))}
      </div>

      <p className="text-xs md:text-sm text-gray-500">
        {t('describeWords', language)}
      </p>
    </div>
  )
}
