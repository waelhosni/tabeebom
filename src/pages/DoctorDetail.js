/**
 *  Shop Product Detail Page
 */
import React , {Component} from 'react';
import PostDetailDoctor from '../components/postDetailDoctor';
import { Link } from "gatsby"
import { Row, Col,Container,Nav, NavItem, NavLink,TabContent, TabPane,Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';
import axios from 'axios'
import Slider from "react-slick";
import DoctorSliderRelated from '../components/DoctorSliderRelated';
import Loader from 'react-loader-spinner'
import { withTranslation, Trans } from "react-i18next";
import { FaCalendarAlt,FaHeart,FaRegThumbsUp,FaEye } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';
import { FiPhoneCall,FiChevronRight } from 'react-icons/fi';

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
class DoctorDetail extends Component {
    constructor(props)
    {

       
         super(props);
         this.state={
             AllProduct:null,
            //  ProductId:parseInt(this.props.location.state.DoctorId),
             CurrentProduct:null,
             activeTab: '1',
             DoctorItem:null,
             DoctorImage:[] ,
             newImage:'',
             modalCall: false,
         }
         this.toggle = this.toggle.bind(this);
         this.toggleCall = this.toggleCall.bind(this);
    }
    toggleCall() {
      this.setState(prevState => ({
          modalCall: !prevState.modalCall
      }));
  }


    GetDoctorsActionHome(){
  
      
        //Call the back-end API
        //https://api.tabeeboman.com/TabebApi/Doctor/GetDoctorResult_List?DoctorId=&specId=&areaId=&hsId=&InsuId=&doctorName=&ServiceId=&LanguageId=&GenderId=&DoctorTitleId=&ConsultationFee1=0&ConsultationFee2=0&patientId=
    
        axios.get('https://api.tabeeboman.com/TabebApi/Doctor/GetDoctorResult_List?',
        {
            params: {
              DoctorId:this.props.location.state.DoctorId,
              specId:'',
              areaId:'',
  
              //hsId:getState().userDoctorReducer.userDoctor?getState().userDoctorReducer.userDoctor.HospitalId:'',
  
              hsId:'',
              InsuId:'',
              doctorName:'',
              ServiceId:'',
              LanguageId:'',
              GenderId:'',
              DoctorTitleId:'',
              ConsultationFee1:0,
              ConsultationFee2:0,
              patientId: '',
              patientId:'',
            
              
            }
          }
          )
          .then(resp =>this.setState({DoctorItem:resp.data.DoctorList[0]}) )
          .catch(error => console.error(error))
        
      
  
  }

     componentDidMount()
    {
        if(!this.state.DoctorItem)
        {
            this.GetDoctorsActionHome()
       
        }
        
       // window.removeEventListener('scroll', this.handleScroll);
        window.scrollTo(0, 0)
        
    }
    
    componentWillUnmount() {
     // window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
      var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
console.log(scrollTop)
      if(scrollTop > 50)
      {           
          document.getElementById("btn_booking").setAttribute("class","row boxDoctorProfile hiden_btn sticky-sidebar");
          // window.innerWidth >= 720 &&
          // document.getElementById("ContanierTable").setAttribute("class","product-top-right col-sm-5 profile-screen");  
      } else {
          
          document.getElementById("btn_booking").setAttribute("class","row boxDoctorProfile hiden_btn");
          // window.innerWidth <= 720 &&
          // document.getElementById("ContanierTable").setAttribute("class","product-top-right col-md-7 profile-screen");
      }
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
        if(this.state.DoctorItem)
        {this.state.DoctorItem.OtherImagesClass.map((pic)=>
            images.push('https://admin.tabeeboman.com/Documents/DoctorPictures/Other/'+pic.FileUrl)
        )}
        return images
    }
    
    render() {
        const Productedit = this.state.DoctorItem;
        const { t,i18n } = this.props;

        
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
            {Productedit != null &&
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
                                    <li><span style={{paddingRight:15}}>{Productedit[t("MainSpecializationName")]}</span></li>
                                     <li><span style={{paddingRight:15}}>{Productedit[t("DoctorName")]}</span></li>
                                </ul>
                            </div>
                        </Row>
                    </Container>
                </div>
                
               
              
               
                 <div className="content-wrapper section-ptb" style={{backgroundColor:'#f6f6f6'}}>
               
                    <Container style={{backgroundColor:'#f6f6f6'}}  className="containerDetail">
                 
                        <PostDetailDoctor  product={Productedit} tabid={this.state.activeTab} />
                        <div className="product-content-left-bottom">

                           
                                


                              
                           
                            <div className="related products boxDoctorProfile">
                                <h2 className={classStyle} style={{color:'#002b4e'}}>{t("RelatedDoctors")}</h2>
                                <hr/>
                                <div className="row">
                                <DoctorSliderRelated settings={saleslider} />
                                </div>
                            </div>
                            </div> 
                    </Container>
                </div>
                </div> 
         
        
         
        }
        </div>
        </Layout>
        )
    }
}

// const AppMapStateToProps = state => {
//     return {
//       //products: state.data.products


//       products: state.hospitals.hospitals
//     };
//   };

  
// export default (withTranslation("translations")((DoctorDetail)));
// export default connect(AppMapStateToProps,{})(withTranslation("translations")((DoctorDetail)))

export default withTranslation("translations")(DoctorDetail);