import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// Import containers here.
import Home from '../Home/index'

const Routes = () => (
  <Router>
    <Route path="/" component={Home} />
  </Router>
)

export default Routes
