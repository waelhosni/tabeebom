
/*
* Doctor Profile Page
*/
import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Link } from "gatsby"
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';
import ReactCardFlip from 'react-card-flip';
import { FiPhoneCall,FiChevronRight } from 'react-icons/fi';
import DoctorScheduler from './DoctorScheduler'
import axios from 'axios'
import ReviewDoctor from './ReviewDoctor';
import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
import { MdRateReview } from 'react-icons/md';
import { withTranslation, Trans } from "react-i18next";
// import { Redirect } from 'react-router';


import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';

import { FaUniversity ,FaGraduationCap,FaComment,
    FaUserMd,FaMedkit,FaEye,FaFemale,FaMale,FaImages,
    FaVideo,FaRegThumbsUp,FaCalendarAlt} from 'react-icons/fa';

import { GiCancel } from 'react-icons/gi';

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

  const settingsVideo = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
  };
  

  class PostDetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.AddToCart = this.AddToCart.bind(this);
        this.AddToWishList = this.AddToWishList.bind(this);
        this.state = {
          photoIndex: 0,
          isOpen: false,
          qty:1,
          profileImage:'https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/'+props.product.ImageData,
          newImage:'https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/'+props.product.ImageData,
          isFlipped: false,
          GetDoctorWorkingHour:null,
          fieldvalue:{},
          appointmentTime:'',
          newVideo:'',
          nav1: null,
          nav2: null,

             fullName:'',
            errorMessageFullName:'',

            phoneNumber:'',
            errorMessagePhone:'',
            redirect:false,

            AdditionalMessage:'',

            selectedTime:'',
            selectedDate:'',
            selectedDayOne:'',
            appointmentData:'',
            patientOrg:'',
            
            modalCall: false,
        };
       
        this.FlippedClick = this.FlippedClick.bind(this);
        this.SetAppointmentTime = this.SetAppointmentTime.bind(this);
        this.ReviewClassRef = React.createRef();
        this.fullNameChangeHandler = this.fullNameChangeHandler.bind(this);
        this.PhoneChangeHandler= this.PhoneChangeHandler.bind(this);
        this.AdditionalMessageChangeHandler= this.AdditionalMessageChangeHandler.bind(this);

        this.BookAppointment = this.BookAppointment.bind(this);
         this.toggleCall = this.toggleCall.bind(this);
      }
      toggleCall() {
        this.setState(prevState => ({
            modalCall: !prevState.modalCall
        }));
    }

      handleChange(field, e){
        let fieldvalue=this.state.fieldvalue;
        fieldvalue[field] = e.target.value;
        this.setState({fieldvalue});
      }


      SetAppointmentTime(appointmentTime){
          this.setState({appointmentTime})
      }
      FlippedClick(time,date,dayOne){
        //e.preventDefault();
        
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped ,selectedTime:time,selectedDate:date,selectedDayOne:dayOne}));
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

        this.ReviewClassRef.current&&
        this.ReviewClassRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }

      handleScroll(event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

        if(scrollTop > 100)
        {           
            document.getElementById("table").setAttribute("class","row boxDoctorProfile sticky-sidebar sidebar");
            if (window.innerWidth>= 720) 
            {
                document.getElementById("ContanierTable").setAttribute("class","product-top-right col-sm-5 profile-screen")
                document.getElementById("btn_booking").setAttribute("class","hiden_btn")
            }
           
        } else {
            
            document.getElementById("table").setAttribute("class","row boxDoctorProfile sidebar");
           if (window.innerWidth <= 720) 
            {
                document.getElementById("ContanierTable").setAttribute("class","product-top-right col-md-7 profile-screen")
                document.getElementById("btn_booking").setAttribute("class","row boxDoctorProfile sticky-sidebar")
            }
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

  BookAppointment(event)
  {

   
    if (this.state.fullName.trim().length == 0) {

        this.setState({errorMessageFullName:'Name is required'});
        return;
      }
     
      else{
  
        this.setState({errorMessageFullName:''});
        
        
      }
    //////////////////////////////////

      const numberRegex=/^[97]\d{7}$/;
      if ((this.state.phoneNumber) && (!numberRegex.test(this.state.phoneNumber) )) {
        this.setState({errorMessagePhone:'Mobile Number should start with 9 or 7'});
        return;
        }
      else if(!this.state.phoneNumber)
      {
        this.setState({errorMessagePhone:'Mobile Number is required'});
        return;
      }
      else{
        this.setState({errorMessagePhone:''});
        
      }


    
       this.AppointmentAction()
    

  }
  fullNameChangeHandler(event){

    let fullName=event.target.value;
    this.setState({fullName:fullName});

    if (fullName.trim().length == 0) {

      this.setState({errorMessageFullName:'Name is required'});
    }
   
    else{

      this.setState({errorMessageFullName:''});
    }
    

  };

  PhoneChangeHandler(event) {
    
    let phoneNumber=event.target.value;

    const numberRegex=/^[97]\d{7}$/;
    
    this.setState({phoneNumber:phoneNumber});

    if ((phoneNumber) && (!numberRegex.test(phoneNumber) )) {

      this.setState({errorMessagePhone:'Mobile Number should start with 9 or 7'});
      
     
    }
    else if(!phoneNumber)
    {
    
      this.setState({errorMessagePhone:'Mobile Number is required'});


    }
    else{

      
      this.setState({errorMessagePhone:''});
    }
    

  };

  AdditionalMessageChangeHandler(event) {
    
    let AdditionalMessage=event.target.value;
    this.setState({AdditionalMessage:AdditionalMessage});
  }


  AppointmentAction  () 
  {
    axios.post(
          'https://api.tabeeboman.com/TabebApi/Appointment/insert_AppointmentInformationLocal?',
          {
            PatientId: '',//add when add login
            PatientName:this.state.fullName,
            ContactNo:this.state.phoneNumber,
            DoctorId: this.props.product.DoctorId,
            HospitalId: this.props.product.HospitalId,
            OfferId: '',
            ReservationNo: 0, //IsConsultation 1 or 0
            TokenNo: '0', //From Web 0, Mobile 1
            AppointmentDate: this.state.selectedDate,
            AppointmentTime:this.setTime(this.state.selectedTime),
            AppointmentTimeTo:'',
            VisitTimeId: '0', //selected visit time id Not working Stopped
            AdditionalMessage: this.state.AdditionalMessage, // free text
            CreatedBy: '', //PatientId
            CreatedIP: '',
            HospitalEmail:this.props.product.Email,
            TokenNoNotifPatient:'',
            AppointmentBookingType:'1',//doctor 1 hospital 2 offer 3
            
                  }
        )
        .then(resp => 
          {
            const appointmentData={
                PatientName:this.state.fullName,
                ContactNo:this.state.phoneNumber,
                DoctorId: this.props.product.DoctorId,
                HospitalId: this.props.product.HospitalId,
                AppointmentDate: this.state.selectedDate,
                AppointmentTime:this.setTime(this.state.selectedTime),
                AdditionalMessage: this.state.AdditionalMessage, 

            }
            if(resp.data.Status==1)
            { 
                this.setState({redirect: true,appointmentData:appointmentData,patientOrg:resp.data.patientList[0]});
           
          }
          else{
              
              console.log('Appointment error')
          }
        }
          
          )
          .then(resp=>
          {
            if(resp.data.Status==1)
            { 
            this.setState({redirect: true});

            }
          }

          )
        .catch(error => {console.log('General error: '+error)});
    }
  
    setTime(time) {
        return ((time.substring(6, 7) == "م" ? (parseInt(time.substring(0, 2)) + 12) : time.substring(0, 2))+ ':'+time.substring(3, 5)+":00");
        }


    render() {
        const { t ,i18n} = this.props;
        const { photoIndex, isOpen  } = this.state;
        const qty=this.state.qty;
        const {product} = this.props;
        const images=[];
        const doctorPath='https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/';
        const HospitalImagePath= 'https://admin.tabeeboman.com/Documents/HospitalPictures/Pictures/';
        const ImageOtherPath ="https://admin.tabeeboman.com/Documents/DoctorPictures/Other/";
        const SpecImagNat='https://admin.tabeeboman.com/Documents/Flags/';
        const hospitalImg='https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/';

        //const DoctorImageList=JSON.parse(product.ImageData);
        const Specializations=product.specializationClass;
        const Services=product.ServicesClass
        const LanguagesClass=product.LanguagesClass 
        const InsurancesClass=product.InsurancesClass
        const VideosClass=[]
        {
            product.ImageData&&
            images.push(doctorPath+product.ImageData)
        }   
           
        
        {product.OtherImagesClass&&
            product.OtherImagesClass.map((pic)=>
            images.push(ImageOtherPath+pic.FileUrl)
            
        )}
        {product.VideosClass&&
            (         
                product.VideosClass.map((vid)=>
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


        // if (this.state.redirect) {
        //     return <Redirect  to={{
        //         pathname: '/SuccessScreen',
        //         state: { appointmentData: this.state.appointmentData,patientOrg: this.state.patientOrg,DoctorId:product.DoctorId }
        //     }} />;
        //   }


        const classStyle=(i18n.language.toString()==='ar'?'product-content-top single-product-ar':'product-content-top single-product-en')

       
        return (
         <section>
            
         <div className={classStyle} style={{backgroundColor:'#f6f6f6',marginTop: -40,}}>
                <Row>
                
                    <div className="product-top-left col-md-7 profile-screen" >
                 
                    <div className='hiden_btn' id='btn_booking' style={{zIndex:1, top: 65}}>
                <div className="element_group_multiple" >
                                                               
                                                            
                                                                                            
                                                               <div className="item element_group_3 valign_top">
                                                               
                                                                   <a href="#ContanierTable" >
                                                                       <span className="btn btn_dark btn-block search_doctor_agenda_btn">
                                                                           <FaCalendarAlt className="ico-phone-dark search_doctor_agenda_icon"/>
                                                                           <p className="search_doctor_agenda_icon_text">{t("Book")}</p>
                                                                       </span>
                                                                   </a>
                                                               </div>
                                                               <div className="item element_group_3 valign_top">
                                                                   <Link className="ver_telefono text-center" to="#" onClick={this.toggleCall} data-toggle="modal" data-target="#" >
                                                                       <span className="btn btn2 btn_dark btn-block search_doctor_agenda_btn">
                                                                       <FiPhoneCall className="ico-phone-dark search_doctor_agenda_icon"/>
                                                                           <p className="search_doctor_agenda_icon_text">{t("Call")}</p>
                                                                       </span>
                                                                   </Link>
                                                               </div>
                               
                                                                <Modal isOpen={this.state.modalCall} toggle={this.toggleCall} className="modal-login f">
                                                                       <ModalHeader toggle={this.toggleCall}>
                                                                           <h4 className="mb-0">{product.DoctorName }</h4>
                                                                       </ModalHeader>
                                                                       <ModalBody>
                                                                           <div>
                                                                                   {t("msgCall_model")}
                                                                           </div>
                                                                           
                                                                       </ModalBody>
                                                                       <ModalFooter >
                                                                           <h4 className="mb-0">{t("TabeebOman")}</h4>
                                                                       </ModalFooter>
                                                                   </Modal>
                               
                               
                                                           </div>
                                                                                           
                </div>
               
                        <div className="row boxDoctorProfile"> 
                            <div className="TabeebOman-product-images col-5">
                            <div className="TabeebOman-product-images-wrapper TabeebOman-gallery-style-default TabeebOman-gallery-thumb_position-bottom TabeebOman-gallery-thumb_vh-horizontal">
                                <div className="TabeebOman-product-gallery TabeebOman-product-gallery--with-images slick-carousel">
                            
                                    <div className="TabeebOman-product-gallery__image">
                                            {product.ImageData?
                                            (<img src={this.state.profileImage} placeholder={loadingImage} error={errorImage} alt={product.DoctorName} className="img-thumbnail" style={{borderRadius:10}}/>)
                                            :
                                            (product.GenderName=="Female"?
                                            <img placeholder={loadingImage} error={errorImage} src={require(`../assets/images/EmptyPicDoctorFemale.jpg`)} alt={product.DoctorName} className="img-thumbnail" style={{width:320,height:350,borderRadius:10}}/>
                                            :
                                            <img  placeholder={loadingImage} error={errorImage}  src={require(`../assets/images/EmptyPicDoctorMale.jpg`)} alt={product.DoctorName} className="img-thumbnail" style={{width:320,height:350,borderRadius:10}}/>
                                            )}
                                    </div>
                                
                                <div className="TabeebOman-product-gallery_buttons_wrapper" style={{borderRadius:10,shadowOffset: { width: 1, height: 1 },
                                                                                                                                shadowColor: '#222',
                                                                                                                                shadowOpacity: 0.9,
                                                                                                                                shadowRadius: 2,}}>
                                    <div className="TabeebOman-product-gallery_button TabeebOman-product-gallery_button-zoom popup-gallery" onClick={() => this.setState({ isOpen: true })} >
                                    <Link to="#" className="TabeebOman-product-gallery_button-link-zoom">
                                        <i className="fa fa-arrows-alt" />
                                    </Link>
                                    </div>
                                </div>
                                </div>
                            
                                <div className="clearfix" />
                            </div>
                            </div>
                            <div className="summary entry-summary col-7">
                            <samll className='subTitle' style={{color:'#009bde'}}>{product[t('DoctorTitleName')]}</samll>
                                 <div style={{flexDirection:'row',display:'flex'}}>
                                 <h1 className="tabeebTitleProfile" style={{color:'#002b4e'}}> {product[t('DoctorName')]}</h1> 
                                    <p className="col" style={{color:'#1890ff'}}> <FaEye style={{width:30,height:30,color:'#1890ff',padding:5}}/>{product.DoctorView} </p> 
                                </div>
                        
                                            <small className="subTitle" style={{color:'#888'}}>{product[t('MainSpecializationName')]}</small>
                                            <p className='subTitle' style={{color:'#888'}}>{product[t('Overview')]}</p>
                                            <div className='tabeebTitle subTitle'> 
                                                    {product.GenderName=="Male"?
                                                    <FaMale style={{width:40,height:30,color:'#002b4e',padding:5}}/>:<FaFemale style={{width:40,height:30,color:'#002b4e',padding:5}}/>}
                                                    &nbsp;
                                                        <img placeholder={loadingImage} error={errorImage} src={SpecImagNat+product.NationalityName+'.png'} alt={product.NationalityName} className="iconNational"/>
                                            </div>
                                            <div className="product-rating subTitle">
                                                <div className="star-rating">
                                                    {rat}
                                                
                                                {product.ReviewCount>0&&<a ref={this.ReviewClassRef} href="#PatientrReviewClass">
                                                 <FaRegThumbsUp className="search_doctor_review_icon"/>({product.ReviewCount})</a>}
                                            </div>
                                            </div>
                                            {LanguagesClass ?
                                                                <span className="posted_in">
                                                                        <div className='subTitle'>
                                                                        <FaComment style={{width:30,height:30,color:'#002b4e',padding:5}}/>
                                                                             <label style={{color:'#888'}}>{t('PreferredLanguages')} :</label>
                                                                        </div>
                                                                
                                                                
                                                                {
                                                                            
                                                                            <div className="spec_list_ul_Profile" style={{textAlign:'initial'}}>
                                                                            
                                                                                    {LanguagesClass.map((lang, index) =>
                                                                                    <span className="boxLang">
                                                                                        <span style={{padding:5,color:'#fff'}}>{lang[t('LanguageName')]}</span>
                                                                                    </span>
                                                                                    )}
                                                                                
                                                                                </div>
                                                                        }
                                                                    
                                                                </span>
                                                            
                                                                : null}
                        
                       
                                   

                   

                
                    </div>
                    <div className="row marginHospitalTitle" >
                                        <Link className="row" to={`/shop/${product.RegionName}/${product.HospitalId}`}>
                                       
                                    <img src={hospitalImg+product.HospitalLogo} alt={product.NationalityName} className="iconNational" style={{width:50,height:50,borderRadius:100}} placeholder={loadingImage} error={errorImage}/>
                                                                    <h6 style={{color:"#002b4e",alignSelf:'center' ,marginBottom:0,padding:5}}>{product[t('HospitalName')]}</h6>
                                    </Link>
                                     </div>
                    
                        </div>
                        { (Services||Specializations||InsurancesClass||product[t('AboutDoctorTitle')]||product[t('EducationTitle')] )&&     
                       <div className="row boxDoctorProfile">
                       <div className="product_meta col-auto">
                                                         
                                                        
                                                                {Services ?
                                                                <span className="posted_in subTitle">
                                                                    <FaMedkit style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                <label style={{color:"#002b4e"}}>{t("Services")}:</label>  <hr/>
                                                                {
                                                                            
                                                                            <ul className="spec_list_ul shape" style={{textAlign:'initial'}}>
                                                                            
                                                                                    {Services.map((service, index) =>
                                                                                    <li className="spec_list_li">
                                                                                        <span style={{padding:5,color:'#909090'}}>{service[t("ServiceName")]}</span>
                                                                                    </li>
                                                                                    )}
                                                                                
                                                                                </ul>
                                                                        }
                                                                <hr/>  
                                                                </span>: null}
                                                                
                                                        {Specializations ?
                                                                <span className="subTitle">
                                                                             <FaUserMd style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                             <label style={{color:"#002b4e"}}>{t("Specializations")}:</label>  <hr/>
                                                                {
                                                                            
                                                                            <ul className="spec_list_ul shape">
                                                                            
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
                                                                <label style={{color:"#002b4e"}}>{t("Insurances")}:</label>  <hr/>
                                                                {
                                                                            
                                                                            <ul className="spec_list_ul shape">
                                                                            
                                                                                    {InsurancesClass.map((insur, index) =>
                                                                                    <li className="spec_list_li">
                                                                                        <span style={{padding:5,color:'#909090'}}>{insur[t("InsuranceCompany")]}</span>
                                                                                    </li>
                                                                                    )}
                                                                                
                                                                                </ul>
                                                                        }
                                                                    
                                                                </span>: null} 
                                                                
                                                                {product[t('AboutDoctorTitle')] ?
                                                                <span className="posted_in subTitle">
                                                                    <FaUniversity style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                    <label style={{color:"#002b4e"}}>{t("AboutDoctor")}:</label><br/>  <hr/>
                                                                <small style={{color:"#009bde"}} className={'subheaderDoctor'}>{t("SlugnAbout")}</small>
                                                                    <p className="">{product[t('AboutDoctorTitle')]}</p>
                                                                    <hr/>
                                                                </span>  :null} 
                                                               
                                                                {product[t('EducationTitle')] ?
                                                                <span className="posted_in subTitle">
                                                                   <FaGraduationCap style={{width:40,height:40,color:'#002b4e',padding:5}}/>
                                                                    <label style={{color:"#002b4e"}}>{t('Education')}:</label><br/>  <hr/>
                                                                    <small style={{color:"#009bde"}} className={'subheaderDoctor'}>{t("SlugnEduc")}</small>
                                                                    <p className="">{product[t('EducationTitle')]}</p>
                                                                    <hr/>
                                                                </span>  :null}  
                                                                
                                                        </div>
                       </div>
                          }
           
                 
                {product.PatientrReviewClass&&   
                 <div className='row boxDoctorProfile subTitle' id='PatientrReviewClass'>
                    
                                <div className="product_meta" style={{margin:20}}>
                                    <span>
                                        <MdRateReview style={{width:40,height:40,color:'#002b4e',padding:5}}/><label style={{color:"#002b4e"}}>{t("PatientReviews")}:</label>
                                    </span>
                                   <hr/>
                                    <ReviewDoctor  DoctorId={product.DoctorId}/>
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
                    <div className="product-top-right col-sm-5  profile-screen" id='ContanierTable'>
                                        <div className='row boxDoctorProfile sidebar' id='table'>
                                               
                                             <div className="table-container-allZyad">
                                                 <div className="row no_margins">
                        
                                                        <div className="col-7 no_padding">
                                                        <section className="no_margins no_padding default_address_format border_light desk_agenda " >
                                                            <p className="agenda-text-frame agenda-has-padding-left-right-frame subTitle">{t('ClinicAddress')}</p>
                                                            <Link  className="media desk_agenda" data-toggle="modal" data-target="#open_address_map" >
                                                                <div className="media-left">
                                                                    <i className="fa fa-map-marker a_color fa-3x"></i>
                                                                </div>
                                                                <div className="media-body" style={{textAlign:'initial'}}>
                                                                    <span className="text-muted">{product[t("HospitalName")]}</span>
                                                                    <br/>
                                                                    <span className="a_color text_ellipsis no_hover" title="Milton Keynes, Chadwick Drive">
                                                                    {product[t("AreaName")]}, {product[t('RegionName')]}                       </span> 
                                                                </div>   
                                                                </Link>
                                                        </section>
                                                        </div>
                                                        <div className="col-5 agenda-has-padding-left-right-frame" >
                                            
                                                
                                                        <section className="no_margins no_padding default_address_format border_light desk_agenda " style={{width:'fit-content'}}>
                                                        <p className="agenda-text-frame subTitle agenda-has-padding-left-right-frame" style={{textAlign:'initial'}}>{t("Pay_at_my_appointment")}</p>
                                                        <table className="table agenda-table" style={{textAlign:'initial'}}>
                                                            <tbody>
                                                                <tr>
                                                                                                <td className="agenda-table-td">
                                                                    <p className="agenda-label">{t("First_visit")}</p>
                                                                    <p className="agenda-padding-8 agenda-offer"><strong>{!product.ConsultationFee||product.ConsultationFee=="0.000"?'xx.xxx':product.ConsultationFee} {t("OR")}</strong></p>
                                                                </td>
                                                                                                <td className="agenda-table-td">
                                                                    <p className="agenda-label">{t('Waiting_time')}</p>
                                                                    <p className="agenda-padding-8 agenda-offer"><strong>{product.WaitingTime?product.WaitingTime:'xx:xx'} {t('Min')} </strong></p>
                                                                </td>
                                                                                            
                                                            </tr>
                                                        </tbody></table>
                                                        </section>
                                                    </div>
                                                    
                                                    </div>
                                                { this.state.GetDoctorWorkingHour?

                                                        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                                                            
                                                            <DoctorScheduler FlippedClick= {this.FlippedClick} DoctorWorkingHour={this.state.GetDoctorWorkingHour} DoctorProfile={'P'} />

                                                            <div>
                                        <div style={{color: '#009bde',fontWeight: 500,fontSize:18,paddingTop: 10,textAlign:'center'}}>
                                                    {this.state.selectedDayOne}
                                        </div>
                                        <div style={{color: '#009bde',fontWeight: 500,fontSize:18,paddingTop: 10,textAlign:'center'}}>
                                                    {this.state.selectedTime} 
                                        </div>
                                       
                                        <div className="form-grid d-grid">
                                            <div className="left">
                                                <label style={{color:'#888',textAlign:'initial'}} htmlFor="name">{t("Your_Name")} <sup style={{color:'red'}}>* {this.state.errorMessageFullName}</sup></label>
                                                <input type="text" id="name" placeholder={t("Your_Name")} value={this.state.fullName} onChange={this.fullNameChangeHandler} />
                                            </div>
                                            
                                            <div className="left">
                                                <label style={{color:'#888',textAlign:'initial'}} htmlFor="number">{t("Your_Number")} <sup style={{color:'red'}}>* {this.state.errorMessagePhone}</sup></label>
                                                <input type="text" id="number" placeholder={t("Your_Number")} value={this.state.phoneNumber} onChange={this.PhoneChangeHandler} />
                                            </div>
                                        
                                        </div>
                                        <div className="form-textarea">
                                            <label style={{color:'#888',textAlign:'initial'}} htmlFor="message">{t("Your_Message")} </label>
                                            <textarea id="message" placeholder={t("Your_Message")} value={this.state.AdditionalMessage} onChange={this.AdditionalMessageChangeHandler}></textarea>
                                        </div>


                                                            <div className="element_group_multiple" >
                                                            <div className="item element_group_3 valign_top">
                                                                <button   onClick= {() => { this.BookAppointment()}} className="btn btn_dark btn-block search_doctor_agenda_btn" >
                                                                    <FaCalendarAlt className="ico-phone-dark search_doctor_agenda_icon"/>
                                                                            <p className="search_doctor_agenda_icon_text">{t("Book")}</p>
                                                                 </button>  
                                                                 </div>                       
                                                            
                                                                 <div className="item element_group_3 valign_top">
                                                                   <a className="btn btn4 btn_dark btn-block search_doctor_agenda_btn" onClick= {() => { this.FlippedClick()}}>
                                                                      
                                                                       <GiCancel style={{color:'#009bde'}} className="ico-phone-dark search_doctor_agenda_icon"/>
                                                                           <p style={{color:'#009bde'}} className="search_doctor_agenda_icon_text">{t("Cancel")}</p>
                                                                      
                                                                   </a>
                                                                   </div>
                                                               
                                                        </div>
                                   
                            </div>
                                                        
                                                        </ReactCardFlip>
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
export default withTranslation("translations")(PostDetailDoctor);

