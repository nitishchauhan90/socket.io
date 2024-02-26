import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from  '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render( //strict mode me do bar run hota hai jisse console me do bar data aata hai
  <>    
    <CssBaseline/>
    <App />
  </>,
)
