import React, { Component } from 'react';
import loadingImage from '../assets/images/loading.gif';
import errorImage from '../assets/images/error.png';
import { withTranslation, Trans } from "react-i18next";

const hospitalImg='https://admin.tabeeboman.com/Documents/HospitalPictures/Logo/';

class CoverHospital extends Component {

    constructor(){
        super();
        this.state = { showText: false };
      }
      
   render() {
    const Productedit =this.props.DataItem;
    const { t ,i18n} = this.props;

    return (
         
                <div className="col">
                  
                        

                       
                       
                      <div className='row justify-content-center'>
                      <img src={hospitalImg+Productedit.LogoFileUrl} placeholder={loadingImage} error={errorImage} alt={Productedit.HospitalName} className="rounded-circle imgLogoHospital"  />

                      
                      </div>
                     <div className='col justify-content-center'>
                     <h5 className='text-title-hospital'> {Productedit[t("HospitalName")]}</h5>
                      <p className='text-OverView-hospital'> {Productedit[t("OverviewHospital")]}</p> 
                     </div>
                     </div>
         
      )
   }
}

export default withTranslation("translations")(CoverHospital);