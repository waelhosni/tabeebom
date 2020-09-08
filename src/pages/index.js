import React from 'react';
import { withTranslation } from "react-i18next";

import { IoIosArrowForward } from 'react-icons/io';
import { Col, Container, Row } from 'reactstrap';
import Layout from "../components/layout"
import SEO from "../components/seo"


import DoctorSlider from '../components/DoctorSlider';
import HospitalLogoSlider from '../components/HospitalLogoSlider.js';
import ReviewSlider from '../components/ReviewSlider';
import HomeSlider from '../components/HomDefaultSlider.js';

import  {receiveProducts,receiveDoctors,receiveHospital} from '../Store/actions';
import { connect } from 'react-redux';


const doctorSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 6,

    slidesToScroll: 2,
     responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 3.2
      }
    }
  ]
};

class index extends React.Component {
  
 componentWillMount()
    {
       this.props.receiveProducts();
      this.props.receiveDoctors();
       this.props.receiveHospital();
    }

  render() {
        const { t } = this.props;
    
            
      return (
          
        <Layout location={this.props.location} >
        <SEO 
         title="Online medical appointments in Oman"
         description="Best doctor in Oman"
         keywords={[`blog`, `gatsby`, `javascript`, `react`]}
         pathname={this.props.location.pathname}
           />   
        <div>
             
                
                <HomeSlider />
                <div id="content" className="site-content" tabIndex={-1}>
                            <div className="content-wrapper content-wrapper-vc-enabled">
                                <div className="container-fluid">
                                    <Row>
                                        <Col sm={12} className="px-0">
                                        <div id="primary" className="content-area">
                                            <main id="main" className="site-main">
                                                <article className="page type-page status-publish hentry">
                                                
                                                
                                                    {/* <div className="countdown-main" style={{ backgroundImage: 'url(' + require(`../../assets/images/categories/new-fashion/offer-deal-bg.jpg`) + ')' }}  >
                                                        <Container>
                                                                <DealOfTheWeek2 />
                                                        </Container>
                                                    </div> */}
                                                    <div className="container TabeebOman-listing-wrapper">
                                                        <Row className="section-ptb">
                                                            <Col sm={12} className="no_padding">
                                                                <Row>
                                                                    <Col sm={12}>
                                                                        <div className="section-title top-doctor-header">
                                                                            <h1 style={{color:'#009bde',}} >{t("top_doctor")} </h1>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <div className="TabeebOman_products_listing_wrapper TabeebOman_products_listing-1">
                                                                    <div className="products-listing-wrapper products-listing-type-carousel products-listing-without-intro">
                                                                    <Row>
                                                                        <DoctorSlider settings={doctorSlider}    />
                                                                    </Row>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    {/* <div className="newsletter-section section-ptb" style={{ backgroundImage: 'url(' + require(`../../assets/images/categories/new-fashion/new-letter-bg.jpg`) + ')' }} >
                                                        <Container>
                                                                <Subscribe2 />
                                                        </Container>
                                                    </div>
                                                */}
                                                    <Row className="section-ptb testimonial-bg">
                                                        <div className="col-sm-12 offset-lg-1 col-lg-10 offset-md-1 col-md-10">
                                                            <span className="title">
                                                            {t("Review_Header")} 
                                                            </span>

                                                                <ReviewSlider />
                                                                <div className="btnReview">
                                                                    <div className="button-see-more-review">
                                                                    {t("See_more_review")} 
                                                                    <IoIosArrowForward style={{fontSize:25,fontWeight: 800,margin:'0 0 0 30'}}></IoIosArrowForward>
                                                                    </div>
                                                                    
                                                                </div>
                                                        </div>

                                                        
                                                    </Row>
                                                    <Container>
        {/*                                             
                                                    <Row className="section-ptb text-center">
                                                        <Col sm={12}>
                                                        <div className="section-title ">
                                                            <h1  style={{color:'#002D4B',fontSize:50}}> Best Offers</h1>
                                                            <p>Read what we say on our blog. you do not have to worry about getting stuck</p>
                                                        </div>
                                                        <Row>
                                                            <Col sm={12}>
                                                            <div className="latest-post-wrapper latest-post-type-carousel latest-post-style-1 latest-post-without-intro text-left row">
                                                                <OurLatestPost  settings={latestblogslider} />
                                                            </div>
                                                            </Col>
                                                        </Row>
                                                        </Col>
                                                    </Row> */}
                                                    </Container>
                                                    <Container>
                                                        <Row>
                                                            <HospitalLogoSlider />
                                                        </Row>
                                                    </Container>

                                                    {/* <Container>
                                                        <Row className="section-pt">
                                                        <Col sm={12}>
                                                            <Row>
                                                            <Col sm={12}>
                                                                <div className="section-title">
                                                                <h2 className="title text-left">Latest Blog</h2>
                                                                </div>
                                                            </Col>
                                                            </Row>
                                                                <LatestBlogSlider />
                                                            </Col>
                                                        </Row>
                                                    </Container> */}
                                                </article>
                                            </main>
                                        </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
        </div>
        
        </Layout>
       
        )
    }
}

const AppMapStateToProps = state => {
  
    return {
      products: state.data.products,
      doctors: state.doctors.doctors,
      hospitals:state.hospitals.hospitals,
    };
  };
 

export default connect(AppMapStateToProps,{receiveProducts,receiveDoctors,receiveHospital})(withTranslation("translations")(index))






