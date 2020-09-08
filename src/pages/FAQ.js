import React, { Component } from 'react'
import Accordion from '../components/Accordions'
// import Navbar from '../components/common/Navbar'
// import Breadcrumb from '../components/common/Breadcrumb'
// import Divider from '../components/Divider'
// import CtaForm from '../components/CtaForm'
// import TeamSidebar from '../components/TeamSidebar'
// import Footer from '../components/Footer'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { RouteComponentProps } from "@reach/router"



export default class FAQ extends Component {

    
    render() {
        return (
            <>
              {/* <Layout location={this.props.location} > */}
            <SEO 
             title="Online medical appointments in Oman"
             description="Best doctor in Oman"
             keywords={[`blog`, `gatsby`, `javascript`, `react`]}
             pathname={this.props.location.pathname}
               />
                <div className="container">
                    <div className="faq-grid d-grid">
                        <div className="left">
                            <Accordion />
                        </div>
                        <div className="right">
                            {/* <TeamSidebar /> */}
                        </div>
                    </div>
                </div>
                {/* <Divider /> */}
                <div className="form-white-bg">
                    {/* <CtaForm /> */}
                </div>
                {/* </Layout> */}
            </>
        )
    }
}
