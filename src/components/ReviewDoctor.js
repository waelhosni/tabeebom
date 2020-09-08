/**
 *  Testimonial Widgets
 */
import React , {Component} from 'react';
import Slider from "react-slick";
import MaleImg from '../assets/images/male.png'
import FemaleImg from '../assets/images/female.png'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { withTranslation, Trans } from "react-i18next";


const settings = {
    dots: true,
    autoplay: true,
      autoplaySpeed: 5000,
      infinite: false,
    speed: 500,
    slidesToShow: 1,
     adaptiveHeight: false,
    slidesToScroll: 1, 
    responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1
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

 

  

class ReviewDoctor extends Component {


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
                DoctorId:this.props.DoctorId?this.props.DoctorId:'',
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
            <div >
                <div >
                        <div>
                            {!DoctorsReviews?<Loader type="Puff" color="#d89044"/>:
                            
                                    DoctorsReviews.map((review,index) =>
                                    <div className="item col-12" >

                                                  

                                                  <div className="product-rating" style={{paddingBottom:10,textAlign:'initial'}}>
                                                       {this.getRate(review.ReveiwRatting)}
                                                  </div>
                                        
                                            
                                           
                                                

                                           
                                              <div className="row"  >  
                                                 <div className="author-photo photoComment">
                                                   
                                                   <img src={require('../assets/images/avatar.png')} 
                                                       alt={review.DoctorName} className="img-responsive rounded-circle" /> 
                                                  </div>

                                                  <b style={{color:'#002b4e',width:'50%',marginInlineStart:40,margin:'auto'}}>
                                                    <i className="fa fa-quote-right " />{review.ReveiwDescriptions}
                                                   </b>
                                               </div>
                                                  
                                                
      
                                         
                                          <div className="row" style={{margin:20,justifyContent:'space-between'}}> 
                                                <h5 style={{color:'#888'}} className="author-name-date-comment">
                                                              {t("Left_comment")}:   
                                                              {this.formatDate(new Date(review.CreatedDate))}
                                                          </h5>
                                                      
                                                          <h5 className="author-name-date-name" style={{color:'#888',marginLeft:40,marginRight:40}}> {
                                                          review.PatientName.split(' ').map((nameSplit, index) =>
                                                                  nameSplit.charAt(0) + (index === review.PatientName.split(' ').length - 1 ? '' : '. ')
                                                                )}
                                                          </h5>
                                          </div>
                                                    
                                            
                                             
                                        
                                        <hr/>
                                        </div>
                                        )}
                            
                           

                        </div>
                        
                          
                        
                        </div>
                       
                       
                   
                </div>
        )
    }
 }

 export default withTranslation("translations")(ReviewDoctor);

