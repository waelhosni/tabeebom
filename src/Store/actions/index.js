import ProductsList from '../product.json';
import axios from 'axios'

export const receiveProducts = () => {
    return async (dispatch)=>{
        const productdata=ProductsList;
        dispatch(
            {
                type: "ACTUAL_PRODUCTS",
                products:productdata
            }
        )
    }

    
};




export const receiveDoctors= ()=>{
    return (dispatch) => {
        //dispatch({ type: GET_DOCTORS_HOME_ATTEMPT });
        //Call the back-end API
       
        axios.get('https://api.tabeeboman.com/TabebApi/DoctorNew/GetAllpDoctor_List_Web?')
          .then(resp => handleResponseHome(dispatch, resp.data))
          .catch(error => console.error(error))
        
      }
  
  }
  
  
  const handleResponseHome = (dispatch, data) => {

        if (data.StatusMessage=='OK') {
                dispatch({ type: "ACTUAL_DOCTORS", doctors:data.AllDoctors })
        }
        else {
        
            // dispatch({ type: GET_DOCTORS_HOME_FAILED, errorHome: data.ErrorMessage})
        }
  }



  export const receiveHospital= ()=>{
    return (dispatch) => {
        //dispatch({ type: GET_DOCTORS_HOME_ATTEMPT });
        //Call the back-end API
       
        axios.get('https://api.tabeeboman.com/TabebApi/HospitalsNew/GetAllHospitals?')
        .then(resp => handleResponseHospital(dispatch, resp.data))
          .catch(error => console.error(error))
        
      }
  
  }
  
  
  const handleResponseHospital = (dispatch, data) => {
 
    
    if (data.StatusMessage=='OK') {
       
             dispatch({ type: "ACTUAL_HOSPITALS", hospitals:data.hspitals })
        }
        else {
        
            // dispatch({ type: GET_DOCTORS_HOME_FAILED, errorHome: data.ErrorMessage})
        }
  }
  