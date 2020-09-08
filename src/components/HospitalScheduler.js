
/**
 * ProductList Widget
 */
import React, { Component } from 'react';
import { Link } from "gatsby"
import { toast, ToastContainer } from 'react-toastify';
import MaleImg from '../assets/images/male.png'
import FemaleImg from '../assets/images/female.png'
import { FiPhoneCall } from 'react-icons/fi';
import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';
import { FaCalendarAlt,FaHeart } from 'react-icons/fa';
//import '../assets/css/time-table.css'

var months = ["يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"];
var days = ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"];


class HospitalScheduler extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
             dateCurrent:new Date(),
             dayTimes:null
           
        }
    }


   addDays(date, days) {
        var copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
    }
   subDays(date, days) {
        var copy = new Date(Number(date))
        copy.setDate(date.getDate() - days)
        return copy
    }
    formatTime(DateTime) {
     return (DateTime.getHours() > 12 ? ("0" + (DateTime.getHours() - 12)).slice(-2) : ("0" + DateTime.getHours()).slice(-2)) + ':' + ("0" + DateTime.getMinutes()).slice(-2) + ' ' + (DateTime.getHours() >= 12 ? "م" : "ص");
     }
   getTimeTable(from, to) {
        const obj=JSON.parse(this.props.HospitalWorkingDays);
        
        let dayTimes=[], timeLength=0;  
        for (var d = from; d < to; d.setDate(d.getDate() + 1)) {
             obj.map((wd, index) =>
             {

               if (wd.DayId == (d.getDay() + 1)) {
                    let times=[],element = {};
                     element.day = days[d.getDay()] + '-' + months[d.getMonth()] + '-' + d.getDate();
                   
                    if(wd.IsOpen==1)
                    {
                         let FromTime = new Date(d);
                         let FromDate = FromTime.setHours(wd.FirstPeriodStrat.substring(0, 2), wd.FirstPeriodStrat.substring(2, 2), 0, 0);
                         let ToTime = new Date(d);
                         let ToDate = ToTime.setHours(wd.FirstPeriodEnd.substring(0, 2), wd.FirstPeriodEnd.substring(2, 2), 0, 0);

                         let FromTime2 = new Date(d);
                         let FromDate2= FromTime2.setHours(wd.SecondPeriodStrat.substring(0, 2), wd.SecondPeriodStrat.substring(2, 2), 0, 0);
                         let ToTime2 = new Date(d);
                         let ToDate2 = ToTime2.setHours(wd.SecondPeriodEnd.substring(0, 2), wd.SecondPeriodEnd.substring(2, 2), 0, 0);

                     
                   if(new Date().getDay() ==d.getDay())
                     {
                         let currentDate = new Date()  
                         let valid = FromTime < currentDate && ToTime > currentDate
                         let valid2 = FromTime2 < currentDate && ToTime2 > currentDate
                         if(valid || valid2|| wd.Is24==1)
                         {
                              element.IsOpen=1;
                              times.push('Open')
                         }
                         else{
                              
                              element.IsOpen=0;
                              times.push('Close')
                              

                         }
                             
                    }
                    else{
                         element.IsOpen=3;
                         times.push('...')
                    }

                    if(wd.Is24==1)
                      {
                         times.push('24 Hours;')
                      }
                     else{
                   
                    times.push('From;' +this.formatTime(FromTime)+'; To;' +this.formatTime(ToTime))

                        if(parseInt(wd.SecondPeriodStrat.substring(0, 2))>0)
                        {
                        
                         times.push('Break')

                         times.push('From;' +this.formatTime(FromTime2)+'; To;' +this.formatTime(ToTime2))
                       

                        }
                    }

                    

                        
                    }
                    else
                    {
                         if(new Date().getDay() ==d.getDay())
                         {
                             
                                   element.IsOpen=0;
                                   times.push('Close')
                                  
                         
                         }
                         else{
                              element.IsOpen=2;
                              times.push('Week Off')

                         }

                    }
                   

                    element.times = times;
                    // (timeLength<times.length)&&(timeLength=times.length)
                    dayTimes.push(element);

                    
               }
               
              
          }) 

          

 
             
        }
        dayTimes.map((dayTime, i) => {
             
          if(dayTime.times.length<timeLength){
               for (let index = dayTime.times.length; index < timeLength; index++) {
                    dayTime.times.push('')
               }
          }
          });
     

        return dayTimes;

   }

   componentDidMount()
   {
     
     this.setState({dayTimes:this.props.HospitalWorkingDays?this.getTimeTable(this.state.dateCurrent, this.addDays(this.state.dateCurrent, 6)):null})
   }
  

    render() {
     
        
        return (
             <div>
              
            <div className="row table-Container">
                   

                 {this.state.dayTimes&&

                    this.state.dayTimes.length>0?
                         <table className='table-class'>
                         <thead><tr>{this.state.dayTimes.map((dayHead, i) => <th >{dayHead.day.split('-')[0]}<br /><span >{dayHead.day.split('-')[1] }&nbsp;{dayHead.day.split('-')[2]} </span></th>)}</tr></thead>
                    
                         <tr >
                              {
                                   //   this.state.dayTimes.length>0?
                                   this.state.dayTimes.map((dayOne, index) =>
                                   {//li_normal
                                        return(
                                        <td key={index} style={{background:'#f6f6f6',Height:400}}>
                                             <ul className={dayOne.IsOpen==1?'li_open ':(dayOne.IsOpen==0?'li_close':(dayOne.IsOpen==2?'li3 li_height':(dayOne.IsOpen==3?'li_normal':'')))}>
                                                  { 
                                                       dayOne.times.map((time, i) =>  <li className={time?(time=='Break'?"li4":(time=='Open'?'li_open ':time=='Close'?'li_close ':(time=='Week Off'?'li3 ':(time=='...'?'li_normal':'li2 li_height')))):"li3"}>{time.split(";")[0]}<br/>{time.split(";")[1]}<br/>{time.split(";")[2]}<br/>{time.split(";")[3]}</li>)
                                                  }
                                             </ul> 
                                        </td>)
                                   })
                               }
                                             
                              </tr>
                         
                         </table>
              
                    :<div style={{color:'#000',width:'100%',backgroundColor:'#f6f6f6',textAlign:'center',minHeight: 200,paddingTop:20,paddingLeft:30,paddingRight:30}}>
                         <div style={{marginBottom:3,color:'#002D4B'}}>Scheduler not available </div>
                         <br/>
                         <FaCalendarAlt style={{color:'#009bde',fontSize:40,marginBottom:15}} />
                                            
                         <div className="item element_group_3 valign_top">
                                    <a className="ver_telefono text-center" >
                                        <span className="btn btn4-radius btn-block search_doctor_agenda_btn ">
                                            
                                            <p  className="search_doctor_agenda_icon_text">View profile request an appointment</p>
                                        </span>
                                    </a>
                                </div>
                    </div>          
                  
              }
           </div>
           </div>
        )
    

    
}
}

export default HospitalScheduler;
