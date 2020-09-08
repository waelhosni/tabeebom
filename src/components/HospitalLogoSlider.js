/**
 * Brand Logo Slider
 */
import React, { Component } from 'react';
import Slider from "react-slick";
import { Col } from 'reactstrap';
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Link } from "gatsby"
import { withTranslation, Trans } from "react-i18next";


const settings = {
    dots: false,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };


  
class HospitalLogoSlider extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
     
       HospitalList: [],
       isLoading: true,
        error: null,
    };
  }

 GetHospitalsAction(){

        axios.get('https://api.tabeeboman.com/TabebApi/Doctor/Hospital_List_GetWeb?',
        {
            params: {
                hospitalId:'',
                SpecId:'',
                RegionId:'',
                AreaId:'',
                ServiceId:'',
                HospitalName:''
            }
          }
          )
          .then(response => {
       
            this.setState({ 
              HospitalList:response.data,
            isLoading: false })})
                
            .catch(error => {
              this.setState({ error, isLoading: false })});
        
      
  
  }

  componentDidMount()
  {
    this.GetHospitalsAction();
  }
   render() {
    const hospitalImg='https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/';
    const { HospitalList, isLoading } = this.state;
    const { t } = this.props;
    
    if (isLoading) {
        return ( 
    
    
    <div className="loader-wrapper-section ">
        <Loader type="Puff" color="#d89044"/>
        
        </div>
        
        )
    }
//item.HospitalLogo
    return (
            <Col sm={12}>
                <div className="TabeebOman_clients TabeebOman_clients-list-type-slider">
                   <Slider {...settings} className="slider-arrow-hover">
                   {HospitalList.map((hospital,index) =>
                   hospital.HospitalLogo&&
                   <Link to="/HospitalDetail" 
                     state={{HospitalId:hospital.HospitalId,RegionName:hospital.RegionName}} >
                           <div className="item">
                             <img src={hospitalImg+hospital.HospitalLogo} alt={hospital.HospitalName} className="img-fluid mx-auto img-logo" />
                             <p className="img-logo-a">{hospital[t("HospitalName")]}</p>
                             <p className="img-logo-a img-logo-b" style={{height:16}}>{hospital[t("RegionName")]} - {hospital[t("AreaName")]}</p>
                            </div>
                            </Link>)}
                         
                    </Slider>
                </div>
            </Col>
      )
   }
}


export default withTranslation("translations")(HospitalLogoSlider);
//export default HospitalLogoSlider;
