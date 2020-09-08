/**
 *  Testimonial Widgets
 */
import React , {Component} from 'react';
import Slider from "react-slick";
import MaleImg from '../assets/images/male.png'
import FemaleImg from '../assets/images/female.png'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Link } from "gatsby"
import { withTranslation, Trans } from "react-i18next";



const settings = {
    dots: true,
    autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
    speed: 500,
    slidesToShow: 2,
     adaptiveHeight: false,
    slidesToScroll: 1, 
    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1
          }
        }
      ]
  };

 

  

class ReviewSlider extends Component {


    constructor(props) {
        super(props);
     
        this.state = {
         
            DoctorsReviews: [],
            isLoading: true,
            error: null,
        };
      }

      componentDidMount(){

        this.GetDoctorsReviews();
            
        }


    GetDoctorsReviews (){
 
        axios.get('https://api.tabeeboman.com/TabebApi/DoctorNew/GetDoctorsReview?',
        {
            params: {
                DoctorId:'',
            }
        }
        )
    
      .then(response => {
       
        console.log(response.data.TopDoctors)
        this.setState({ 
            DoctorsReviews:response.data.DoctorsReviews,
                isLoading: false })})
            
        .catch(error => this.setState({ error, isLoading: false }));
    
    }

    formatDate(DateTime) {
        return ('  '+DateTime.getDate() +'/'+(DateTime.getMonth()+1) +'/'+DateTime.getFullYear() );
        }

        getRate(Ratting)
        {
            let rat = [];
            let rating = (!Ratting)?5:Ratting;
            let i = 1;
                while (i <= 5) {
                    if (i <= rating) {
                        rat.push(<i className="fa fa-star" style={{fontSize:20,color:'#ef9100'}} />);
                    }
                    else {
                        rat.push(<i className="fa fa-star-o" style={{fontSize:20}}  />);
                    }
                    i += 1;
                };

                return rat;
        }

   render() {

    const DoctorImgPath='https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/';
    const { DoctorsReviews, isLoading } = this.state;
    const { product } = this.props;
    const { t } = this.props;
    

    return (
            <div className="TabeebOman_testimonials_wrapper TabeebOman_testimonials-1">
                <div className="testimonial testimonial-style-1">
                        <div className="testimonials slick-carousel">
                            {!DoctorsReviews?<Loader type="Puff" color="#d89044"/>:
                            <Slider {...settings}>
                                    {DoctorsReviews.map((review,index) =>
                                    <div className="item">
                                        <div className="row">
                                            
                                            <div className="col-sm-4" style={{verticalAlign:'center',border: '5 solid rgba(0, 0, 0, 0.07)'}}>
                                            <Link to={`/Doctors/${review.Specialization}/${review.DoctorId}`}>
                                                
                                                <div className="author-photo">
                                                    <img src={review.ImageData?DoctorImgPath+review.ImageData:review.GenderName=='Male'?MaleImg:FemaleImg} 
                                                        alt={review.DoctorName} className="img-responsive rounded-circle" /> 
                                                </div>
                                                </Link>
                                                <div className="client-info">
                                                    <h5 className="author-name"> {review.DoctorName}</h5>
                                                </div>
                                                <h5 className="author-name-Spec">{review.Specialization}</h5>
                                                <h5 className="author-name-hospi">{review.HospitalName}</h5>
                                            </div>

                                            <div className="col-sm-8 testimonial-right ">
                                                
                                                
                                                <div className="product-rating" style={{paddingBottom:10}}>
                                                {this.getRate(review.ReveiwRatting)}
                                                </div>
                                                
                                            

                                                <p>{review.ReveiwDescriptions}
                                                    <i className="fa fa-quote-right " /></p>
                                                    <h5 className="author-name-date-name"> {
                                                    review.PatientName.split(' ').map((nameSplit, index) =>
                                                            nameSplit.charAt(0) + (index === review.PatientName.split(' ').length - 1 ? '' : '. ')
                                                           )}
                                                    </h5>

                                                  
                                                    <h5 className="author-name-date-comment">
                                                        Left a comment on:   
                                                        {this.formatDate(new Date(review.CreatedDate))}
                                                    </h5>
                                                
                                                
                                            </div>
                                            
                                        </div>
                                        </div>
                                        )}
                            
                            </Slider>}

                        </div>
                        
                          
                        
                        </div>
                       
                       
                   
                </div>
        )
    }
 }
 export default withTranslation("translations")(ReviewSlider);


