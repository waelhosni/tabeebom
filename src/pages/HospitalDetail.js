/**
 *  Shop Product Detail Page
 */
import React , {Component} from 'react';
import PostDetail from '../components/postDetailHospital';
import { Link } from "gatsby"
import { Row, Col,Container,Nav, NavItem, NavLink,TabContent, TabPane } from 'reactstrap';

import { connect } from 'react-redux';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
import CoverHospital from '../components/CoverHospital';
import { withTranslation, Trans } from "react-i18next";
import Layout from '../components/layout';
import SEO from "../components/seo"


const saleslider = {
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




  const images=[];


class HospitalDetail extends Component {
    constructor(props)
    {

       
         super(props);
         this.state={
             AllProduct:null,
            //  ProductId:191,
             //parseInt(this.props.match.params.id),
             CurrentProduct:null,
             activeTab: '1',
             HospitalItem:null,
             DoctorImage:[] ,
             newImage:''
         }
         this.toggle = this.toggle.bind(this);
    }

    
  
      
       
       
 GetHospitalActionHome(){   

  
        axios.get('https://api.tabeeboman.com/TabebApi/Doctor/Hospital_List_GetWeb?',
        {
            params: {
                //hospitalId:'',
                hospitalId:this.props.location.state.HospitalId,
                SpecId:'',
                RegionId:'',
                AreaId:'',
                ServiceId:'',
                HospitalName:''
            }
          }
          )
          .then(resp =>this.setState({HospitalItem:resp.data[0]}) )
          .catch(error => console.error(error))
        
      
  
         }

     componentDidMount()
    {
        if(!this.state.HospitalItem)
        {
          // console.log('hid'+this.props.location.props.hid)
           this.GetHospitalActionHome()
       
        }
        

        window.scrollTo(0, 0)
        
    }
  
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    changePreviewImage(image) {
        this.setState({
           newImage: image
           
        });
    }
    pushimage(){
        if(this.state.HospitalItem)
        {this.state.HospitalItem.OtherImagesClass.map((pic)=>
            images.push('https://admin.tabeeboman.com/Documents/DoctorPictures/Other/'+pic.FileUrl)
        )}
        return images
    }
    
    render() {
      const Productedit = this.state.HospitalItem;
      const { t ,i18n} = this.props;
       const classStyle=(i18n.language.toString()==='ar'?'ar':'en')
      return (
        <Layout location={this.props.location} >
        <SEO 
        title="Online medical appointments in Oman"
        description="Best doctor in Oman"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        pathname={this.props.location.pathname}
          /> 
        <div>
           

            {Productedit !== null ?
                <div className="site-content">
                    <div className="inner-intro">
                    <Container>
                        <Row className="intro-title align-items-center">
                            <div className={"col-12 "+classStyle}>
                                <ul className="TabeebOman_breadcrumbs page-breadcrumb breadcrumbs">
                                <li className="home">
                                    <span style={{paddingRight:15}}>
                                    <Link className="bread-link bread-home" to="/">{t("Home")}</Link>
                                    </span>
                                </li>
                                    {/* <li><span>{Productedit[t("MainSpecialization")]}</span></li> */}
                                     <li><span style={{paddingRight:15}}>{Productedit[t("HospitalName")]}</span></li>
                                </ul>
                               
                            </div>
                           
                        </Row>
                    </Container>
                    </div>
                    <div className="content-wrapper section-ptb" style={{backgroundColor:'#f6f6f6'}}>
                        <Container className="containerDetail" style={{backgroundColor:'#f6f6f6'}}  >
                        
                          <div className='boxDoctorProfile no_padding'>

                         
                          <img src={require('../assets/images/coverHospital.jpg')} placeholder={loadingImage} error={errorImage} alt={Productedit.HospitalName} className="mx-auto d-block coverHopital" />
                            <CoverHospital DataItem={Productedit}></CoverHospital>
    
                          </div>
                            <PostDetail  product={Productedit} tabid={this.state.activeTab} />
                            <div className="product-content-left-bottom">

                                {/* <div className="related products boxDoctorProfile">
                                        <h2>Related products</h2>
                                    <div className="row">
                                    <DoctorSliderRelated settings={saleslider} />
                                    </div>
                                </div> */}
                                </div> 
                                
                        </Container>
                    </div>
            </div>
        :
        <div style={{justifyContent:'center'}}>
        <Loader type="Puff" color="#d89044"/>
       </div>}
        </div>
        </Layout>
        
        );

    }
        
}
const AppMapStateToProps = state => {
    return {
      //products: state.data.products
     // products: state.hospitals.hospitals
    };
  }
export default connect(AppMapStateToProps,{})(withTranslation("translations")((HospitalDetail)))
// export default withTranslation("translations")(withRouter(HospitalDetail));
