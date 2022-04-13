import React from 'react'

import { Survezy } from 'survezy_widget'
import 'survezy_widget/dist/index.css'

const App = () => {

  const demoSurvey2 ={
    questions: [
      {
        id: 1649417569002,
        text: 'Rating 1',
        type: 'RATING',
        options: [],
        required: true,
      },
      {
        id: 1649417569002,
        text: 'DROPDWON 2',
        type: 'DROPDOWN',
        options: [{
          id: 1,
          value: 'a'
        }],
        required: true,
      }
    ]
  }


  const demoSurvey = {
    questions: [
      {
       text: "How's Your day going",
       type: "DROPDOWN",
       options: [
         "GOOD", "FINE", "BAD"
       ]
      },
      {
        text: "Product Review",
        type: "RATING",
        options: []
      },
       {
        text: "DROPDOWN 3",
        type: "DROPDOWN",
        options: [
          "Excellent", "FINE", "BAD"
        ]
       },

    ]
  }

  return <Survezy eventId="c2F1cmF2QHdpbXdpc3VyZS5jb20gU3VydmV6eV9VWA==" />
}

export default App
