
/*
* Post Detail Page
*/
import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Link } from "gatsby"
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { Row, Col } from 'reactstrap';
import ReactCardFlip from 'react-card-flip';
import { FiPhoneCall,FiChevronRight } from 'react-icons/fi';
import DoctorSliderHospital from '../components/DoctorSliderHospital'
import HospitalScheduler from '../components/HospitalScheduler'

import axios from 'axios'
import ReviewDoctorHospital from '../components/ReviewDoctorHospital';
import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
import { MdRateReview } from 'react-icons/md';


import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';
import { FaUniversity ,FaGraduationCap,FaComment,FaCalendarAlt,
    FaUserMd,FaMedkit,FaEye,FaFemale,FaMale,FaImages,FaVideo,FaRegThumbsUp} from 'react-icons/fa';

import { withTranslation, Trans } from "react-i18next";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    
 
  };
const productslider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

   
  };

  const Doctorslider = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 4,
  
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

  const settingsVideo = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
  };
  

  class PostDetail extends Component {

    constructor(props) {
        super(props);
        this.AddToCart = this.AddToCart.bind(this);
        this.AddToWishList = this.AddToWishList.bind(this);
        this.state = {
          photoIndex: 0,
          isOpen: false,
          qty:1,
          profileImage:'https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/'+props.product.ImageData,
          newImage:'https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/'+props.product.HospitalLogo,
          isFlipped: false,
          GetDoctorWorkingHour:null,
          fieldvalue:{},
          appointmentTime:'',
          newVideo:'',
          nav1: null,
          nav2: null
        };
       
        this.FlippedClick = this.FlippedClick.bind(this);
        this.SetAppointmentTime = this.SetAppointmentTime.bind(this);
      }

      handleChange(field, e){
        let fieldvalue=this.state.fieldvalue;
        fieldvalue[field] = e.target.value;
        this.setState({fieldvalue});
      }


      SetAppointmentTime(appointmentTime){
          this.setState({appointmentTime})
      }
      FlippedClick(e) {
        //e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      }

    changePreviewImage(image) {
        this.setState({
            newImage: image,
           tabid:1
        });
    }

    ImageChange(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    // Add To Cart
    AddToCart(ProductID,ProductName,ProductImage,Qty,Rate,StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
        if(Cart == null)
           Cart = new Array();
        let selectedProduct = Cart.find(product => product.ProductName === ProductName);
        if(selectedProduct == null)
        {

           Cart.push({ProductID:ProductID,ProductName:ProductName,ProductImage:ProductImage,Qty:Qty,Rate:Rate,StockStatus:StockStatus});
           localStorage.removeItem("LocalCartItems");
           localStorage.setItem("LocalCartItems",JSON.stringify(Cart));

           toast.success("Item Added to Cart");
        }
        else {
           toast.warning("Item is already in Cart");
        }
     }

     AddToWishList(ProductID,ProductName,ProductImage,Qty,Rate,StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("LocalWishListItems"));
        if(Cart == null)
           Cart = new Array();

           let selectedProduct = Cart.find(product => product.ProductID === ProductID);
           if(selectedProduct == null)
           {

              Cart.push({ProductID:ProductID,ProductName:ProductName,ProductImage:ProductImage,Qty:Qty,Rate:Rate,StockStatus:StockStatus});
              localStorage.removeItem("LocalWishListItems");
              localStorage.setItem("LocalWishListItems",JSON.stringify(Cart));

              toast.success("Item Added to WishList");
           }
           else {
              toast.warning("Item is already in WishList");
           }


     }

     PlusQty = () => {
        this.setState({
            qty:this.state.qty+1
        })
    }

    MinusQty = () => {
        if(this.state.qty > 1)
        {
            this.setState({
                qty:this.state.qty-1
            })
        }
    }

    CheckCardItem(ID)
    {
       let checkcart=false;
       var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
       if(Cart && Cart.length > 0) {
          for (const cartItem of Cart) {
             if (cartItem.ProductID === ID) {
                checkcart = true
             }
          }
       }
       return checkcart;
    }
    CheckWishList(ID)
    {
       let wishlist=false;
       var Wish = JSON.parse(localStorage.getItem("LocalWishListItems"));

       if(Wish && Wish.length > 0) {
          for (const wishItem of Wish) {
             if (wishItem.ProductID === ID) {
                wishlist = true
             }
          }
       }
       return wishlist;
    }

    componentDidMount()
    {
        


        if(!this.state.GetDoctorWorkingHour)
        {
            this.GetDoctorWorkingHour(this.props.product.DoctorId)
        }
        
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }

      handleScroll(event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

        if(scrollTop > 490)
        {            
           // document.getElementById("ContanierTable").setAttribute("class","product-top-right col-sm-5 profile-screen");
            document.getElementById("table").setAttribute("class","row boxDoctorProfile sticky-sidebar sidebar");
            //document.getElementById("Booking").setAttribute("class","col-12 boxDoctorProfile sticky-Booking");
        } else {
           // document.getElementById("ContanierTable").setAttribute("class","product-top-right col-sm-5 profile-screen");
            document.getElementById("table").setAttribute("class","row boxDoctorProfile sidebar");
        }
      }

     

    GetDoctorWorkingHour (doctorId){

        axios.get('https://api.tabeeboman.com/TabebApi/DoctorNew/GetDoctorWorkingHour?doctorId='+doctorId)
          .then(resp => 
            
            {
                if (resp.data.StatusMessage=='OK') {
                    this.setState({GetDoctorWorkingHour:resp.data.DoctorWorkingHours[0]})
                }
                else {
                
                    // dispatch({ type: GET_DOCTORS_HOME_FAILED, errorHome: data.ErrorMessage})
                }
            }
            
            )
          .catch(error => console.error(error))
  
  }

  onBookingSubmit(){
    if(this.state.fieldvalue)
   {
       
        const fieldvalue=this.state.fieldvalue
        localStorage.setItem("DataUser",JSON.stringify(fieldvalue));
        
        
        
    }
  }
  



    render() {
        const { photoIndex, isOpen  } = this.state;
        const qty=this.state.qty;
        const {product} = this.props;
        const images=[];
        const doctorPath='https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/';
        const HospitalImagePath= 'https://admin.tabeeboman.com/Documents/HospitalPictures/Pictures/';
        const ImageOtherPath ="https://admin.tabeeboman.com/Documents/DoctorPictures/Other/";
        const SpecImagNat='https://admin.tabeeboman.com/Documents/Flags/';
        const hospitalImg='https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/';
        const { t ,i18n} = this.props;
        //const DoctorImageList=JSON.parse(product.ImageData);
        const Specializations=product.Specialization!='[]'?JSON.parse(product.Specialization):null;
        const Services=product.Services!='[]'?JSON.parse(product.Services):null;
        const LanguagesClass=product.LanguagesClass 
        const InsurancesClass=product.Insurances!='[]'?JSON.parse(product.Insurances):null;
        const VideosClass=[]
        
        
            product.HospitalLogo&&
            images.push(hospitalImg+product.HospitalLogo)
          
           
        
        {JSON.parse(product.HospitalImages).length>0&&
            JSON.parse(product.HospitalImages).map((pic)=>
            {pic.FileUrl.startsWith("~/Documents/")?
                images.push(HospitalImagePath+pic.FileUrl.slice(38, 100))
            :
            images.push(ImageOtherPath+pic.FileUrl)
        }
            
        )}
        {JSON.parse(product.Videos).length>0&&
            (         
                JSON.parse(product.Videos).map((vid)=>
                { VideosClass.push(vid.FileUrl)}
            )
        )}
        
        

        let rat=[];
        let rating=(!product.ReviewAvg||product.ReviewAvg==0)?5:product.ReviewAvg;
        let i = 1;
        while (i <= 5) {
            if(i<=rating)
            {
                rat.push(<i className="fa fa-star" />);
            }
            else
            {
                rat.push(<i className="fa fa-star-o" />);
            }
            i += 1;
        };
        const classStyle=(i18n.language.toString()==='ar'?'product-content-top single-product-ar':'product-content-top single-product-en')

        return (
         <section>
           
         <div className={classStyle} style={{backgroundColor:'#f6f6f6',}}>
        
                <Row>
                
                    <div className="product-top-left col-md-7 profile-screen" >
                        <div className="boxDoctorProfile"> 
                        <div className="product_meta subTitle">
                                     <span>
                                        <FaUserMd style={{width:40,height:40,color:'#002b4e',padding:5}}/><label style={{color:"#002b4e"}}>{t("Doctors")}:</label>
                                    </span>
                                  
                        
                          

                       </div>
                       <hr/>
                            
                        <DoctorSliderHospital settings={Doctorslider} Doctors={JSON.parse(product.doctorList)}/>
                                            
                                        
                                            {/* <div className="product-rating">
                                                <div className="star-rating">
                                                    {rat}
                                                
                                                {product.ReviewCount>0&&<a href="#PatientrReviewClass">
                                                 <FaRegThumbsUp className="search_doctor_review_icon"/>({product.ReviewCount})</a>}
                                            </div>
                                            </div> */}
                                            
                        
                            
                                   
                                  

                   

                
                    </div>
                        
                        { (Services||Specializations||InsurancesClass||product[t("AboutHospitalTitle")])&&     
                       <div className="row boxDoctorProfile">
                       <div className="product_meta col-auto">
                                                         
                                                        
                                                                {Services ?
                                                                <span className="posted_in subTitle">
                                                                    <FaMedkit style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                <label style={{color:"#002b4e"}}>{t("Services")}:</label>
                                                                <hr/>
                                                                {
                                                                            
                                                                            <ul className="spec_list_ul" style={{textAlign:'initial'}}>
                                                                            
                                                                                    {Services.map((service, index) =>
                                                                                    <li className="spec_list_li">
                                                                                        <span style={{padding:5,color:'#909090'}}>{service[t("ServiceName")]}</span>
                                                                                    </li>
                                                                                    )}
                                                                                
                                                                                </ul>
                                                                        }
                                                                <hr/>  
                                                                </span>: null}
                                                                
                                                        {Specializations?
                                                                <span className="subTitle">
                                                                             <FaUserMd style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                             <label style={{color:"#002b4e"}}>{t("Specializations")}:</label>
                                                                             <hr/>
                                                                {
                                                                            
                                                                            <ul className="spec_list_ul" style={{textAlign:'initial'}}>
                                                                           
                                                                                    {Specializations.map((Spec, index) =>
                                                                                    <li className="spec_list_li">
                                                                                        <span style={{padding:5,color:'#909090'}}>{Spec[t("SpecializationName")]}</span>
                                                                                    </li>
                                                                                    )}
                                                                                
                                                                                </ul>
                                                                        }
                                                                <hr/>    
                                                                </span>: null}
                                                            
                                                            {InsurancesClass ?
                                                                <span className="posted_in subTitle">
                                                                    <FaMedkit style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                <label style={{color:"#002b4e"}}>{t("Insurances")}:</label>
                                                                <hr/>
                                                                {
                                                                            
                                                                            <ul className="spec_list_ul" style={{textAlign:'initial'}}>
                                                                            
                                                                                    {InsurancesClass.map((insur, index) =>
                                                                                    <li className="spec_list_li">
                                                                                        <span style={{padding:5,color:'#909090'}}>{insur[t("InsuranceCompany")]}</span>
                                                                                    </li>
                                                                                    )}
                                                                                
                                                                                </ul>
                                                                        }
                                                                    
                                                                </span>: null} 
                                                                
                                                                {product[t("AboutHospitalTitle")] ?
                                                                <span className="posted_in subTitle">
                                                                    <FaUniversity style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                    <label style={{color:"#002b4e"}}>{t("AboutHospital")}:</label><br/>
                                                                    <hr/>
                                                                    <small style={{color:"#009bde"}} className={'subheaderDoctor'}>{t("SlugnAboutHospital")}</small>
                                                                    <p className="">{product[t("AboutHospitalTitle")]}</p>
                                                                    <hr/>
                                                                </span>  :null} 
                                                               
                                                                {/* {product.Education ?
                                                                <span className="posted_in">
                                                                   <FaGraduationCap style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                    <label style={{color:"#002b4e"}}>Education:</label><br/>
                                                                    <small style={{color:"#009bde"}} className={'subheaderDoctor'}>Information about the doctor and overview of the past experiences.</small>
                                                                    <p className="">{product.Education}</p>
                                                                    <hr/>
                                                                </span>  :null}   */}
                                                                
                                                        </div>
                       </div>
                          }
           
                 
                {product.HospitalReview!='[]'&&   
                 <div className='row boxDoctorProfile' id='PatientrReviewClass'>
                    
                                <div className="product_meta" style={{margin:20}}>
                                    <span style={{textAlign:'initial'}}>
                                        <MdRateReview style={{width:40,height:40,color:'#002b4e',padding:5,}}/><label style={{color:"#002b4e"}}>{t('PatientReviews')}:</label>
                                    </span>
                                   <hr/>
                                    <ReviewDoctorHospital  ReviewDoctor={product.HospitalReview}/>
                                        </div>

                    </div>}
                {images.length>1&&
                   <div className='boxDoctorProfile'>
                       <div className="product_meta subTitle">
                                     <span>
                                        <FaImages style={{width:40,height:40,color:'#002b4e',padding:5}}/><label style={{color:"#002b4e"}}>{t("Images")}:</label>
                                    </span>
                                   <hr/>
                        
                          

                       </div>
                                   
                             
                   
                   <div className="TabeebOman-product-images">
                        <div className="TabeebOman-product-images-wrapper TabeebOman-gallery-style-default TabeebOman-gallery-thumb_position-bottom TabeebOman-gallery-thumb_vh-horizontal">
                            <div className="TabeebOman-product-gallery TabeebOman-product-gallery--with-images slick-carousel" style={{height:400,}}>
                            <Slider {...settings} className="TabeebOman-product-gallery__wrapper popup-gallery">
                                <div className="TabeebOman-product-gallery__image">
                                        <img src={this.state.newImage} alt={product.HospitalName} placeholder={loadingImage} error={errorImage} className="imgSliderZyad" />
                                </div>
                            </Slider>
                            <div className="TabeebOman-product-gallery_buttons_wrapper">
                                <div className="TabeebOman-product-gallery_button TabeebOman-product-gallery_button-zoom popup-gallery" onClick={() => this.setState({ isOpen: true })} >
                                <Link to="#" className="TabeebOman-product-gallery_button-link-zoom">
                                    <i className="fa fa-arrows-alt" />
                                </Link>
                                </div>
                            </div>
                            </div>
                            <div className="TabeebOman-product-thumbnails">
                                <Slider {...productslider} className="TabeebOman-product-thumbnails__wrapperZy">
                                    {images.map((pictureimage,index) =>
                                        <div className="TabeebOman-product-thumbnail__image">
                                            <Link  onMouseOver={() => this.changePreviewImage(pictureimage)} >
                                                <img src={pictureimage} placeholder={loadingImage} error={errorImage} className="img-fluid" style={{width:103,height:60}}/>
                                            </Link>
                                        </div>
                                    )}
                                </Slider>
                            </div>
                            <div className="clearfix" />
                        </div>
                        </div>
                  
                  
                   </div>
                    }

{VideosClass.length>0&&
                   <div className='boxDoctorProfile'>
                       <div className="product_meta subTitle">
                                     <span>
                                        <FaVideo style={{width:40,height:40,color:'#002b4e',padding:5}}/><label style={{color:"#002b4e"}}>{t("Videos")}:</label>
                                    </span>
                                   <hr/>
                        
                          

                       </div>
                                   
                       
                       <div className='gallery-style-default' style={{height:420,}}>
                           <div className="product-thumbnails">

                          
                            <Slider {...settingsVideo} >
                            {VideosClass.map((pictureimage,index) =>
                                        <div  style={{padding:10}}>
                                             
                                                
                                                    <iframe className="embed-responsive-item videoSliderZyad" src={pictureimage} allowFullScreen />
                                                
                                        </div>
                                    )}
                                
                            </Slider>
                               </div>
                            </div>
                        </div>
                      
                  
                   
                    }


                    </div> 
                    <div className="product-top-right col-sm-5 profile-screen" id='ContanierTable'>
                                        <div className='row boxDoctorProfile sidebar' id='table'>
                                               
                                             <div className="table-container-allZyad">
                                            
                                    <div className="hospital-region" style={{textAlign:'initial'}}>
                                                <a href="" >
                                                    <div className="media-left">
                                                        <i className="fa fa-hospital-o a_color fa-3x"></i>
                                                    </div>
                                                            <div className="media-body">
                                                                    <span className="h5 text-primary1">{product[t("HospitalName")]}</span>
                                                                    <br/>
                                                                    <span className="text-primary1">
                                                                    {product[t("WilayatName")]}, {product[t("RegionName")]}
                                                                    </span>
                                                            </div>
                                                </a>
                                                
                                    </div>

                                   { product.WorkingDays?
                                            <HospitalScheduler  HospitalWorkingDays={product.WorkingDays}/>
                                            :'loading...'
                                    }  

                           
                                


                        </div>
                      
                                                            
                 
                                                   
                                            </div>
                                        
                    
                    </div>
              
               </Row>
         </div> 

             
           
        <div>


            {isOpen && (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                enableZoom={false}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
              />
            )}
          </div>

        </section>




        )
    }
}
export default withTranslation("translations")(PostDetail);

