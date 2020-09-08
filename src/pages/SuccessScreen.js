/**
 *  Success Screen
 */
import React, { Component } from 'react';
import { Link } from "gatsby"
import { Col, Container, Row } from 'reactstrap';

import axios from 'axios';
import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import { withTranslation, Trans } from "react-i18next";

const mapStyles = {
  position: 'relative',
  width: 450,
  height: 250,
 
};

class SuccessScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ShippingFlatRate: 0,
          ShippingLocalPickUp: 0,
          TotalShippingCarge: 0,
          Adress1: "",
          Adress2: "",
          Adress3: "",
          CartITems:[],
          firstname:"",
          lastname:"",

          DoctorItem:null,
          patientData:'',
          appointmentData:"",
          HospitalItem:null,
          closeBack:''
      }
      this.SetAddress = this.SetAddress.bind(this);
    }
  
    GetDoctorsActionHome(DoctorId){
  
      
      //Call the back-end API
      //https://api.tabeeboman.com/TabebApi/Doctor/GetDoctorResult_List?DoctorId=&specId=&areaId=&hsId=&InsuId=&doctorName=&ServiceId=&LanguageId=&GenderId=&DoctorTitleId=&ConsultationFee1=0&ConsultationFee2=0&patientId=
  
      axios.get('https://api.tabeeboman.com/TabebApi/Doctor/GetDoctorResult_List?',
      {
          params: {
            DoctorId:DoctorId,
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
    componentDidMount() {
      // this.SetAddress(document, 'script');
      
      if(this.props.location.state.patientOrg){
        this.setState({patientData:this.props.location.state.patientOrg})
        
      }

      if(this.props.location.state.appointmentData){
        this.setState({appointmentData:JSON.stringify(this.props.location.state.appointmentData)})
        
        
      }
      

      var evt = document.createEvent('Event');
      evt.initEvent('load', false, false);
      window.dispatchEvent(evt);
      window.scrollTo(0, 0)
    }

    SetAddress() {
        if(localStorage.getItem("ShippingAddress1") != null)
        {
          this.state.Adress1 = localStorage.getItem("ShippingAddress1")
        }
        if(localStorage.getItem("ShippingAddress2") != null)
        {
          this.state.Adress2 = localStorage.getItem("ShippingAddress2")
        }
        if(localStorage.getItem("ShippingAddress3") != null)
        {
          this.state.Adress3 = localStorage.getItem("ShippingAddress3")
        }
        if(localStorage.getItem("TotalShippingCharge") != null)
        {
          this.state.TotalShippingCarge =  parseFloat(localStorage.getItem("TotalShippingCharge"));
        }
        if(localStorage.getItem("firstname") != null)
        {
          this.state.firstname =  parseFloat(localStorage.getItem("firstname"));
        }
        if(localStorage.getItem("lastname") != null)
        {
          this.state.lastname =  parseFloat(localStorage.getItem("lastname"));
        }
        this.ReadCartItems();
        this.forceUpdate();
      }


    ReadCartItems() {
      this.state.CartItems = JSON.parse(localStorage.getItem("FinalCheckoutCartItems"));
      localStorage.removeItem("FinalCheckoutCartItems");
      localStorage.removeItem("ShippingAddress1");
      localStorage.removeItem("ShippingAddress2");
      localStorage.removeItem("ShippingAddress3");
      localStorage.removeItem("TotalShippingCharge");
      localStorage.removeItem("ShippingType");
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");


      // if (this.state.CartItems == null) {
      //   this.props.history.push(`/`)
      // }

    }
changeFormat(date){
  
  var datearray = date.split("-");

  var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
return newdate
}

  render() {
    const { t ,i18n} = this.props;
    const AppointmentData=this.props.location.state.appointmentData

    if(!this.state.DoctorItem){
     
      this.GetDoctorsActionHome(AppointmentData.DoctorId);
      
      
    }
const pData=this.props.location.state.patientOrg;
const DoctorItem=this.state.DoctorItem;
const classStyle=(i18n.language.toString()==='ar'?'ar':'en')


   return (
    <div>
    <div className="inner-intro">
      <Container>
          <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                  <div className="intro-title-inner">
                  <h1>My Account</h1>
                  </div>
              </Col>
              <Col md={6}  className="text-right">
                  <ul className="TabeebOman_breadcrumbs page-breadcrumb breadcrumbs">
                  <li className="home">
                      <span>
                      <Link className="bread-link bread-home" to="/">Home</Link>
                      </span>
                  </li>
                  <li><span>My Account</span></li>
                  </ul>
              </Col>
          </Row>
      </Container>
      </div>
            <div className={"section-ptb "+classStyle}>
            <Container>
              <Row className="justify-content-center">
                <Col lg={7}>
                  <div className="success-screen">
                    <div className="thank-you text-center">
                      <i className="fa fa-check-circle-o"></i>
                      <h1 className="text-white">{t("Success")}</h1>
                      <span>{t("thankForBooking")}</span>

                      
                    </div>
                    <div className="delivery p-4 p-md-5 bg-light text-center">
                      <span className="h5">{t("WaitForCall")}</span>
                     
                    </div>
                    {(AppointmentData) ?
                    <div className="pt-4 px-4 pt-md-5 px-md-5 pb-3">
                    <Row>
                      <Col lg={6}>
                       <h6>{t("PatientDetails")}</h6>
                        <ul className="list-unstyled mb-0">
                          <li>{pData.PatientName}</li>
                          <li>{pData.ContactNo}</li>
                         { pData.Email&&<li>{pData.Email}</li>}
                         { pData.Nationality&&<li>{pData.Nationality}</li>}
                         { pData.Gender&&<li>{pData.Gender}</li>}

                        </ul>
                      </Col>
                      <Col lg={6} className="text-lg-right mt-4 mt-lg-0">
                        <h6>{t("BookingInfo")}</h6>
                        <ul className="list-unstyled mb-0">
                          <li><span>{t("Date")}:</span> <strong>{this.changeFormat(AppointmentData.AppointmentDate) }</strong></li>
                          <li><span>{t("Time")}:</span> <strong> {AppointmentData.AppointmentTime}</strong></li>
                          {AppointmentData.AdditionalMessage!=""&&<li><span>{t("MassagePat")}:</span> <strong>{AppointmentData.AdditionalMessage}</strong></li>}
                        </ul>
                      </Col>
                    </Row>
                    </div>
                      :
                      <div>No Items found
                      </div>
                    }
                    {(DoctorItem ) ?
                    <div className="ordered-detail">
                      <h5 className="mb-4">{t("Doctor_HospDetails")}</h5>
                        <div className="table-responsive">
                      <table class="table total-table table-borderless mt-4 mb-0">
                        <tbody>
                         {/* <tr>
                            <td>Doctor Name</td>
                            <td className="text-right">{DoctorItem.DoctorName}</td>
                          </tr> */}
                          <tr>
                            <td>{t("Doc_Name")}</td>
                            <td className="text-right">{DoctorItem.DoctorName}</td>
                          </tr>
                          <tr>
                          <td>{t("_Specialization")}</td>
                            <td className="text-right">{DoctorItem.MainSpecializationName}</td>
                          </tr>
                          <tr>
                          <td>{t("Hospital_Name")}</td>
                            <td className="text-right h5">{DoctorItem.HospitalName}</td>
                          </tr>
                          <tr>
                          <td>{t("Adress")}</td>
                            <td className="text-right h5">{DoctorItem.RegionName}-{DoctorItem.AreaName}-{DoctorItem.Address}</td>
                          </tr>
                          <tr>
                          <td>{t("Map")}</td>
                            <td className="text-right h5">
                            <div className="row " style={mapStyles}>
                      <Map
                              google={this.props.google}
                              zoom={14}
                              
                              initialCenter={{
                              lat:DoctorItem.Latitude?DoctorItem.Latitude : 23.5838,
                              lng:DoctorItem.Longitude?DoctorItem.Longitude : 58.4238
                              }}
                            />
                      </div>
                               </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                     
                      
                      {/* <div className="table-responsive">
                     
                      <table class="table mb-0">
                        <tbody>

                        
                          <tr className="ordered-item">
                            <td className="imgLogoHospital">
                              <img alt={DoctorItem.DoctorName}  src={'https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/'+DoctorItem.ImageData} placeholder={loadingImage} error={errorImage}  className="rounded-circle" />
                           

                            </td>
                            <td  className="ordered-name">
                              <h6 className="mb-0">{DoctorItem.DoctorName}</h6>
                              <span>{DoctorItem.MainSpecializationName}</span>
                            </td>
                           
                           
                          </tr>
                         
                        </tbody>
                      </table>
                      
                      </div> */}
                      {/* <div className="table-responsive">
                      <table class="table total-table table-borderless mt-4 mb-0">
                        <tbody>
                          <tr>
                            <td>Data</td>
                            <td className="text-right">${parseFloat(parseFloat(this.state.CartItems.reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0))).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
                          </tr>
                          <tr>
                          <td>Shipping</td>
                            <td className="text-right">${this.state.TotalShippingCarge.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
                          </tr>
                          <tr className="border-top">
                          <td><strong className="h5">Total</strong></td>
                            <td className="text-right h5"><strong>${parseFloat(parseFloat(this.state.CartItems.reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0)) + parseFloat((this.state.TotalShippingCarge != undefined) ? this.state.TotalShippingCarge.toFixed(2) : 0)).toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                      </div> */}
                    </div>
                    :
                    <div>
                      No Items found
                    </div>
                    }
                    <div className="d-sm-flex px-4 pb-4 px-md-5 pb-md-5">
                      <Link className="button ml-auto" to="/">{t("GoToHome")}</Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            </div>
            </div>
        )

    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCT0K_7ni2olq9a_0tn5QXDklgXakBE7Mw'})(withTranslation("translations")((SuccessScreen)))