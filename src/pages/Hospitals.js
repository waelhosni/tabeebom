
/**
 *  Shop Main Page
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "gatsby"
import { Col, Container, Row } from 'reactstrap';
import { getFilterHospitalsData } from '../store/services';
import HospitalList from '../Components/HospitalList';
import HorizontalFilterHospital from '../Components/HorizontalFilterHospital';
import TopFilter from '../Components/TopFilterHospital';
import DoctorPageTitle from '../Components/DoctorPageTitle';
import Loader from 'react-loader-spinner'
import { withTranslation, Trans } from "react-i18next";
import Layout from "../components/layout"
import SEO from "../components/seo"
import  {receiveHospital} from '../Store/actions';


class Hospitals extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            limit: 8,
            hasMoreProduct: true,
            getHospitals: this.props.AllHospitals,
        }
    }
    componentDidMount()
    {
      
        this.props.receiveHospital();
    }

    componentWillMount() {
        if (this.state.limit < this.state.getHospitals.length) {
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
        let { hospitals } = this.props;
        let layoutstyle ="col-sm-12" 
        const { t,i18n } = this.props;

        
        const classStyle=(i18n.language.toString()==='ar'?'ar':'en')


        // if (!products) {
        //     return ( 
        
        
        // <div className="loader-wrapper-section ">
        //     <Loader type="Puff" color="#d89044"/>
            
        //     </div>
            
        //     )
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

         
                <div className="inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom">
                    <Container>
                        <Row className="intro-title align-items-center intro-section-center">
                            <DoctorPageTitle title={t("HospitalTabLabel")}/>
                        </Row>
                    </Container>
                    </div>
                <div className="content-wrapper mb-3 mb-md-5">
                        

                    <Container className={classStyle}>
                        <Row>
                            <div className="content col-xl-12 col-lg-12">
                                <div className="products-header pt-5">
                                    <div className="sticky-filter" id="sticky-filter">
                                        <Container className="px-0">
                                            <div className="d-flex align-items-center">
                                                <div className="horizontal-sidebar sidebar desktop">
                                                    <div className="shop-sidebar-widgets">
                                                    {this.props.AllHospitals&&(this.props.AllHospitals.length>0&&<HorizontalFilterHospital />)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                    </div>
                                    <span class="header_main_theme_small">
                                        {t("FindThebest")}<sup> ® </sup>                  </span>

                                    <div className="loop-header">
                                        <div className="loop-header-tools">
                                            <div className="loop-header-tools-wrapper">
                                            {this.props.AllHospitals&&(this.props.AllHospitals.length>0&&hospitals.length>0&&<TopFilter hospitalLength={hospitals.length} />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                      this.props.AllHospitals.length>0?
                                        hospitals.length > 0 ?
                                            <div>
                                                <Row className="products products-loop grid TabeebOman-products-shortcode pgs-product-list list">
                                                <div className="col-sm-3 padding_5" ></div>
                                                <div className="col-sm-9 padding_5" >
                                                    {
                                                        hospitals.slice(0, this.state.limit).map((product, index) =>
                                                    <HospitalList product={product} key={index} layoutstyle={layoutstyle} />)
                                                    }
                                                </div>
                                                
                                                </Row>
                                                <div className="text-center">
                                                    <a onClick={this.onLoadMore} className="loadmore-btn">{t("LoadMore")}</a>
                                                </div>
                                            </div>
                                            :
                                            <Row className="products products-loop grid TabeebOman-products-shortcode">
                                                <div className="col-sm-12 text-center  mt-5" >
                                                    <img src={require(`../assets/images/empty-search.jpg`)} className="img-fluid mb-4" />
                                                    <h3>{t("Sorry")}    </h3>
                                                    <p>{t("please_try")}</p>
                                                    {/* <Link to="/shop" className="btn btn-solid">Clear filter</Link> */}
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
  
      
        hospitals: getFilterHospitalsData(state.hospitals, state.filters),
        AllHospitals:state.hospitals.hospitals,
       
  
    }}
export default connect(mapDispatchToProps , {receiveHospital})(withTranslation("translations")((Hospitals)))