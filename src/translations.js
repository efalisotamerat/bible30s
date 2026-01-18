export const translations = {
  en: {
    // App
    appTitle: 'Bible 30 Seconds',
    
    // Team Setup
    createTeams: 'Create Teams',
    enterTeamName: 'Enter team name',
    teams: 'Teams:',
    addPlayerName: 'Add player name',
    noPlayersAdded: 'No players added yet',
    edit: 'Edit',
    remove: 'Remove',
    save: 'Save',
    cancel: 'Cancel',
    startGame: 'Start Game',
    addAtLeast2Teams: 'Add at least 2 teams to start',
    
    // Round Ready
    turn: 'Turn',
    getReady: 'Get ready to describe 5 words in 30 seconds!',
    startRound: 'Start Round',
    endGame: 'End Game',
    
    // Round Playing
    secondsRemaining: 'seconds remaining',
    describeWords: 'Describe all 5 words to your team. After 30 seconds, select which ones they guessed correctly.',
    
    // Round Selection
    timesUp: 'Time\'s Up!',
    selectCorrectWords: 'Select which words {teamName} guessed correctly:',
    wordsSelected: 'words selected',
    submitRound: 'Submit Round',
    
    // Round Complete
    roundComplete: 'Round Complete!',
    pointsFor: 'points for',
    nextTeam: 'Next Team',
    resetGame: 'Reset Game',
    
    // Game Over
    gameOver: 'Game Over!',
    allWordsUsed: 'All words have been used.',
    winner: 'Winner!',
    itsATie: 'It\'s a Tie!',
    points: 'points',
    newGame: 'New Game',
    
    // Scoreboard
    scores: 'Scores:',
    pts: 'pts',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    english: 'English',
    nederlands: 'Nederlands',
    timerTick: 'Ticker',
    tickSoundDescription: 'Tick sound for the last 10 seconds',
    buzzer: 'Buzzer',
    buzzerDescription: 'Sound when time runs out (always enabled)',
    closeSettings: 'Close settings'
  },
  nl: {
    // App
    appTitle: 'Bijbel 30 Seconds',
    
    // Team Setup
    createTeams: 'Maak Teams',
    enterTeamName: 'Voer teamnaam in',
    teams: 'Teams:',
    addPlayerName: 'Speler toevoegen',
    noPlayersAdded: 'Nog geen spelers toegevoegd',
    edit: 'Wijzigen',
    remove: 'Verwijderen',
    save: 'Opslaan',
    cancel: 'Annuleren',
    startGame: 'Start spel',
    addAtLeast2Teams: 'Voeg minimaal 2 teams toe om te beginnen',
    
    // Round Ready
    turn: 'Beurt',
    getReady: 'Ben je klaar?',
    startRound: 'Start ronde',
    endGame: 'Eindig spel',
    
    // Round Playing
    secondsRemaining: 'seconden over',
    describeWords: 'Beschrijf alle 5 woorden aan je team. Na 30 seconden, selecteer welke ze correct hebben geraden.',
    
    // Round Selection
    timesUp: 'Tijd is Om!',
    selectCorrectWords: 'Selecteer welke woorden {teamName} correct heeft geraden:',
    wordsSelected: 'woorden geselecteerd',
    submitRound: 'Indienen',
    
    // Round Complete
    roundComplete: 'Ronde Voltooid!',
    pointsFor: 'punten voor',
    nextTeam: 'Volgende team',
    resetGame: 'Reset spel',
    
    // Game Over
    gameOver: 'Spel Afgelopen!',
    allWordsUsed: 'Alle woorden zijn gebruikt.',
    winner: 'Winnaar!',
    itsATie: 'Het is gelijk!',
    points: 'punten',
    newGame: 'Nieuw spel',
    
    // Scoreboard
    scores: 'Score:',
    pts: 'ptn',
    
    // Settings
    settings: 'Instellingen',
    language: 'Taal',
    english: 'English',
    nederlands: 'Nederlands',
    timerTick: 'Ticker',
    tickSoundDescription: 'Ticker geluid voor de laatste 10 seconden',
    buzzer: 'Buzzer',
    buzzerDescription: 'Geluid wanneer de tijd om is (altijd ingeschakeld)',
    closeSettings: 'Sluit instellingen'
  }
}

// Helper function to get translation with optional interpolation
export const t = (key, language = 'en', params = {}) => {
  const translation = translations[language]?.[key] || translations.en[key] || key
  // Simple interpolation for {paramName} placeholders
  return translation.replace(/\{(\w+)\}/g, (match, paramName) => {
    return params[paramName] || match
  })
}
