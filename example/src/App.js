import React, { useState } from 'react'

import { Survezy } from 'survezy_widget'
import 'survezy_widget/dist/index.css'

const App = () => {
  const demoSurvey2 = {
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
        options: [
          "GOOD 2", "FINE 2", "BAD 2"
        ],
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

  const [survey, setSurvey] = useState(demoSurvey)

  return (
    <div>
      <button onClick={() => setSurvey(demoSurvey2)}>
        Set Survey
      </button>
      <Survezy demoSurvey={survey} />
    </div>
  )
}

export default App
