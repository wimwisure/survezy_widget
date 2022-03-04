import React from 'react'
import ReactDOM from 'react-dom'
import { Survezy } from './index'

export const init = (link) => {
  ReactDOM.render(
    <React.StrictMode>
      <Survezy key={Math.floor(Math.random() * 10000)} link={link} />
    </React.StrictMode>,
    document.getElementById('survezy')
  )
}
