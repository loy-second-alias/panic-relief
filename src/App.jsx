import { useState } from 'react'
import './App.css'
import StarConstellation from './components/StarConstellation'
import AffirmationDisplay from './components/AffirmationDisplay'

import BreathButton from './components/BreathButton'
import BreathingMode from './components/BreathingMode'

function App() {
  const [mode, setMode] = useState('default') // 'default' | 'breathing'

  return (
    <div className={`app-container mode-${mode}`}>
      {/* Always render stars in background */}
      <StarConstellation />

      {mode === 'default' ? (
        <>
          <AffirmationDisplay />
          <BreathButton onStart={() => setMode('breathing')} />
        </>
      ) : (
        <BreathingMode onExit={() => setMode('default')} />
      )}
    </div>
  )
}

export default App
