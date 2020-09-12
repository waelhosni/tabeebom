/**
 *  Footer Main
 */
import React from 'react';
import { Row, Col,Container } from 'reactstrap';
import { Link } from "gatsby"
import { withTranslation } from "react-i18next";



class Footer extends React.Component {

   
    componentDidMount()
    {
        window.addEventListener('scroll',this.Checkscroll);
    }
    componentWillUnmount()
    {
        window.removeEventListener('scroll',this.Checkscroll);
    }

    Checkscroll()
    {

        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

        if(scrollTop > 350)
        {
            if(document.getElementById("back-to-top") != null)
            {
                document.getElementById("back-to-top").setAttribute("style","display:block");
            }
        }
        else
        {

            if(document.getElementById("back-to-top") != null)
            {
                document.getElementById("back-to-top").setAttribute("style","display:none");
            }
        }

    }
    ClicktoTop()
    {
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }
    render() {
        let backtotop = {display : 'none'}
        const { t ,i18n} = this.props;
        const classDir=(i18n.language.toString()==='ar'?'ara-dir':'')
        return (
        <div>
                <footer className={`site-footer ${classDir}`}>
                <div className="footer-wrapper">
                    <div className="footer-widgets-wrapper">
                    <div className="footer">
                        <Container>
                        <Row>
                            <div className="col-lg-3 col-md-6 footer-align-initial">
                            <div className="logo-wrapper widget">
                                <p><Link to="#">
                                    <img className="img-fluid"  src={require(`../assets/images/logo.png`)}   alt="logo" />
                                </Link></p>
                            </div>
                            <div className="text-content">
                                <p className="mb-3 mt-4"> {t("prag1")} </p>
                                <p className="mb-4">{t("prag2")}</p>
                            </div>
                            <div className="pgs-social-profiles mt-4">
                                <div className="social-profiles-wrapper">
                                <div className="social-profiles-wrapper-inner social-profiles-default social-profiles-shape-square">
                                    <div className="social-profiles">
                                    <ul>
                                        <li><a href="https://www.facebook.com/TabeebOman" title="TabeebOman in Facebook" target="_blank" rel="noreferrer"><i className="fa fa-facebook" role="button" aria-label="." /></a></li>
                                        <li><a href="https://twitter.com/TabeebOm/" title="TabeebOman in Twitter" target="_blank" rel="noreferrer"><i className="fa fa-twitter"  role="button" aria-label="." /></a></li>
                                        <li><a href="https://www.instagram.com/tabeeb.oman/" title="TabeebOman in Instagram" target="_blank" rel="noreferrer"><i className="fa fa-instagram"  role="button" aria-label="." /></a></li>
                                        <li><a href="https://www.youtube.com/channel/UCtDNfY5am1qx3AtvMSVTRsQ" title="TabeebOman in Youtube" target="_blank"  rel="noreferrer"><i className="fa fa-youtube" role="button" aria-label="."  /></a></li>
                                        <li><a href="https://api.whatsapp.com/send?phone=96897001464" title="TabeebOman in Whatsapp" target="_blank" rel="noreferrer" ><i className="fa fa-whatsapp" role="button" aria-label="."  /></a></li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                            
                            <div className="col-lg-3 col-md-6 footer-align-initial">
                            <div className="footer-nav-menu widget">
                                <h4 className="footer-title title">{t("SiteLInke")}</h4>
                                <div className="menu-useful-links-container">
                                <ul className="menu">
                                    <li className="menu-item active"><Link to="/">{t("Home")}</Link></li>
                                    <li className="menu-item"><Link to="/Aboutus">{t("AboutUs")}</Link></li>
                                    <li className="menu-item"><Link to="/Contactus">{t("ContactUs")}</Link></li>
                                    <li className="menu-item"><Link to="/PrivacyAndPolicis">{t("PrivacyPolicy")}</Link></li>
                                    
                                    <li className="menu-item"><Link to="/FAQ">{t("FAQ")}</Link></li>
                                </ul>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-3 col-md-6 footer-align-initial">
                            <div className="footer-nav-menu widget mt-4 mt-lg-0">
                                <h4 className="footer-title title">{t("Information")}</h4>
                                <div className="menu-useful-links-container">
                                <ul className="menu">
                                    <li className="menu-item active"><Link to="/Doctors">{t("Doctors")}</Link></li>
                                    <li className="menu-item"><Link to="/Hospitals">{t("HospitalTabLabel")}</Link></li>
                                    <li className="menu-item"><Link to="/">{t("Offers")}</Link></li>
                                    <li className="menu-item"><Link to="/">{t("Medicines")}</Link></li>
                                    
                                    <li className="menu-item"><Link to="/LoginPage">{t("LoginPatient")} </Link></li>
                                    <li className="menu-item"><Link to="/SignUpPage">{t("SignUpPatient")} </Link></li>
                                    <li className="menu-item"><Link to="/LoginPageDoctor">{t("SignIn_Hospital_Doctor")} </Link></li>
                                    <li className="menu-item"><Link to="/SignUpPageDoctor">{t("SignUpMedicalCenter")}  </Link></li>
                                    
                                </ul>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-3 col-md-6 footer-align-initial">
                            <div className="pgs-contact-widget widget mt-4 mt-lg-0">
                                <h4 className="footer-title title">{t("ContactInfo")}</h4>
                                <div className="footer-address">
                                <ul>
                                    <li><i className="fa fa-map-marker" /><span>{t("Address")}</span></li>
                                 
                                    <li><i className="fa fa-phone" /><span>+972 97001462</span></li>
                                    <li className="pgs-contact-email"><i className="fa fa-envelope-o" /><span>info@TabeebOman.com</span></li>
                                </ul>
                                </div>
                            </div>
                            <div className="widget pgs-newsletter-widget">
                                <h4 className="footer-title title">{t("Newsletter")}</h4>
                                <div className="newsletter">
                                <div className="section-field">
                                    <form className="newsletter_form">
                                    <div className="input-area">
                                        <input type="text" className="placeholder newsletter-email" name="newsletter_email" placeholder={t("Enter_Email")} />
                                    </div>
                                    <div className="button-area">
                                        <span className="input-group-btn">
                                        <button className="btn btn-icon newsletter-mailchimp submit" type="button">{t("Subscribe")}</button>
                                        </span>
                                        <span className="newsletter-spinner spinimg-pgs_newsletter_widget_2" />
                                    </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>
                        </Row>
                        </Container>
                    </div>
                    </div>
                    <div className="footer-bottom-wrapper">
                    <Container>
                        <Row>
                        <div className="col-12">
                            <div className="footer-bottom">
                            <Row className="align-items-center">
                                <Col lg={6}>
                                <Row>
                                    <div className="col-12">
                                    <div className="footer-content">
                                    {t("parg3")}</div>
                                    </div>
                                </Row>
                                </Col>
                                <Col lg={6}>
                                <div className="app-group row text-lg-right">
                                    <Col md={4}>
                                    <div className="app-img">
                                        <img src={require(`../assets/images/appbtntext.png`)} className="img-fluid" alt="Tabeeb Oman store" />
                                    </div>
                                    </Col>
                                    <Col md={8}>
                                    <a href="https://play.google.com/store/apps/details?id=mob.pmb.com.tabeb" className="apps-store-img">
                                        <img src={require(`../assets/images/google-play-img.png`)} className="img-fluid" alt="Tabeeb Oman play store" />
                                    </a>
                                    <a href="https://apps.apple.com/us/app/id1509662622" className="apps-store-img">
                                        <img src={require(`../assets/images/appstorebtn.png`)} className="img-fluid" alt="Tabeeb Oman apple store" />
                                    </a>
                                    </Col>
                                </div>
                                </Col>
                            </Row>
                            </div>
                        </div>
                        </Row>
                    </Container>
                    </div> 
                    <div className="site-info">
                    <div className="footer-widget">
                        <Container>
                        <div className="row align-items-center">
                            <Col md={6} className="float-left">
                                 <p> © {new Date().getFullYear()} <Link to="#">{t("TabeebOman")}</Link> {t("All_Rights_Reserved")}.</p>
                            </Col>
                            <Col md={6}  className="float-right">
                                <div className="payments text-right">
                                    <img src={require(`../assets/images/sectigo_trust_seal_sm_2x.png`)} className="img-fluid img-fluidSecur" alt="Tabeeb Oman security" />
                                </div>
                            </Col>
                        </div>
                        <div className="clearfix" />
                    </Container>
                    </div>
                    
                    </div>
                  </div>
                </footer>
                 {/* Back to Top */}
                <a href="/" id="back-to-top" style={backtotop} onClick={this.ClicktoTop}>
                    {/* <a href="/" className="top arrow">
                            <i className="fa fa-angle-up"></i>
                    </a> */}
                </a>
        </div>
        )
    }
};
export default withTranslation("translations")(Footer);
