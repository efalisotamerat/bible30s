import { useState, useEffect, useRef } from 'react'
import { biblicalWords, getWordsInLanguage } from './words.js'
import { t } from './translations.js'
import TeamSetup from './components/TeamSetup.jsx'
import RoundReady from './components/RoundReady.jsx'
import RoundPlaying from './components/RoundPlaying.jsx'
import RoundSelection from './components/RoundSelection.jsx'
import RoundComplete from './components/RoundComplete.jsx'
import GameOver from './components/GameOver.jsx'
import GameSettings from './components/GameSettings.jsx'
import tickSound from './assets/timertick.mp3'
import buzzerSound from './assets/buzzer.mp3'

function App() {
  // Load from localStorage on mount
  const loadFromStorage = () => {
    try {
      const savedBlacklisted = localStorage.getItem('bible30s_blacklistedWords')
      const savedTeams = localStorage.getItem('bible30s_teams')
      const savedTeamIndex = localStorage.getItem('bible30s_currentTeamIndex')
      const savedGameState = localStorage.getItem('bible30s_gameState')
      const savedSettings = localStorage.getItem('bible30s_settings')

      const savedPlayerIndex = localStorage.getItem('bible30s_currentPlayerIndex')
      const defaultTeams = [
        { name: 'Team A', score: 0, players: [] },
        { name: 'Team B', score: 0, players: [] }
      ]

      let parsedTeams = []
      if (savedTeams) {
        parsedTeams = JSON.parse(savedTeams)
      }
      // Use default teams if no teams exist or if teams array is empty
      const teamsToUse = (parsedTeams.length > 0) ? parsedTeams : defaultTeams

      return {
        blacklistedWords: savedBlacklisted ? JSON.parse(savedBlacklisted) : [],
        teams: teamsToUse,
        currentTeamIndex: savedTeamIndex ? parseInt(savedTeamIndex, 10) : 0,
        currentPlayerIndex: savedPlayerIndex ? parseInt(savedPlayerIndex, 10) : 0,
        gameState: savedGameState || 'setup',
        settings: savedSettings ? JSON.parse(savedSettings) : {
          timerTickEnabled: false,
          buzzerEnabled: true
        },
        language: savedLanguage || 'en'
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      const defaultTeams = [
        { name: 'Team A', score: 0, players: [] },
        { name: 'Team B', score: 0, players: [] }
      ]

      return {
        blacklistedWords: [],
        teams: defaultTeams,
        currentTeamIndex: 0,
        currentPlayerIndex: 0,
        gameState: 'setup',
        settings: {
          timerTickEnabled: false,
          buzzerEnabled: true
        },
        language: 'en'
      }
    }
  }

  const initialData = loadFromStorage()

  const [gameState, setGameState] = useState(initialData.gameState)
  const [teams, setTeams] = useState(initialData.teams)
  const [teamNameInput, setTeamNameInput] = useState('')
  const [currentTeamIndex, setCurrentTeamIndex] = useState(initialData.currentTeamIndex)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(initialData.currentPlayerIndex)
  const [timeLeft, setTimeLeft] = useState(30)
  const [totalTime, setTotalTime] = useState(30)
  const [currentRoundWords, setCurrentRoundWords] = useState([])
  const [blacklistedWords, setBlacklistedWords] = useState(initialData.blacklistedWords)
  const [selectedCorrectWords, setSelectedCorrectWords] = useState([])
  const [settings, setSettings] = useState(initialData.settings)
  const [language, setLanguage] = useState(initialData.language)
  const [showSettings, setShowSettings] = useState(false)
  const timerRef = useRef(null)
  const tickAudioRef = useRef(null)
  const buzzerAudioRef = useRef(null)

  const clearLocalStorage = () => {
    localStorage.removeItem('bible30s_blacklistedWords')
    localStorage.removeItem('bible30s_teams')
    localStorage.removeItem('bible30s_currentTeamIndex')
    localStorage.removeItem('bible30s_gameState')
  }

  // Initialize audio elements
  useEffect(() => {
    tickAudioRef.current = new Audio(tickSound)
    tickAudioRef.current.volume = 0.5
    tickAudioRef.current.loop = true
    buzzerAudioRef.current = new Audio(buzzerSound)
    buzzerAudioRef.current.volume = 0.7
    buzzerAudioRef.current.loop = true

    return () => {
      if (tickAudioRef.current) {
        tickAudioRef.current.pause()
        tickAudioRef.current = null
      }
      if (buzzerAudioRef.current) {
        buzzerAudioRef.current.pause()
        buzzerAudioRef.current = null
      }
    }
  }, [])

  const stopTickSound = () => {
    if (tickAudioRef.current) {
      try {
        tickAudioRef.current.pause()
        tickAudioRef.current.currentTime = 0
      } catch (error) {
        console.error('Error stopping tick sound:', error)
      }
    }
  }

  const stopBuzzerSound = () => {
    if (buzzerAudioRef.current) {
      try {
        buzzerAudioRef.current.pause()
        buzzerAudioRef.current.currentTime = 0
      } catch (error) {
        console.error('Error stopping buzzer sound:', error)
      }
    }
  }

  const playTickSound = () => {
    if (!settings.timerTickEnabled) return
    
    if (tickAudioRef.current) {
      try {
        tickAudioRef.current.playbackRate = 1.0
        if (tickAudioRef.current.paused) {
          tickAudioRef.current.play().catch(error => {
            console.error('Error playing tick sound:', error)
          })
        }
      } catch (error) {
        console.error('Error playing tick sound:', error)
      }
    }
  }

  const playBuzzerSound = () => {
    if (!settings.buzzerEnabled) return
    
    // Stop tick sound when buzzer starts
    stopTickSound()
    
    if (buzzerAudioRef.current) {
      try {
        buzzerAudioRef.current.currentTime = 0
        buzzerAudioRef.current.play().catch(error => {
          console.error('Error playing buzzer sound:', error)
        })
      } catch (error) {
        console.error('Error playing buzzer sound:', error)
      }
    }
  }

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('bible30s_settings', JSON.stringify(newSettings))
  }

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('bible30s_language', newLanguage)
    // Reset blacklisted words when language changes since they're language-specific
    setBlacklistedWords([])
    localStorage.removeItem('bible30s_blacklistedWords')
  }

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const getAvailableWords = () => {
    const wordsInLanguage = getWordsInLanguage(biblicalWords, language)
    // Filter out blacklisted words (blacklist contains words in current language)
    return wordsInLanguage.filter(word => !blacklistedWords.includes(word))
  }

  const addTeam = () => {
    if (teamNameInput.trim()) {
      const newTeams = [...teams, { name: teamNameInput.trim(), score: 0, players: [] }]
      setTeams(newTeams)
      localStorage.setItem('bible30s_teams', JSON.stringify(newTeams))
      setTeamNameInput('')
    }
  }

  const addPlayerToTeam = (teamIndex, playerName) => {
    if (!playerName.trim()) return
    const updatedTeams = [...teams]
    if (!updatedTeams[teamIndex].players) {
      updatedTeams[teamIndex].players = []
    }
    updatedTeams[teamIndex].players.push(playerName.trim())
    setTeams(updatedTeams)
    localStorage.setItem('bible30s_teams', JSON.stringify(updatedTeams))
  }

  const removePlayerFromTeam = (teamIndex, playerIndex) => {
    const updatedTeams = [...teams]
    updatedTeams[teamIndex].players.splice(playerIndex, 1)
    setTeams(updatedTeams)
    localStorage.setItem('bible30s_teams', JSON.stringify(updatedTeams))
  }

  const updateTeamName = (teamIndex, newName) => {
    if (!newName.trim()) return
    const updatedTeams = [...teams]
    updatedTeams[teamIndex].name = newName.trim()
    setTeams(updatedTeams)
    localStorage.setItem('bible30s_teams', JSON.stringify(updatedTeams))
  }

  const removeTeam = (index) => {
    const newTeams = teams.filter((_, i) => i !== index)
    setTeams(newTeams)
    localStorage.setItem('bible30s_teams', JSON.stringify(newTeams))
  }

  const startRound = () => {
    if (teams.length === 0) return
    
    const available = getAvailableWords()
    if (available.length < 5) {
      // Game over - no more words available
      clearLocalStorage()
      setGameState('gameOver')
      return
    }

    const shuffled = shuffleArray(available)
    const roundWords = shuffled.slice(0, 5)
    setCurrentRoundWords(roundWords)
    setSelectedCorrectWords([])
    const initialTime = 15
    setTimeLeft(initialTime)
    setTotalTime(initialTime)
    setGameState('playing')
    localStorage.setItem('bible30s_gameState', 'playing')

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1

        if (newTime <= 0) {
          clearInterval(timerRef.current)
          stopTickSound() // Stop tick sound when timer is up
          playBuzzerSound()
          setGameState('selecting')
          localStorage.setItem('bible30s_gameState', 'selecting')
          return 0
        }

        // Start playing tick sound only in the last 10 seconds
        if (newTime <= 10) {
          playTickSound()
        }
        
        return newTime
      })
    }, 1000)
  }

  const handleStartGame = () => {
    setCurrentTeamIndex(0)
    setCurrentPlayerIndex(0)
    setGameState('ready')
    localStorage.setItem('bible30s_currentTeamIndex', '0')
    localStorage.setItem('bible30s_currentPlayerIndex', '0')
    localStorage.setItem('bible30s_gameState', 'ready')
  }

  const toggleWordSelection = (word) => {
    // Stop buzzer when user starts interacting
    stopBuzzerSound()
    setSelectedCorrectWords(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    )
  }

  const submitRound = () => {
    // Stop buzzer sound
    stopBuzzerSound()
    
    const correctCount = selectedCorrectWords.length
    const updatedTeams = [...teams]
    updatedTeams[currentTeamIndex].score += correctCount
    
    // Add round words to blacklist (store in current language)
    const newBlacklistedWords = [...blacklistedWords, ...currentRoundWords]
    setBlacklistedWords(newBlacklistedWords)
    localStorage.setItem('bible30s_blacklistedWords', JSON.stringify(newBlacklistedWords))
    
    setTeams(updatedTeams)
    localStorage.setItem('bible30s_teams', JSON.stringify(updatedTeams))
    
    // Automatically move to next team (always rotate teams, not players within same team)
    const nextTeamIndex = (currentTeamIndex + 1) % updatedTeams.length
    const nextTeam = updatedTeams[nextTeamIndex]
    const nextTeamPlayers = nextTeam?.players || []
    
    // Check if we've completed a full round (all teams have played)
    // If we're back to the first team, move to next player index
    let nextPlayerIndex = currentPlayerIndex
    if (nextTeamIndex === 0) {
      // All teams have had a turn, check if we should move to next player
      const maxPlayers = Math.max(...updatedTeams.map(team => (team.players || []).length), 0)
      if (currentPlayerIndex < maxPlayers - 1) {
        nextPlayerIndex = currentPlayerIndex + 1
      } else {
        // All players have played, reset to first player
        nextPlayerIndex = 0
      }
    }
    
    // Ensure the next team has enough players for this index
    // If not, use the last available player or 0
    if (nextTeamPlayers.length > 0 && nextPlayerIndex >= nextTeamPlayers.length) {
      nextPlayerIndex = nextTeamPlayers.length - 1
    } else if (nextTeamPlayers.length === 0) {
      nextPlayerIndex = 0
    }
    
    setCurrentTeamIndex(nextTeamIndex)
    setCurrentPlayerIndex(nextPlayerIndex)
    localStorage.setItem('bible30s_currentTeamIndex', nextTeamIndex.toString())
    localStorage.setItem('bible30s_currentPlayerIndex', nextPlayerIndex.toString())
    
    setGameState('ready')
    localStorage.setItem('bible30s_gameState', 'ready')
  }

  const nextTeam = () => {
    // Always move to next team (teams alternate, not players within same team)
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length
    const nextTeam = teams[nextTeamIndex]
    const nextTeamPlayers = nextTeam?.players || []
    
    // Check if we've completed a full round (all teams have played)
    // If we're back to the first team, move to next player index
    let nextPlayerIndex = currentPlayerIndex
    if (nextTeamIndex === 0) {
      // All teams have had a turn, check if we should move to next player
      const maxPlayers = Math.max(...teams.map(team => (team.players || []).length), 0)
      if (currentPlayerIndex < maxPlayers - 1) {
        nextPlayerIndex = currentPlayerIndex + 1
      } else {
        // All players have played, reset to first player
        nextPlayerIndex = 0
      }
    }
    
    // Ensure the next team has enough players for this index
    // If not, use the last available player or 0
    if (nextTeamPlayers.length > 0 && nextPlayerIndex >= nextTeamPlayers.length) {
      nextPlayerIndex = nextTeamPlayers.length - 1
    } else if (nextTeamPlayers.length === 0) {
      nextPlayerIndex = 0
    }
    
    setCurrentTeamIndex(nextTeamIndex)
    setCurrentPlayerIndex(nextPlayerIndex)
    localStorage.setItem('bible30s_currentTeamIndex', nextTeamIndex.toString())
    localStorage.setItem('bible30s_currentPlayerIndex', nextPlayerIndex.toString())
    
    setGameState('ready')
    localStorage.setItem('bible30s_gameState', 'ready')
  }

  const resetGame = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })))
    setBlacklistedWords([])
    setCurrentTeamIndex(0)
    setCurrentPlayerIndex(0)
    setGameState('setup')
    clearLocalStorage()
  }

  const handleNewGame = () => {
    setTeams([])
    setBlacklistedWords([])
    setCurrentTeamIndex(0)
    setCurrentPlayerIndex(0)
    setGameState('setup')
    clearLocalStorage()
  }

  const endGame = () => {
    clearLocalStorage()
    setGameState('gameOver')
  }

  // Save to localStorage whenever blacklistedWords changes
  useEffect(() => {
    if (blacklistedWords.length > 0) {
      localStorage.setItem('bible30s_blacklistedWords', JSON.stringify(blacklistedWords))
    }
  }, [blacklistedWords])

  // Save to localStorage whenever teams changes
  useEffect(() => {
    if (teams.length > 0) {
      localStorage.setItem('bible30s_teams', JSON.stringify(teams))
    }
  }, [teams])

  // Save to localStorage whenever currentTeamIndex changes
  useEffect(() => {
    localStorage.setItem('bible30s_currentTeamIndex', currentTeamIndex.toString())
  }, [currentTeamIndex])

  // Save to localStorage whenever currentPlayerIndex changes
  useEffect(() => {
    localStorage.setItem('bible30s_currentPlayerIndex', currentPlayerIndex.toString())
  }, [currentPlayerIndex])

  // Save to localStorage whenever gameState changes
  useEffect(() => {
    localStorage.setItem('bible30s_gameState', gameState)
  }, [gameState])

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('bible30s_language', language)
  }, [language])

  // Cleanup timer and audio on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      stopBuzzerSound()
      stopTickSound()
    }
  }, [])

  const currentTeam = teams[currentTeamIndex]
  const currentPlayer = currentTeam?.players?.[currentPlayerIndex] || null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Floating Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed top-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-40 transition-colors"
        aria-label="Settings"
        title="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          {t('appTitle', language)}
        </h1>

        {gameState === 'setup' && (
          <TeamSetup
            teams={teams}
            teamNameInput={teamNameInput}
            setTeamNameInput={setTeamNameInput}
            onAddTeam={addTeam}
            onRemoveTeam={removeTeam}
            onAddPlayer={addPlayerToTeam}
            onRemovePlayer={removePlayerFromTeam}
            onUpdateTeamName={updateTeamName}
            onStartGame={handleStartGame}
            language={language}
          />
        )}

        {gameState === 'ready' && (
          <RoundReady
            currentTeam={currentTeam}
            currentPlayer={currentPlayer}
            teams={teams}
            currentTeamIndex={currentTeamIndex}
            onStartRound={startRound}
            onEndGame={endGame}
            language={language}
          />
        )}

        {gameState === 'playing' && (
          <RoundPlaying
            currentTeam={currentTeam}
            currentPlayer={currentPlayer}
            timeLeft={timeLeft}
            words={currentRoundWords}
            language={language}
          />
        )}

        {gameState === 'selecting' && (
          <RoundSelection
            currentTeam={currentTeam}
            currentPlayer={currentPlayer}
            words={currentRoundWords}
            selectedWords={selectedCorrectWords}
            onToggleWord={toggleWordSelection}
            onSubmit={submitRound}
            language={language}
          />
        )}

        {gameState === 'roundComplete' && (
          <RoundComplete
            currentTeam={currentTeam}
            currentPlayer={currentPlayer}
            points={selectedCorrectWords.length}
            teams={teams}
            currentTeamIndex={currentTeamIndex}
            onNextTeam={nextTeam}
            onResetGame={resetGame}
            onEndGame={endGame}
            language={language}
          />
        )}

        {gameState === 'gameOver' && (
          <GameOver
            teams={teams}
            onNewGame={handleNewGame}
            language={language}
          />
        )}

        {showSettings && (
          <GameSettings
            settings={settings}
            language={language}
            onSettingsChange={handleSettingsChange}
            onLanguageChange={handleLanguageChange}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App
