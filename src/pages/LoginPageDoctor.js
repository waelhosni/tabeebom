import React, { Component } from 'react'

import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default class LoginPageDoctor extends Component {
    render() {
        return (
            <>
           <Layout location={this.props.location} >
           <SEO 
             title="Online medical appointments in Oman - Login"
             description="Best doctor in Oman"
             keywords={[`blog`, `gatsby`, `javascript`, `react`]}
             pathname={this.props.location.pathname}
               />
                <section className="signup-form-wrapper">
             

             <div className="container">
                 <div className="signup-form-box">
                     <div className="signup-form-top text-center">
                         <h1 style={{fontSize:30}} className="signup-form-title">Login doctor & medical center !</h1>
                        
                     </div>
                     
                     <form className="signup-form">
                         <input className="form-control input_login" type="text" placeholder="Username, or email" />
                         <input className="form-control input_login" type="password" placeholder="Password" />
                         <div className="checkboxes d-flex">
                             <label className="privacy-policy"> Remember Me
                                 <input type="checkbox" />
                                 <span className="checkmark"></span>
                             </label>
                             <Link to="/ForgotPasswordDoctor">Forgot my password?</Link>
                         </div>
                         <button type="submit" value="Register Account" className="theme-button">Login Now <FiChevronRight className="icon" /></button>
                     </form>
                     <p className="already-account">
                         Not a member? <Link style={{color:'#1890ff'}} to="/SignUpPageDoctor">Register Medical center</Link>
                     </p>
                 </div>
             </div>
         </section>
   
                </Layout>
            </>
           
        )
    }
}
