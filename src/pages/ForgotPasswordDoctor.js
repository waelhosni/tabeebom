import React, { Component } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default class ForgotPasswordDoctor extends Component {
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
               <section className="signup-form-wrapper forgot-password">
                <div className="container">
                    <div className="signup-form-box">
                        <div className="signup-form-top">
                            <h1 className="signup-form-title">Reset Doctor or Medical center Password</h1>
                            <p>Enter the email of your account to reset password. Then you will receive a link to email to reset the password.If you have any issue about reset password <a href="/contact">contact us</a></p>
                        </div>
                        <form className="signup-form">
                            <input className="form-control input_login" type="email" placeholder="Enter email address" />
                            <button type="submit" value="Register Account" className="theme-button">Reset Password <FiChevronRight className="icon" /></button>
                        </form>
                        <p className="already-account d-flex">
                            <Link style={{color:'#1890ff'}} to="/LoginPageDoctor">Login Doctor or Medical center</Link>
                            <span>Not a member? <Link style={{color:'#1890ff'}} to="/SignUpPageDoctor">Register Medical center account</Link></span>
                        </p>
                    </div>
                </div>
            </section>
                </Layout>
            </>
        )
    }
}
