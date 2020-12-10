import React from 'react'

function ResultsTable(props) {
  const { names, score } = props

  return (
    <div>
      <ul className='collection'>
        {names.map((name, index) => (
          <li key={index} className='collection-item'>
            {name}: {score[index]}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsTable
