import { t } from '../translations.js'

export default function GameSettings({ settings, language, onSettingsChange, onLanguageChange, onClose }) {
  return (
    <div className="fixed top-4 right-4 bg-white rounded-2xl shadow-2xl w-80 p-6 z-50 border-2 border-indigo-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-indigo-900">{t('settings', language)}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          aria-label={t('closeSettings', language)}
        >
          ×
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-sm text-gray-800 mb-2">{t('language', language)}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                language === 'en'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('english', language)}
            </button>
            <button
              onClick={() => onLanguageChange('nl')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                language === 'nl'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('nederlands', language)}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex-1 mr-3">
            <h3 className="font-semibold text-sm text-gray-800">{t('timerTick', language)}</h3>
            <p className="text-xs text-gray-600">{t('tickSoundDescription', language)}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={settings.timerTickEnabled}
              onChange={(e) => onSettingsChange({ ...settings, timerTickEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
          <div className="flex-1 mr-3">
            <h3 className="font-semibold text-sm text-gray-800">{t('buzzer', language)}</h3>
            <p className="text-xs text-gray-600">{t('buzzerDescription', language)}</p>
          </div>
          <label className="relative inline-flex items-center cursor-not-allowed flex-shrink-0">
            <input
              type="checkbox"
              checked={true}
              disabled={true}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:translate-x-full after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5"></div>
          </label>
        </div>
      </div>
    </div>
  )
}
