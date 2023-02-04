import { useState } from 'react'
import './App.css'
import TimeTrack from './components/TimeTrack'

function App() {

  return (
    <div className="App">
      <h1>Root Craft</h1>
      <TimeTrack time={2}/>
    </div>
  )
}

export default App
