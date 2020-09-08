







/**
 * Home Slider Demo 2
 */
import React , {Component} from 'react';
import { Link } from "gatsby"
import Slider from "react-slick";
import HorizontalFilterHomeDoctors from './HorizontalFilterHomeDoctors';
import { Col, Container, Row } from 'reactstrap';
import Tabs from './Tabs';
import { FaUserMd,FaHospitalSymbol,FaHospitalAlt } from 'react-icons/fa';
import { GiPriceTag,GiMedicines } from 'react-icons/gi';
import {Animated} from "react-animated-css";

import axios from 'axios'
import Loader from 'react-loader-spinner'


//import '../../src/assets/css/owl.theme.default.css';
import { withTranslation, Trans } from "react-i18next";





  


class HomDefaultSlider extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
        value:0,
        isAnimation:false,

        sliders: [],
        isLoading: true,
        error: null,
        animationIn:['zoomInDown','wobble','flipInX','jello','slideInDown','hinge,','rotateInDownLeft'],//zoomInDown,wobble,flipInX
    
    };
  }
  
  componentDidMount()
  {

    this.GetSlider();

    setTimeout(
      function() {
          this.setState({ isAnimation: true });
      }
      .bind(this),
      2000
  );
  }

 
GetSlider (){

    axios.get('https://api.tabeeboman.com/tabebapi/SliderNew/GetSlider?',
    {
        params: {
            HospitalId:'',
            StatusId:'',
        }
    }
    )

  .then(response => {
   
    this.setState({ 
    sliders:response.data.sliders,
    isLoading: false })})
        
    .catch(error => this.setState({ error, isLoading: false }));

}




   render() {

    const SliderImgPath='https://admin.tabeeboman.com/Documents/Silder1600X600/';
    const hospitalPath='https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/';
    const { sliders, isLoading,animationIn } = this.state;
    const { t ,i18n} = this.props;
   const classStyle=(i18n.language.toString()==='ar'?'ar':'en')

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      fade: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
     
      autoplay: true,
      autoplaySpeed: 5000,
      // beforeChange: (current, next) => this.setState({ isAnimation: false }),
      // afterChange: current => this.setState({ fade: true })
       
    };
  
   
    if (isLoading) {
      return ( 
  
        <div className="loader-wrapper-section ">
            <Loader type="Puff" color="#d89044"/>
            
            </div>
            
            )
        }

    return (

      
      <>



      {window.innerWidth > 575 &&
       <div id="tab-search" className={"products-header1 pt-5 "+classStyle }>
          
            <Tabs>
              <div label={t("DoctorsTabLabel")} icon={<FaUserMd style={{margin:'-5 10 0 5',fontSize:22}}/>}>
                                          <div className="sticky-filter" id="sticky-filter">
                                                <Container className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <div className="horizontal-sidebar sidebar desktop">
                                                            <div className="shop-sidebar-widgets">
                                                                <HorizontalFilterHomeDoctors />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Container>
                                            </div>
              </div>
              <div label={t("HospitalTabLabel")} icon={<FaHospitalSymbol style={{margin:'-5 10 0 5',fontSize:22}}/>}>
                  <div className="sticky-filter" id="sticky-filter">
                                                <Container className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <div className="horizontal-sidebar sidebar desktop">
                                                            <div className="shop-sidebar-widgets">
                                                                <HorizontalFilterHomeDoctors />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Container>
                                            </div>
              </div>
              {/* <div label="Offers" icon={<GiPriceTag style={{margin:'-5 10 0 5',fontSize:22}}/>}>
                Nothing to see here, this tab is <em>extinct</em>!
              </div>
              <div label="e-Pharmacy" icon={<GiMedicines style={{margin:'-5 10 0 5',fontSize:22}}/>}>
                Nothing to see here, this tab is <em>extinct</em>!  HospitalTabLabel
              </div> */}
              
              
            </Tabs>
    </div>}

         {/* <div className="products-header2 ">
                      <Link className="button-see-more-review">
                              Book now
                      </Link>
                    </div> */}

           
                  <div className="row justify-content-end icon-header" id="headerIcon">
                    
                       
                        <div className="col-3 " style={{textAlign:'center'}}>
                          <Link to="/Doctors" className="slide-button-flat" >
                          <FaUserMd className="icon" />
                          <h7>{t("Doctors")}</h7></Link></div>

                            <div className="col-3  no_padding" style={{textAlign:'center'}}>
                          <Link to="/Hospitals" className="slide-button-flat" >
                          <FaHospitalAlt className="icon" />
                          <h7>{t("HospitalTabLabel")}</h7></Link></div>

                          <div className="col-3  no_padding" style={{textAlign:'center'}}>
                          <Link className="slide-button-flat" >
                            <GiMedicines className="icon" />
                            <h7>{t("Offers")}</h7></Link></div>
                          <div className="col-3 " style={{textAlign:'center'}}>
                          <Link className="slide-button-flat" >
                            <GiMedicines className="icon" />
                            <h7>{t("Medicines")}</h7></Link></div>
                          </div>
                      
                  
                  

                         
       
        <Slider className="slider-02 slider-simple-arrow" {...settings} >
              {sliders.map((slide,index) =>
                  <div key={slide.sliderId} className="slide-02-item">
                   
                    <div className="slide-inner">
                      <div className="slide-image slide-image1">
                        <img src={SliderImgPath+slide.SliderFileUrl} alt={slide[t("HospitalName")]}/>
                      </div>
                      <Animated className="text-Content-header" animationIn={animationIn[Math.floor((Math.random() * animationIn.length))]} animationInDuration={2000} 
                            isVisible={this.state.isAnimation}  >
                              
                            <div className="text-Content">
                              <Row>
                              <div className="col-4">
                                <img className="slide-hospital-image1-logo" src={hospitalPath+slide.HospitalLogo} alt={slide[t("HospitalName")]}/>
                              </div>
                              <div className="col-8">{slide[t("SliderTitle")]}</div>
                                </Row>
                            </div>


                            <div className="text-desc">
                              {slide[t("Description")]}
                            </div>
                          
                      </Animated>
                    </div>
                  </div>
              )}
            </Slider>

            {/* <OwlCarousel ref="car" options={options} events={events} >
                  {sliders.map((slide,index) =>
                        <div key={slide.sliderId} className="item">
                          
                              <img src={SliderImgPath+slide.SliderFileUrl} alt={slide.HospitalName}/>
                            
                            < div className="text-Content-header"  >
                                    
                                  <div className="text-Content">
                                    <Row>
                                    <div className="col-sm-3">
                                      <img className="slide-image1-logo" src={hospitalPath+slide.HospitalLogo} alt={slide.HospitalName}/>
                                    </div>
                                    <div className="col-sm-9">{slide.SliderTitle}</div>
                                      </Row>
                                  </div>


                                  <div className="text-desc">
                                  {slide.Description}
                                  </div>
                                
                            </div>
                          
                        </div>
                    )}
            </OwlCarousel> */}
        </>
      )
   }
}

export default withTranslation("translations")(HomDefaultSlider);
//export default HomDefaultSlider;













 {/* <div className="slide-subtitle">Only 24 Hours</div> */}
        {/* <div className="slide-title">
          <h1>#Spring Final Sale</h1>
        </div> */}

