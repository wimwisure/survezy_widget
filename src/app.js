import React from 'react'
import ReactDOM from 'react-dom'
import { Survezy } from './index'

export const Show = (link, darkMode) => {
  // eslint-disable-next-line no-unused-expressions
  document.getElementById('survezy_container')?.remove()
  const div = document.createElement('div')
  div.setAttribute('id', 'survezy_container')

  document.body.appendChild(div)

  ReactDOM.render(
    <React.StrictMode>
      <Survezy link={link} darkMode={darkMode} />
    </React.StrictMode>,
    div
  )
}
