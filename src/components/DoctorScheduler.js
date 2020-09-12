
/**
 * ProductList Widget
 */
import React, { Component } from 'react';
import { Link } from "gatsby"
import { withTranslation } from "react-i18next";



var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];


class DoctorScheduler extends Component {
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
        const obj=JSON.parse(this.props.DoctorWorkingHour.DoctorWorkingHour);
       
        let dayTimes=[], timeLength=0;  
        for (var d = from; d < to; d.setDate(d.getDate() + 1)) {
             obj.map((wd, index) =>
             {

               //  const { t } = this.props;
               //  const months= (t("months"));

               // const { t, i18n } = this.props;
               //  console.log(i18n.language)

               if (wd.DayOfWeekId == (d.getDay() + 1)) {
                    let times=[],element = {};
                     element.day = days[d.getDay()] + '-' + months[d.getMonth()] + '-' + d.getDate();
                     element.dayFull = 
                     (((d.getMonth()+1).toString()).length == 1 ? ('0'+(d.getMonth()+1).toString()):(d.getMonth()+1).toString())+ '-' +
                     ((d.getDate().toString()).length == 1 ? ('0'+d.getDate().toString()):d.getDate().toString())+'-' + 
                     d.getFullYear();
                    if(wd.IsOpen==1)
                    {
                    let FromTime = new Date(d);
                    let FromDate = FromTime.setHours(wd.FirstPeriodStrat.substring(0, 2), wd.FirstPeriodStrat.substring(2, 2), 0, 0);
                    let ToTime = new Date(d);
                    let ToDate = ToTime.setHours(wd.FirstPeriodEnd.substring(0, 2), wd.FirstPeriodEnd.substring(2, 2), 0, 0);
                    const ConsultationPeriodMinutes = parseInt(wd.ConsultationPeriodMinutes);   
                        while (FromTime < ToTime){
                        
                         FromTime.setMinutes(FromTime.getMinutes() + ConsultationPeriodMinutes);
                         times.push(this.formatTime(FromTime))
                         
                        }
                        if(wd.IsSecondPeriod)
                        {
                         let FromTime2 = new Date(d);
                         let FromDate2= FromTime2.setHours(wd.SecondPeriodStrat.substring(0, 2), wd.SecondPeriodStrat.substring(2, 2), 0, 0);
                         let ToTime2 = new Date(d);
                         let ToDate2 = ToTime2.setHours(wd.SecondPeriodEnd.substring(0, 2), wd.SecondPeriodEnd.substring(2, 2), 0, 0);

                         times.push('Break')
                         while (FromTime2 < ToTime2){
                              
                              FromTime2.setMinutes(FromTime2.getMinutes() + ConsultationPeriodMinutes);
                              times.push(this.formatTime(FromTime2))
                              
                             }

                        }
                    }
                    element.times = times;
                    (timeLength<times.length)&&(timeLength=times.length)
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
     
     this.setState({dayTimes:this.props.DoctorWorkingHour.DoctorWorkingHour?this.getTimeTable(this.state.dateCurrent, this.addDays(this.state.dateCurrent, 6)):null})
   }
   navigation(nav)
   {
     //let dateCurrentNew=new Date()
     
     if(nav=='next')
     {
          this.setState({dayTimes:this.props.DoctorWorkingHour.DoctorWorkingHour?this.getTimeTable(this.state.dateCurrent, this.addDays(this.state.dateCurrent, 6)):null})
     }
     else
     {

           this.setState({dayTimes:this.props.DoctorWorkingHour.DoctorWorkingHour?this.getTimeTable(this.subDays(this.state.dateCurrent, 12), this.subDays(this.state.dateCurrent, 6)):null})
           this.setState({dateCurrent:this.subDays(this.state.dateCurrent, 6)})
     }
    
    
   }

    render() {
     
     
     
        return (
             <div>
              
            <div className="row table-Container">
                    <Link className="appointment_book_table_right" onClick={() =>this.navigation('next') }>
                        <i class="fa fa-chevron-right hide-on-select-date"></i>
                    </Link>
                    <Link className="appointment_book_table_left" onClick={() =>this.navigation('prev') }>
                        <i class="fa fa-chevron-left hide-on-select-date"></i>
                    </Link>

                 {this.state.dayTimes&&
               <table className='table-class'>
               <thead><tr>{this.state.dayTimes.map((dayHead, i) => <th >{dayHead.day.split('-')[0]}<br /><span >{dayHead.day.split('-')[1] }&nbsp;{dayHead.day.split('-')[2]} </span></th>)}</tr></thead>
              
                 <tr >
                      {
                           this.state.dayTimes.map((dayOne, index) =>
                           {
                              return(
                              <td key={index}>
                                   <ul>
                                        { 
                                             dayOne.times.map((time, i) =>  
                                             <a  onClick= {() => { this.props.FlippedClick(time,dayOne.dayFull,dayOne.day)}}>
                                                  <li className={time?(time=='Break'?"li4":"li2"):"li3"}>{time}</li></a>)
                                        }
                                   </ul> 
                              </td>)
                           })
                         }
                                   
                    </tr>
                
              </table>
              }
           </div>
           </div>
        )
       

    
}
}


export default withTranslation("translations")(DoctorScheduler);
//export default DoctorScheduler;
