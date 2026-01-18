import { t } from '../translations.js'

export default function RoundSelection({ currentTeam, currentPlayer, words, selectedWords, onToggleWord, onSubmit, language }) {
  return (
    <div>
      <div className="text-center mb-3 md:mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-indigo-900 mb-1 md:mb-2">{t('timesUp', language)}</h2>
        {currentPlayer && (
          <h3 className="text-lg md:text-xl font-semibold text-indigo-700 mb-1 md:mb-2">
            {currentPlayer}
          </h3>
        )}
        <p className="text-sm md:text-base text-gray-600">{t('selectCorrectWords', language, { teamName: currentTeam?.name })}</p>
      </div>

      <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
        {words.map((word, index) => {
          const isSelected = selectedWords.includes(word)
          return (
            <button
              key={index}
              onClick={() => onToggleWord(word)}
              className={`relative w-full rounded-xl p-3 md:p-6 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <h3 className="text-lg md:text-2xl font-bold text-center break-words">
                {word}
              </h3>
              {isSelected && (
                <span className="absolute top-2 right-2 md:top-3 md:right-3 text-xl md:text-3xl">✓</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="text-center mb-4 md:mb-6">
        <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1 md:mb-2">
          {selectedWords.length} / 5
        </div>
        <div className="text-sm md:text-base text-gray-600">{t('wordsSelected', language)}</div>
      </div>

      <div className="text-center">
        <button
          onClick={onSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-lg md:text-xl transition-colors shadow-lg"
        >
          {t('submitRound', language)}
        </button>
      </div>
    </div>
  )
}
