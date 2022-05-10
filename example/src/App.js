import React, { useState } from 'react'

import { Survezy } from 'survezy_widget'
import 'survezy_widget/dist/index.css'

const App = () => {
  return (
    // <Survezy eventId={"c2F1cmF2QHdpbXdpc3VyZS5jb20gTmV3IEV2ZW50"} />
    <Survezy path={"8ZKN"} />
    // <Survezy demoSurvey={{
    //   questions: [
    //     {
    //       text: "Question 1",
    //       type: "SCALE",
    //       required: true
    //     }
    //   ]
    // }} />
  )
}

export default App
