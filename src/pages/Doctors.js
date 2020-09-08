
/**
 *  Shop Main Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "gatsby"
import { Col, Container, Row } from 'reactstrap';
import { getFilterDoctorData } from '../Store/services';
import Loader from 'react-loader-spinner'
import { withTranslation, Trans } from "react-i18next";
import {Helmet} from 'react-helmet'

import ProductList from '../components/ProductList';
import HorizontalFilterDoctors from '../components/HorizontalFilterDoctors';
import TopFilter from '../components/TopFilter';
import DoctorPageTitle from '../components/DoctorPageTitle';
import Layout from "../components/layout"
import SEO from "../components/seo"
import  {receiveProducts,receiveDoctors,receiveHospital} from '../Store/actions';

class Doctors extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            limit: 8,
            hasMoreProduct: true,
            getDoctors: this.props.AllDoctors,
        }
    }
    componentDidMount()
    {
      
        this.props.receiveDoctors();
    }


    componentWillMount() {
        if (this.state.limit < this.state.getDoctors.length) {
            setTimeout(() => {
                this.setState({
                    limit: this.state.limit + 8
                });
            }, 2500);
        }
    }
    onLoadMore = () => {
        this.setState({
            limit: this.state.limit + 8
        });
    }
    render() {
        let { doctors } = this.props;
        let layoutstyle ="col-sm-12" //localStorage.getItem('setLayoutStyle')
        const { t, i18n } = this.props;
        // if (layoutstyle == null) {
        //     layoutstyle = localStorage.setItem('setLayoutStyle', 'col-sm-6 col-xl-3 col-lg-4')
        // }

        return (

            <Layout location={this.props.location} >
            <SEO 
             title="Online medical appointments in Oman"
             description="Best doctor in Oman"
             keywords={[`blog`, `gatsby`, `javascript`, `react`]}
             pathname={this.props.location.pathname}
               />
            <div className="site-content">
                {/* <div className="inner-intro">
                    <Container>
                        <Row className="intro-title align-items-center">
                            <Col md={6} className="text-left">
                                <div className="intro-title-inner">
                                    <h1>Doctors</h1>
                                </div>
                            </Col>
                            <Col md={6} className="text-right">
                                <ul className="TabeebOman_breadcrumbs page-breadcrumb breadcrumbs">
                                    <li className="home">
                                        <span>
                                            <Link className="bread-link bread-home" to="/">Home</Link>
                                        </span>
                                    </li>
                                    <li><span>Doctors</span></li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div> */}

                <div className="inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom">
                    <Container>
                        <Row className="intro-title align-items-center intro-section-center">
                            <DoctorPageTitle title={t("Doctors")}/>
                        </Row>
                    </Container>
                    </div>
                <div className="content-wrapper mb-3 mb-md-5">
                    <Container>
                        <Row>
                            <div className="content col-xl-12 col-lg-12">
                                <div className="products-header pt-5">
                                    <div className="sticky-filter" id="sticky-filter">
                                        <Container className="px-0">
                                            <div className="d-flex align-items-center">
                                                <div className="horizontal-sidebar sidebar desktop">
                                                    <div className="shop-sidebar-widgets">
                                                      {this.props.AllDoctors&&(this.props.AllDoctors.length>0&&<HorizontalFilterDoctors />)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                    </div>
                                    <div className="loop-header">
                                        <div className="loop-header-tools">
                                            <div className="loop-header-tools-wrapper">
                                            {this.props.AllDoctors&&(this.props.AllDoctors.length>0&&doctors.length>0&&<TopFilter doctorLength={doctors.length} />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                this.props.AllDoctors.length>0?
                                    doctors.length > 0 ?
                                        <div>
                                        <Row className="products products-loop grid TabeebOman-products-shortcode pgs-product-list list">
                                        <div className="col-sm-3 padding_5" >

                                             {/* <SideFilter /> */}
                                        </div>
                                        <div className="col-sm-9 padding_5" >
                                            {doctors.slice(0, this.state.limit).map((product, index) =>
                                                <ProductList product={product} key={index} layoutstyle={layoutstyle} />
                                            )
                                            }
                                        </div>
                                        
                                        </Row>
                                        <div className="text-center">
                                            <a onClick={this.onLoadMore} className="loadmore-btn">Load More</a>
                                        </div>
                                    </div>
                                    :
                                    <Row className="products products-loop grid TabeebOman-products-shortcode">
                                        <div className="col-sm-12 text-center  mt-5" >
                                            <img src={require(`../assets/images/empty-search.jpg`)} className="img-fluid mb-4" />
                                            <h3>Sorry! No doctors were found matching your selection!    </h3>
                                            <p>Please try to other words.</p>
                                            <Link to="/Doctors" className="btn btn-solid">Continue Shopping</Link>
                                        </div>
                                    </Row>
                                    :

                                    <div className="loader-wrapper-section ">
                                            <Loader type="Puff" color="#d89044"/>
                                    
                                    </div>
                                    

                                }
                            </div>

                        </Row>

                        
                    </Container>
                </div>
            </div>
            </Layout>
       
       )
    }
}



const mapDispatchToProps = state => {

    return {
  
        doctors: getFilterDoctorData(state.doctors, state.filters),
        AllDoctors:state.doctors.doctors,
  
    }}
     
    
    
export default connect(mapDispatchToProps,{receiveDoctors})(withTranslation("translations")(Doctors))
    
    
    
    
//export default connect(mapDispatchToProps,{})(withTranslation("translations")(Doctors))