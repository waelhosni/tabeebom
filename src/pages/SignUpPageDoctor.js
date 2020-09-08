import React, { Component } from 'react'
import SEO from "../components/seo"
import Layout from "../components/layout"
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from "gatsby"

export default class SignUpPageDoctor extends Component {
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
                            <h1 className="signup-form-title">Create Medical center account!</h1>
                           
                            
                     </div>
                    
                        
                        <form className="signup-form">
                            <input className="form-control input_login" type="text" placeholder="First Name" />
                            <input className="form-control input_login" type="text" placeholder="Last Name" />
                            <input className="form-control input_login" type="text" placeholder="Enter your username" />
                            <input className="form-control input_login" type="email" placeholder="Email Address" />
                            <input className="form-control input_login" type="password" placeholder="Password" />
                            <input className="form-control input_login" type="password" placeholder="Confirm Password" />
                            <div className="checkboxes">
                                <label className="privacy-policy"> I agree to Tabeeb Oman <a style={{color:'#1890ff'}} href="https://techydevs.com">Privacy Policy</a>
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                                <label className="privacy-policy"> I agree to Tabeeb bOman <a style={{color:'#1890ff'}} href="https://techydevs.com">Terms of Services</a>
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <button type="submit" value="Register Account" className="theme-button">Register Account <FiChevronRight className="icon" /></button>
                        </form>
                        <p className="already-account">
                            Already have an account? <Link style={{color:'#1890ff'}} to="/LoginPageDoctor">Login doctor & medical center  </Link>
                        </p>
                    </div>
                </div>
            </section>
       
                </Layout> 
            </>
        )
    }
}
