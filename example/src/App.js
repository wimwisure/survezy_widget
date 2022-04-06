import React from 'react'

import { Survezy } from 'survezy_widget'
import 'survezy_widget/dist/index.css'

const App = () => {
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

  return <Survezy eventId="c2F1cmF2QHdpbXdpc3VyZS5jb20gc3VydmV6eQ==" />
}

export default App
