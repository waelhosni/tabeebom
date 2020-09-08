import React, { Component } from 'react'

import SEO from "../components/seo"
import Layout from "../components/layout"
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from "gatsby"

export default class LoginPage extends Component {
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
                         <h1 className="signup-form-title">Login Patient!</h1>
                         <p>with your social network.</p>
                     </div>
                     <div className="signup-form-signin d-flex">
                         <button className="theme-button google" type="submit">
                             Google <FaGoogle className="icon" />
                         </button>
                         <button className="theme-button facebook" type="submit">
                             Facebook <FaFacebookF className="icon" />
                         </button>
                         <button className="theme-button twitter" type="submit">
                             Twitter <FaTwitter className="icon" />
                         </button>
                     </div>
                     <div className="connector text-center">
                         <span>or</span>
                     </div>
                     <form className="signup-form">
                         <input className="form-control" className="input_login" type="text" placeholder="Username, or email" />
                         <input className="form-control" className="input_login" type="password" placeholder="Password" />
                         <div className="checkboxes d-flex">
                             <label className="privacy-policy"> Remember Me
                                 <input type="checkbox" />
                                 <span className="checkmark"></span>
                             </label>
                             <Link to="/ForgotPassword">Forgot my password?</Link>
                         </div>
                         <button type="submit" value="Register Account" className="theme-button">Login Now <FiChevronRight className="icon" /></button>
                     </form>
                     <p className="already-account">
                         Not a member? <Link style={{color:'#1890ff'}} to="/SignUpPage">Register</Link>
                     </p>
                 </div>
             </div>
         </section>
     
                </Layout>
            </>
           
        )
    }
}
