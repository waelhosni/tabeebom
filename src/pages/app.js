import React from "react"


import Home from './';
import DoctorDetail from './DoctorDetail';
// import Doctors from './Doctors';
import { withPrefix } from "gatsby"

import { Router } from "@reach/router"


const App = () => (

      <Router basepath="/app">

        <Home path={withPrefix("/")} component={Home} />
        {/* <Doctors path={withPrefix("/doctors")} component={Doctors} /> */}
        <DoctorDetail path={withPrefix("/DoctorDetail/:id")} component={DoctorDetail} />
        <Home path="/" />
      </Router>

   
  
)
export default App
