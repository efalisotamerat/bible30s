import { useState, useEffect, useRef } from 'react'
import { biblicalWords } from './words.js'
import TeamSetup from './components/TeamSetup.jsx'
import RoundReady from './components/RoundReady.jsx'
import RoundPlaying from './components/RoundPlaying.jsx'
import RoundSelection from './components/RoundSelection.jsx'
import RoundComplete from './components/RoundComplete.jsx'
import GameOver from './components/GameOver.jsx'

function App() {
  // Load from localStorage on mount
  const loadFromStorage = () => {
    try {
      const savedBlacklisted = localStorage.getItem('bible30s_blacklistedWords')
      const savedTeams = localStorage.getItem('bible30s_teams')
      const savedTeamIndex = localStorage.getItem('bible30s_currentTeamIndex')
      const savedGameState = localStorage.getItem('bible30s_gameState')

      return {
        blacklistedWords: savedBlacklisted ? JSON.parse(savedBlacklisted) : [],
        teams: savedTeams ? JSON.parse(savedTeams) : [],
        currentTeamIndex: savedTeamIndex ? parseInt(savedTeamIndex, 10) : 0,
        gameState: savedGameState || 'setup'
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return {
        blacklistedWords: [],
        teams: [],
        currentTeamIndex: 0,
        gameState: 'setup'
      }
    }
  }

  const initialData = loadFromStorage()

  const [gameState, setGameState] = useState(initialData.gameState)
  const [teams, setTeams] = useState(initialData.teams)
  const [teamNameInput, setTeamNameInput] = useState('')
  const [currentTeamIndex, setCurrentTeamIndex] = useState(initialData.currentTeamIndex)
  const [timeLeft, setTimeLeft] = useState(30)
  const [currentRoundWords, setCurrentRoundWords] = useState([])
  const [blacklistedWords, setBlacklistedWords] = useState(initialData.blacklistedWords)
  const [selectedCorrectWords, setSelectedCorrectWords] = useState([])
  const timerRef = useRef(null)

  const clearLocalStorage = () => {
    localStorage.removeItem('bible30s_blacklistedWords')
    localStorage.removeItem('bible30s_teams')
    localStorage.removeItem('bible30s_currentTeamIndex')
    localStorage.removeItem('bible30s_gameState')
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
    return biblicalWords.filter(word => !blacklistedWords.includes(word))
  }

  const addTeam = () => {
    if (teamNameInput.trim()) {
      const newTeams = [...teams, { name: teamNameInput.trim(), score: 0 }]
      setTeams(newTeams)
      localStorage.setItem('bible30s_teams', JSON.stringify(newTeams))
      setTeamNameInput('')
    }
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
    setTimeLeft(30)
    setGameState('playing')
    localStorage.setItem('bible30s_gameState', 'playing')

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setGameState('selecting')
          localStorage.setItem('bible30s_gameState', 'selecting')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleStartGame = () => {
    setCurrentTeamIndex(0)
    setGameState('ready')
    localStorage.setItem('bible30s_currentTeamIndex', '0')
    localStorage.setItem('bible30s_gameState', 'ready')
  }

  const toggleWordSelection = (word) => {
    setSelectedCorrectWords(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    )
  }

  const submitRound = () => {
    const correctCount = selectedCorrectWords.length
    const updatedTeams = [...teams]
    updatedTeams[currentTeamIndex].score += correctCount
    
    // Add round words to blacklist
    const newBlacklistedWords = [...blacklistedWords, ...currentRoundWords]
    setBlacklistedWords(newBlacklistedWords)
    localStorage.setItem('bible30s_blacklistedWords', JSON.stringify(newBlacklistedWords))
    
    setTeams(updatedTeams)
    localStorage.setItem('bible30s_teams', JSON.stringify(updatedTeams))
    setGameState('roundComplete')
    localStorage.setItem('bible30s_gameState', 'roundComplete')
  }

  const nextTeam = () => {
    const nextIndex = (currentTeamIndex + 1) % teams.length
    setCurrentTeamIndex(nextIndex)
    setGameState('ready')
    localStorage.setItem('bible30s_currentTeamIndex', nextIndex.toString())
    localStorage.setItem('bible30s_gameState', 'ready')
  }

  const resetGame = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })))
    setBlacklistedWords([])
    setCurrentTeamIndex(0)
    setGameState('setup')
    clearLocalStorage()
  }

  const handleNewGame = () => {
    setTeams([])
    setBlacklistedWords([])
    setCurrentTeamIndex(0)
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

  // Save to localStorage whenever gameState changes
  useEffect(() => {
    localStorage.setItem('bible30s_gameState', gameState)
  }, [gameState])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const currentTeam = teams[currentTeamIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          Bible 30 Seconds
        </h1>

        {gameState === 'setup' && (
          <TeamSetup
            teams={teams}
            teamNameInput={teamNameInput}
            setTeamNameInput={setTeamNameInput}
            onAddTeam={addTeam}
            onRemoveTeam={removeTeam}
            onStartGame={handleStartGame}
          />
        )}

        {gameState === 'ready' && (
          <RoundReady
            currentTeam={currentTeam}
            teams={teams}
            currentTeamIndex={currentTeamIndex}
            onStartRound={startRound}
            onEndGame={endGame}
          />
        )}

        {gameState === 'playing' && (
          <RoundPlaying
            currentTeam={currentTeam}
            timeLeft={timeLeft}
            words={currentRoundWords}
          />
        )}

        {gameState === 'selecting' && (
          <RoundSelection
            currentTeam={currentTeam}
            words={currentRoundWords}
            selectedWords={selectedCorrectWords}
            onToggleWord={toggleWordSelection}
            onSubmit={submitRound}
          />
        )}

        {gameState === 'roundComplete' && (
          <RoundComplete
            currentTeam={currentTeam}
            points={selectedCorrectWords.length}
            teams={teams}
            currentTeamIndex={currentTeamIndex}
            onNextTeam={nextTeam}
            onResetGame={resetGame}
            onEndGame={endGame}
          />
        )}

        {gameState === 'gameOver' && (
          <GameOver
            teams={teams}
            onNewGame={handleNewGame}
          />
        )}
      </div>
    </div>
  )
}

export default App
