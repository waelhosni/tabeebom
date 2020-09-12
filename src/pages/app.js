import React from "react"


import Home from './';
import DoctorDetail from './DoctorDetail';
import TestProps from './TestProps';
// import Doctors from './Doctors';
import { withPrefix } from "gatsby"

import { Router } from "@reach/router"


const App = () => (

      <Router basepath="/app">

        <Home path={withPrefix("/")} component={Home} />
        {/* <Doctors path={withPrefix("/doctors")} component={Doctors} /> */}
        <DoctorDetail path={withPrefix("/DoctorDetail/:id")} component={DoctorDetail} />
        <TestProps path={withPrefix("/TestProps/:id")} component={TestProps} />
        <Home path="/" />
      </Router>

   
  
)
export default App
