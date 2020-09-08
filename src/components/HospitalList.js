
/**
 * ProductList Widget
 */
import React, { Component } from 'react'; import { Link } from "gatsby"
import { toast, ToastContainer } from 'react-toastify';
import { Row } from 'reactstrap';
import { FiPhoneCall } from 'react-icons/fi';
import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';
import { FaCalendarAlt,FaHeart,FaRegThumbsUp,FaEye,FaStethoscope } from 'react-icons/fa';
import HospitalScheduler from './HospitalScheduler'

import Img from 'react-cool-img';

import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
import {Helmet} from 'react-helmet'
import { withTranslation, Trans } from "react-i18next";


import Layout from "../components/layout"
import SEO from "../components/seo"


class HospitalList extends Component {
    constructor(props) {
        super(props);
        this.AddToCart = this.AddToCart.bind(this);
        this.AddToWishList = this.AddToWishList.bind(this);

        this.state = {
            open: false,
            stock: 'InStock',
            quantity: 1,
            image: ''
        }
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
    render() {
        const { product } = this.props;

        let rat = [];
        let rating = (!product.ReviewAvg||product.ReviewAvg==0)?5:product.ReviewAvg;
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
        const hospitalPath='https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/';
        const HospitalImagePath= 'https://admin.tabeeboman.com/Documents/HospitalPictures/Pictures/';
        const HospitalImageOtherPath ="https://admin.tabeeboman.com/Documents/DoctorPictures/Other/";
        const HospitalImageList=JSON.parse(product.HospitalImages);
        const Specializations=JSON.parse(product.Specialization)
        const Services=JSON.parse(product.Services)
        const { t ,i18n} = this.props;
        let SpecializationsStr=product.HospitalName+', '+ product.RegionName+', '+ product.WilayatName+', ';
        {Specializations.map((spec, i) =>
            spec.SpecializationName&& spec.SpecializationName!=' ' ?
                    SpecializationsStr+=spec.SpecializationName+ (i === Specializations.length - 1 ? '' : ', '):''
            )}

        let ServicesStr='';
            {Services.map((ser, i) =>
                ServicesStr+=ser.ServiceName +(i === Services.length - 1 ? '' : ', ')
            )}
            const classStyle=(i18n.language.toString()==='ar'?'ar':'en')
        return (
            
            <div key={1} className={this.props.layoutstyle}>

                {/* SEO */}
                <Helmet>
                     <meta name="keywords" content={SpecializationsStr+', '+ServicesStr} />
                </Helmet>

               
               

                <ToastContainer autoClose={1000}  draggable={false} /> 
                <div className={"product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon "+classStyle}>
                <div className="product-inner element-hovered">
                <div className="product-info hospital_header">
                                    {product.HospitalName ?
                                    <h3 className="product-name hospital_header-name" style={{textAlign:'initial'}}>
                                        {/* <Link className="hospital_header-name-lable" to={`/HospitalDetail/${product.RegionName}/${product.HospitalId}`}
                                        >
                                            {product[t("HospitalName")]}
                                        </Link> */}


                                        <Link to="/HospitalDetail" className="hospital_header-name-lable"
                                        state={{HospitalId:product.HospitalId,RegionName:product.RegionName}}
                                        >
                                                {product[t("HospitalName")]}
                                            </Link>
                                    </h3>
                                    : null}
                                      <div className="product-rating" style={{textAlign:'initial',marginLeft:20,paddingTop:10,paddingBottom:10,marginRight:20}}>{rat}</div>

                                    <div style={{color:'#002d4b',fontSize: 14,fontWeight:700,textAlign:'initial',marginLeft:20,marginRight:20}}><fa className="fa fa-stethoscope text-muted_light"></fa>
                                     {t("SpecialistsIn")}:</div>
                                     {Specializations.length>0 ?
                                    
                                        <ul className="spec_list_ul" style={{textAlign:'initial'}}>
                                           
                                                {Specializations.map((Spec, index) =>
                                                   <li className="spec_list_li">
                                                     <span style={{padding:5,color:'#909090'}}>{Spec[t("SpecializationName")]}</span>
                                                   </li>
                                                )}
                                               
                                            </ul>
                                    : null}
                                   
                                    {/* {
                                         Specializations.length>10&&<div>see more</div>
                                    } */}
                </div>
                </div>
                <div className="product-inner element-hovered">
                            
                           
                           
                            <div className="col-md-3 ">
                                <div className="product-thumbnail">
                                    <div className="product-thumbnail-inner products-hospital-inner">
                                    <Link to="/HospitalDetail" 
                                        state={{HospitalId:product.HospitalId,RegionName:product.RegionName}}
                                        >
                                            {product.HospitalLogo?
                                            
                                                <  div className="product-thumbnail-main">
                                                     <Img src={hospitalPath+product.HospitalLogo} alt={product.HospitalName} placeholder={loadingImage} error={errorImage} className="img-fluid products-hospital" />
                                                    <noscript>
                                                    <Img src={hospitalPath+product.HospitalLogo} alt={product.HospitalName} placeholder={loadingImage} error={errorImage} className="img-fluid products-hospital" />
                                                </noscript></div>
                                                :
                                                <div className="product-thumbnail-main">
                                                    <Img src={require(`../assets/images//Hospital.jpeg`)} placeholder={loadingImage} error={errorImage} alt={product.HospitalName} className="img-fluid products-hospital" />
                                                <noscript><Img src={require(`../assets/images//Hospital.jpeg`)} placeholder={loadingImage} error={errorImage} alt={product.HospitalName} className="img-fluid products-hospital" />
                                           </noscript> </div>
                                            }
                                                
                                            
                                            {
                                            
                                            HospitalImageList.length>0&&
                                            HospitalImageList.map((hos, index) =>
                                                hos.FileUrl.startsWith("~/Documents/")&&
                                                    <div className="product-thumbnail-swap ">
                                                        <Img  placeholder={loadingImage} error={errorImage} key={index} src={HospitalImagePath+ hos.FileUrl.slice(38, 100)} alt={product.HospitalName} className="img-fluid products-hospital" />
                                                        <noscript><Img  placeholder={loadingImage} error={errorImage} key={index} src={HospitalImagePath+ hos.FileUrl.slice(38, 100)} alt={product.HospitalName} className="img-fluid products-hospital" /></noscript>
                                                    </div>
                                                    )
                                                
                                            
                                            }

{/* <img  key={index} src={hos.FileUrl.startsWith("~/Documents/")?(HospitalImagePath+ hos.FileUrl.slice(38, 100)):(HospitalImageOtherPath+ hos.FileUrl)} alt={product.HospitalName} className="img-fluid products-hospital" /> */}
                                                   
                                        </Link>
                                    
                                    </div>

                                </div>
                                <div className="product-info">

                                <div className="item element_group_3 valign_top">
                                    <a className="ver_telefono text-center" data-doctor_modal="addresses" >
                                        <span className="btn btn3-radius btn-block search_doctor_agenda_btn ">
                                            <FaStethoscope style={{position:'absolute',right:10,top: '15%'}} className="ico-phone-dark search_doctor_agenda_icon search_hospital_agenda_icon CallHospital"/>
                                            <p style={{textAlign:'initial'}}  className="search_doctor_agenda_icon_text">{t("ViewProfile")}</p>
                                        </span>
                                    </a>
                                </div>
                                <div className="item element_group_3 valign_top">
                                    <a className="ver_telefono text-center" data-doctor_modal="addresses" >
                                        <span className="btn btn2-radius btn-block search_doctor_agenda_btn">
                                            <FiPhoneCall style={{position:'absolute',right:10,top: '65%'}}  className="ico-phone-dark search_doctor_agenda_icon search_hospital_agenda_icon CallHospital"/>
                                            <p style={{textAlign:'initial'}}  className="search_doctor_agenda_icon_text">{t("Call")}</p>
                                        </span>
                                    </a>
                                </div>

                               
                                    
                                {/* {product.tags ?
                                    <span className="ciyashop-product-category">
                                        {product.tags.map((tag, index) =>
                                            <span>{tag}{index === product.tags.length - 1 ? '' : ', '}</span>
                                        )}
                                    </span>
                                    : null} */}
                              
                                <div className="product-rating-price">
                                    {product.salePrice ?
                                        <span className="price">
                                            <ins>
                                                <span className="price-amount amount">
                                                    <span className="currency-symbol">$</span>{product.salePrice.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                                </span>
                                            </ins>
                                        </span>
                                        : null}
                                   
                                </div>
                                <div className="product-actions product-actions-list">
                                    <div className="product-actions-inner">
                                        
                                        
                                    </div>
                                </div>
                                {product.description ?
                                    <div className="product-details__short-description">
                                        <p>{product.description}
                                        </p>
                                    </div>
                                    : null}
                            </div>
                            </div>
                            <div className="col-md-9"> 
                                    <div className="hospital-region">
                                                {/* <a href="" > */}
                                                    <div class="media-left">
                                                        <i class="fa fa-hospital-o a_color fa-3x"></i>
                                                    </div>
                                                            <div class="media-body">
                                                            <Link to="/HospitalDetail" 
                                                                state={{HospitalId:product.HospitalId,RegionName:product.RegionName}}
                                                                >
                                                                    <span class="h5 text-primary1">{product[t("HospitalName")]}</span>
                                                                    </Link>
                                                                    <br/>
                                                                    <span class="text-primary1">
                                                                    {product[t("WilayatName")]}, {product[t("RegionName")]}
                                                                    </span>
                                                            </div>
                                                {/* </a> */}
                                                
                                    </div>

                                   { product.WorkingDays?
                                            <HospitalScheduler  HospitalWorkingDays={product.WorkingDays}/>
                                            :'loading...'
                                    }  

                           </div>
                               
                    
                           


                            
                            </div>
                </div>
            </div>
           
        )
    }

}

export default withTranslation("translations")(HospitalList);
