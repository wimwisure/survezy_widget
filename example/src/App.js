import React from 'react'

import { Survezy } from 'survezy_widget'
import 'survezy_widget/dist/index.css'

const App = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {[...Array(100).keys()].map((i) => (<br key={i} />))}
      <Survezy link={"c2F1cmF2QHdpbXdpc3VyZS5jb20gRXhhbXBsZSBDb250YWluZXI="} />
    </div>
  )
}

export default App
