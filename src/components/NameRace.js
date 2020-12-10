import React, { useState } from 'react'
import '../App.css'
import Sisend from './Sisend'
import ResultsTable from './ResultsTable'
import Alert from './Alert'
import Statistika from './Statistika'

function NameRace() {
  const [display, setDisplay] = useState({
    sisendForm: true,
    pickWinnerBtn: false,
    vooruVoitja: false,
    resultsTable: false,
    manguVoitja: false,
    mangiUuestiBtn: false,
    statistika: false
  })

  const [names, setNames] = useState([])
  const [score, setScore] = useState([])
  const [vooruVoitja, setVooruVoitja] = useState('')
  const [punktini, setPunktini] = useState(0)
  const [manguVoitja, setManguVoitja] = useState('')
  const [pickWinnerBtnDisabled, setPickWinnerBtnDisabled] = useState(false)
  const [lopetaMangBtnDisabled, setLopetaMangBtnDisabled] = useState(false)
  const [alertNimed, setAlertNimed] = useState('')
  const [stats, setStats] = useState([])

  const andmedSisse = ({ arrNames, punktini }) => {
    const punktidNum = +punktini
    let summad = new Array(arrNames.length + 1).join('0').split('').map(parseFloat)
    setScore([...summad])
    setNames([...arrNames])
    setPunktini(punktidNum)
    setStats([...summad])
    setDisplay({
      ...display,
      sisendForm: false,
      pickWinnerBtn: true,
      vooruVoitja: false,
      resultsTable: false,
      manguVoitja: false,
      mangiUuestiBtn: false,
      statistika: false
    })
  }

  const pickWinner = () => {
    const randNum = Math.floor(Math.random() * names.length + 1) - 1
    const voitja = names[randNum]
    const copyScore = [...score]
    copyScore[randNum] += 1
    // Kui max skoor on võrdne punktini mängitava skooriga, siis on meil olemas võitja
    let winnerGame
    if (Math.max(...copyScore) === punktini) {
      setPickWinnerBtnDisabled(true)
      let i = copyScore.indexOf(Math.max(...copyScore))
      winnerGame = names[i]

      // Lisa võit võitja statistikasse
      const statNow = [...stats]
      statNow[i] += 1
      setStats([...statNow])
    }

    setDisplay({
      ...display,
      sisendForm: false,
      pickWinnerBtn: manguVoitja ? false : true,
      vooruVoitja: true,
      resultsTable: true,
      manguVoitja: winnerGame ? true : false,
      mangiUuestiBtn: winnerGame ? true : false,
      statistika: false
    })
    setScore(copyScore)
    setVooruVoitja(voitja)
    setManguVoitja(winnerGame)
  }

  const sisestaUuedMangijad = () => {
    setStats([])
    setManguVoitja('')
    setPickWinnerBtnDisabled(false)
    setLopetaMangBtnDisabled(false)
    setDisplay({
      ...display,
      sisendForm: true,
      pickWinnerBtn: false,
      vooruVoitja: false,
      resultsTable: false,
      manguVoitja: false,
      mangiUuestiBtn: false,
      statistika: false
    })
  }

  const mangiUuesti = () => {
    setManguVoitja('')
    setVooruVoitja('')
    setPickWinnerBtnDisabled(false)
    setLopetaMangBtnDisabled(false)
    let summad = new Array(names.length + 1).join('0').split('').map(parseFloat)
    setScore(summad)
    setDisplay({
      ...display,
      sisendForm: false,
      pickWinnerBtn: true,
      vooruVoitja: false,
      resultsTable: false,
      manguVoitja: false,
      mangiUuestiBtn: false,
      statistika: false
    })
  }

  const vaataStatistikat = () => {
    setDisplay({
      ...display,
      sisendForm: false,
      pickWinnerBtn: false,
      vooruVoitja: false,
      resultsTable: false,
      manguVoitja: false,
      mangiUuestiBtn: false,
      statistika: true
    })
  }

  const setAlertNimedHandler = msg => {
    setAlertNimed(msg)
    setTimeout(() => {
      setAlertNimed('')
    }, 4000)
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <div className='card white darken-3'>
          <div className='card-content'>
            {alertNimed !== '' && <Alert msg={alertNimed} />}
            {display.sisendForm && <Sisend andmedSisse={andmedSisse} setAlert={setAlertNimedHandler} />}
            {display.pickWinnerBtn && (
              <div>
                <button
                  disabled={pickWinnerBtnDisabled}
                  className='btn waves-effect waves-light green'
                  onClick={pickWinner}
                >
                  Vali võitja
                </button>

                <button
                  disabled={lopetaMangBtnDisabled}
                  className='btn waves-effect waves-light red white-text right'
                  onClick={sisestaUuedMangijad}
                >
                  X
                </button>
              </div>
            )}
            {display.vooruVoitja && <h5>Vooru võitja: {vooruVoitja}</h5>}
            {display.resultsTable && <ResultsTable score={score} names={names} />}
            {display.manguVoitja && (
              <h5>
                Võitis <span style={{ color: 'red', fontSize: '30px' }}>{manguVoitja.toUpperCase()}</span>
              </h5>
            )}
            {display.mangiUuestiBtn && (
              <div>
                <button className='btn waves-effect waves-light green btn-margin' onClick={mangiUuesti}>
                  Mängi uuesti
                </button>
                <button className='btn waves-effect waves-light purple btn-margin' onClick={sisestaUuedMangijad}>
                  Sisesta uued mängijad
                </button>
                <button className='btn waves-effect waves-light orange btn-margin' onClick={vaataStatistikat}>
                  Statistika
                </button>
              </div>
            )}
            {display.statistika && (
              <Statistika
                stats={stats}
                names={names}
                mangiUuesti={mangiUuesti}
                sisestaUuedMangijad={sisestaUuedMangijad}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameRace
