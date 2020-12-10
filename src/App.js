import { useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css'
import NameRace from './components/NameRace'

function App() {
  useEffect(() => {
    M.AutoInit()
  })
  return (
    <div className='App'>
      <NameRace />
    </div>
  )
}

export default App
