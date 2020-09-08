
/**
 * ProductList Widget
 */
import React, { Component } from 'react';
import { Link } from "gatsby"
import { toast, ToastContainer } from 'react-toastify';
import MaleImg from '../assets/images/male.png'
import FemaleImg from '../assets/images/female.png'

import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';
import { FaCalendarAlt,FaHeart,FaRegThumbsUp,FaEye } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { Modal, ModalBody, ModalFooter, ModalHeader, Nav, Navbar, NavbarToggler, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledDropdown } from 'reactstrap';

import DoctorScheduler from './DoctorScheduler'
import axios from 'axios'

import Img from 'react-cool-img';
import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
 import ReactCardFlip from 'react-card-flip';
 import { FiPhoneCall,FiChevronRight } from 'react-icons/fi';
//import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { withTranslation, Trans } from "react-i18next";
// import { Redirect } from 'react-router';

import classnames from 'classnames';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.AddToCart = this.AddToCart.bind(this);
        this.AddToWishList = this.AddToWishList.bind(this);

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: '',
            GetDoctorWorkingHour:null,
            isFlipped: false,

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


        }
        this.FlippedClick = this.FlippedClick.bind(this);

        this.fullNameChangeHandler = this.fullNameChangeHandler.bind(this);
        this.PhoneChangeHandler= this.PhoneChangeHandler.bind(this);
        this.AdditionalMessageChangeHandler= this.AdditionalMessageChangeHandler.bind(this);

        this.BookAppointment = this.BookAppointment.bind(this);
        this.toggleCall = this.toggleCall.bind(this);
       
    }

    setTime(time) {
        return (( (time.substring(6, 7) == "م" || time.substring(6, 8) == "PM")  ? (parseInt(time.substring(0, 2)) + 12) : time.substring(0, 2))+ ':'+time.substring(3, 5)+":00");
        }
    FlippedClick(time,date,dayOne) {

        //e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped ,selectedTime:time,selectedDate:date,selectedDayOne:dayOne}));
      }
    componentDidMount()
    {
        if(!this.state.GetDoctorWorkingHour)
        {
            this.GetDoctorWorkingHour(this.props.product.DoctorId)
        }
    }


   
    toggleCall() {
        this.setState(prevState => ({
            modalCall: !prevState.modalCall
        }));
    }



    AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
        if (Cart == null)
            Cart = new Array();
        let selectedProduct = Cart.find(product => product.ProductID === ProductID);
        if (selectedProduct == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, StockStatus: StockStatus });
            localStorage.removeItem("LocalCartItems");
            localStorage.setItem("LocalCartItems", JSON.stringify(Cart));
            var flag=0;
            if(flag == 0)
            {
                toast.success("Item Added to Cart");
                flag=1;
            }
        }
        else {
            toast.warning("Item is already in Cart");
        }
    }

    

    AddToWishList(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("LocalWishListItems"));
        if (Cart == null)
            Cart = new Array();

        let selectedProduct = Cart.find(product => product.ProductID === ProductID);
        if (selectedProduct == null) {

            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, StockStatus: StockStatus });
            localStorage.removeItem("LocalWishListItems");
            localStorage.setItem("LocalWishListItems", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        }
        else {
            toast.warning("Item is already in WishList");
        }


    }
    CheckCardItem(ID) {
        let checkcart = false;
        var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
        if (Cart && Cart.length > 0) {
            for (const cartItem of Cart) {
                if (cartItem.ProductID === ID) {
                    checkcart = true
                }
            }
        }
        return checkcart;
    }
    CheckWishList(ID) {
        let wishlist = false;
        var Wish = JSON.parse(localStorage.getItem("LocalWishListItems"));

        if (Wish && Wish.length > 0) {
            for (const wishItem of Wish) {
                if (wishItem.ProductID === ID) {
                    wishlist = true
                }
            }
        }
        return wishlist;
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

    render() {
        const { product } = this.props;
        const { t } = this.props;


        let rat = [];
        let rating = (!product.ReviewAvg||product.ReviewAvg==0)?5:product.ReviewAvg;
        let i = 1;
        while (i <= 5) {
            if (i <= rating) {
                rat.push(<i className="fa fa-star" />);
            }
            else {
                rat.push(<i className="fa fa-star-o" />);
            }
            i += 1;
        };

        const DoctorImgPath='https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/';
        const FlagsImgPath='https://admin.tabeeboman.com/Documents/Flags/';
        
        if (this.state.redirect) {
            // return <Redirect  to={{
            //     pathname: '/SuccessScreen',
            //     state: { appointmentData: this.state.appointmentData,patientOrg: this.state.patientOrg, }
            // }} />;
          }

        return (
            <div key={1} className={this.props.layoutstyle}>
                <ToastContainer autoClose={1000}  draggable={false} /> 
                
                 <div className="product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon">
                    <div className="product-inner element-hovered">
                        <div className="col-md-5 right_border_light">

                        <article className="post format-standard">
                            <footer className="entry-footer clearfix">
                            <a className=""> <FaHeart className="ico-phone-dark search_doctor_favo_icon"/>
                            <p className="agenda-text-like">{product.DoctorLikes>0&&product.DoctorLikes + t('Like')}</p>
                            
                            </a>
                            <div className="entry-social share pull-right">
                                <a  className="share-button" data-title="Share it on">
                                <i className="fa fa-share-alt" />
                                </a>
                                <ul className="single-share-box mk-box-to-trigger">
                                <li>
                                    <a href="https://www.facebook.com" className="share-link facebook-share" target="_blank">
                                    <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/" className="share-link twitter-share" target="_blank">
                                    <i className="fa fa-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/tabeeb.oman/" className="share-link linkedin-share" target="_blank">
                                    <i className="fa fa-instagram" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://youtube.com/" className="share-link google-share" target="_blank">
                                    <i className="fa fa-youtube" />
                                    </a>
                                </li>
                                
                                </ul>
                            </div>
                            </footer>
                        </article>

                        
                        <div className="product-thumbnail">
                            <div className="product-thumbnail-inner">
                                
                                <Link to="/DoctorDetail" 
                                    state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                                   
                                        <div className="product-thumbnail-main">
                                        <noscript> <Img  placeholder={loadingImage} error={errorImage}  src={product.ImageData?DoctorImgPath+product.ImageData:product.GenderName=='Male'?MaleImg:FemaleImg} alt={product[t("DoctorName")]} className="img-fluid" /></noscript>
                                            <Img  placeholder={loadingImage} error={errorImage}  src={product.ImageData?DoctorImgPath+product.ImageData:product.GenderName=='Male'?MaleImg:FemaleImg} alt={product[t("DoctorName")]} className="img-fluid" />
                                        </div>
                                        
                                   
                                    {product.OtherImages ?
                                        <div className="product-thumbnail-swap">
                                              <noscript> <Img  placeholder={loadingImage} error={errorImage}  src={product.ImageData?DoctorImgPath+product.ImageData:product.GenderName=='Male'?MaleImg:FemaleImg} 
                                            alt={product[t("DoctorName")]} className="img-fluid" /></noscript>
                                            <Img  placeholder={loadingImage} error={errorImage}  src={product.ImageData?DoctorImgPath+product.ImageData:product.GenderName=='Male'?MaleImg:FemaleImg} 
                                            alt={product[t("DoctorName")]} className="img-fluid" />
                                        </div>
                                        :
                                        null
                                    }
                                </Link>
                                <div className="agenda-view">
                                    {(product.DoctorView)>0&&<FaEye className="ico-phone-dark search_doctor_view_icon"/>}
                                    <p className="agenda-text-like">{(product.DoctorView)>0&& product.DoctorView + ' '+ t("View")}</p>
                                </div>
                                <div className="agenda-contrary">
                                    {product.NationalityName&&FlagsImgPath&&
                                    <><noscript><Img  placeholder={loadingImage} error={errorImage} src={FlagsImgPath+product.NationalityName+'.png'} alt={product[t("DoctorName")]} className="agenda-contrary-img" /></noscript>
                                    <Img  placeholder={loadingImage} error={errorImage} src={FlagsImgPath+product.NationalityName+'.png'} alt={product[t("DoctorName")]} className="agenda-contrary-img" /></>}
                                    <p className="agenda-text-like">{product.NationalityName&&product.NationalityName }</p>
                                </div>
                                
                            </div>

                            <div className="product-info">
                            {/* {product.tags ?
                                <span className="TabeebOman-product-category">
                                    {product.tags.map((tag, index) =>
                                        <span>{tag}{index === product.tags.length - 1 ? '' : ', '}</span>
                                    )}
                                </span>
                                : null} */}
                            {product.DoctorName ?
                                <h3 className="product-name">
                                   <Link to="/DoctorDetail" 
                                    state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                                    {product[t("DoctorTitleName")]}  {product[t("DoctorName")]}
                                    </Link>

                                    
                                </h3>
                                : null}
                            
                            <div className="product-rating"><span className="mainSpec"> {product[t("MainSpecializationName")]}</span>{rat}
                            {product.DoctorReview>0&&<Link to="/DoctorDetail" 
                                    state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                            <FaRegThumbsUp className="search_doctor_review_icon"/>({product.DoctorReview})</Link>}
                            </div>
                                 {/* {product.Overview ?
                                <h7 className="product-name">
                                    {product.Overview}
                                    
                                </h7>
                                : null} */}
                            {product.Services?
                            <span className="TabeebOman-product-category">
                                    {JSON.parse(product.Services).slice(0, 5).map((Service, index) =>
                                        <span>{Service[t("ServiceName")]}{index === JSON.parse(product.Services).length - 1 ? '' : ', '}</span>
                                    )}
                            </span>
                            :
                            product.specialization&&
                            <span className="TabeebOman-product-category">
                                    {JSON.parse(product.specialization).slice(0, 5).map((specialization, index) =>
                                        <span>{specialization[t("SpecializationName")]}{index === JSON.parse(product.specialization).length - 1 ? '' : ', '}</span>
                                    )}
                            </span>

                            }

                            {product.Languages ?
                            
                                <span className="TabeebOman-product-language">
                                    {JSON.parse(product.Languages).map((Language, index) =>
                                    
                                      <span key={index}>{Language[t("LanguageName")]}{index === JSON.parse(product.Languages).length - 1 ? '' : ', '}</span>
                                    )}
                                </span>
                                : null}



                            
                              
                                {/* {product.ConsultationFee ?
                                    <span className="price">
                                        <ins>
                                            <span className="price-amount amount">
                                                <span className="currency-symbol">OR. </span>{product.ConsultationFee.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                            </span>
                                        </ins>
                                    </span>
                                    : null} */}
                                
                            
                            <div className="product-actions product-actions-list">

                            <div className=" text-center">
                     
                            <div className="element_group_multiple" >
                                                               
                                <div className="item element_group_3 valign_top">
                                <Link to="/DoctorDetail" 
                                    state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                                        <span className="btn btn_dark btn-block search_doctor_agenda_btn">
                                            <FaCalendarAlt className="ico-phone-dark search_doctor_agenda_icon"/>
                                            <p className="search_doctor_agenda_icon_text">{t("Book")}</p>
                                        </span>
                                    </Link>
                                </div>
                                                             
                                <div className="item element_group_3 valign_top">
                                    <a className="ver_telefono text-center" data-doctor_modal="addresses" >
                                        <span className="btn btn1 btn_dark btn-block search_doctor_agenda_btn">
                                        <BsFillChatDotsFill className="ico-phone-dark search_doctor_agenda_icon"/>
                                            <p className="search_doctor_agenda_icon_text">{t("e_Consultation")}</p>
                                        </span>
                                    </a>
                                </div>
                                <div className="item element_group_3 valign_top">
                                    <a className="ver_telefono text-center" to="#" onClick={this.toggleCall} data-toggle="modal" data-target="#" >
                                        <span className="btn btn2 btn_dark btn-block search_doctor_agenda_btn">
                                        <FiPhoneCall className="ico-phone-dark search_doctor_agenda_icon"/>
                                            <p className="search_doctor_agenda_icon_text">{t("Call")}</p>
                                        </span>
                                    </a>
                                </div>

                                 <Modal isOpen={this.state.modalCall} toggle={this.toggleCall} className="modal-login f">
                                        <ModalHeader toggle={this.toggleCall}>
                                            <h4 className="mb-0">{product[t("DoctorName")] }</h4>
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
                            




                            </div>
                            {product.AboutDoctor ?
                                <div className="product-details__short-description">
                                    <p>{product.AboutDoctor}
                                    </p>
                                </div>
                                : null}
                        </div> 
                       


                            <div className="product-actions">
                                <div className="product-actions-inner">
                                    <div className="product-action product-action-add-to-cart">
                                        {!this.CheckCardItem(product.DoctorId) ?
                                            <a onClick={() => this.AddToCart(product.DoctorId, product[t("DoctorName")], product.pictures[0], 1, product.ConsultationFee, "In Stock")} className="button add_to_cart_button" rel="nofollow">Add to
                                       cart</a>
                                            :
                                            <Link to="/ShopingCart" className="button add_to_cart_button" rel="nofollow">View Cart</Link>
                                        }
                                    </div>
                                    <div className="product-action product-action-wishlist">
                                        {!this.CheckWishList(product.DoctorId) ?
                                            <a onClick={() => this.AddToWishList(product.DoctorId, product[t("DoctorName")], product.pictures[0], 1, product.ConsultationFee, "In Stock")} className="add_to_wishlist" data-toggle="tooltip" data-original-title="Wishlist" data-placement="top"> Add to
                                    Wishlist</a>
                                            :
                                            <Link to="/wishlist" className="add_to_wishlist_fill" data-toggle="tooltip" data-original-title="Wishlist" data-placement="top">View Wishlist</Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        </div>
                        <div className="col-md-7 table-container-all">
                    <div className="row no_margins">
                        
                        <div className="col-7 no_padding">
                        <section className="no_margins no_padding default_address_format border_light desk_agenda ">
                            <p className="agenda-text-frame agenda-has-padding-left">{t("ClinicAddress")} </p>
                            <Link  className="media desk_agenda" to={`/Hospitals/${product.RegionName}/${product.HospitalId}`} >
                                <div className="media-left">
                                    <i className="fa fa-map-marker a_color fa-3x"></i>
                                </div>
                                <div className="media-body">
                                     <span className="text-muted">{product[t("HospitalName")]}</span>
                                    <br/>
                                    <span className="a_color text_ellipsis no_hover" title="Milton Keynes, Chadwick Drive">
                                     {product[t("AreaName")]}, {product[t("RegionName")]}                   </span> 
                                </div>   
                                </Link>
                        </section>
                        </div>
                        <div className="col-5 agenda-has-padding-left-frame">
            
                
                        <section className="no_margins no_padding default_address_format border_light desk_agenda ">
                           <p className="agenda-text-frame">{t("Pay_at_my_appointment")}</p>
                           <table className="table agenda-table">
                            <tbody>
                                <tr>
                                                                <td className="agenda-table-td">
                                    <p className="agenda-label">{t("First_visit")}</p>
                                    <p className="agenda-padding-8 agenda-offer"><strong>{!product.ConsultationFee||product.ConsultationFee=="0.000"?'xx.xxx':product.ConsultationFee} {t("OR")}</strong></p>
                                </td>
                                                                <td className="agenda-table-td">
                                    <p className="agenda-label">{t("Waiting_time")}</p>
                                    <p className="agenda-padding-8 agenda-offer"><strong>{product.WaitingTime?product.WaitingTime:'xx:xx'} {t("Min")} </strong></p>
                                </td>
                                                            
                            </tr>
                        </tbody></table>
                        </section>
                     </div>
                       
                       </div>
                       {
                       this.state.GetDoctorWorkingHour?

                       <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                           
                            <DoctorScheduler FlippedClick= {this.FlippedClick} DoctorWorkingHour={this.state.GetDoctorWorkingHour}/>
                           
                             <div>
                                        <div style={{color: '#009bde',fontWeight: 500,fontSize:18,paddingTop: 10,textAlign:'center'}}>
                                                    {this.state.selectedDayOne}
                                        </div>
                                        <div style={{color: '#009bde',fontWeight: 500,fontSize:18,paddingTop: 10,textAlign:'center'}}>
                                                    {this.state.selectedTime} 
                                        </div>
                                       
                                        <div className="form-grid d-grid">
                                            <div className="left">
                                                <label htmlFor={`name${this.props.product.DoctorId}`} > {t("FullName")}<sup style={{color:'red'}}>* {this.state.errorMessageFullName}</sup></label>
                                                <input type="text" id={`name${this.props.product.DoctorId}`} placeholder= {t("FullName")} value={this.state.fullName} onChange={this.fullNameChangeHandler} />
                                            </div>
                                            
                                            <div className="left">
                                                <label htmlFor={`number${this.props.product.DoctorId}`}>{t("MobileNumber")} <sup style={{color:'red'}}>* {this.state.errorMessagePhone}</sup></label>
                                                <input type="text" id={`number${this.props.product.DoctorId}`} placeholder={t("MobileNumber")}  value={this.state.phoneNumber} onChange={this.PhoneChangeHandler} />
                                            </div>
                                        
                                        </div>
                                        <div className="form-textarea">
                                            <label htmlFor={`message${this.props.product.DoctorId}`}>{t("YourMessage")} </label>
                                            <textarea id={`message${this.props.product.DoctorId}`} placeholder={t("YourMessage")} value={this.state.AdditionalMessage} onChange={this.AdditionalMessageChangeHandler}></textarea>
                                        </div>


                                                            <div className="element_group_multiple" >
                                                            <div className="item element_group_3 valign_top">
                                                                <button   onClick= {() => { this.BookAppointment()}} className="btn btn_dark btn-block search_doctor_agenda_btn" >
                                                                    <FaCalendarAlt className="ico-phone-dark search_doctor_agenda_icon"/>
                                                                            <p className="search_doctor_agenda_icon_text">Book</p>
                                                                 </button>  
                                                                 </div>                       
                                                            
                                                                 <div className="item element_group_3 valign_top">
                                                                   <a className="btn btn4 btn_dark btn-block search_doctor_agenda_btn" onClick= {() => { this.FlippedClick()}}>
                                                                      
                                                                       <GiCancel className="ico-phone-dark search_doctor_agenda_icon"/>
                                                                           <p className="search_doctor_agenda_icon_text">{t("Cancel")}</p>
                                                                      
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
            
            
                                  
                                    
            
            </div>
        )
    }

}
export default withTranslation("translations")(ProductList);
//export default ProductList;
