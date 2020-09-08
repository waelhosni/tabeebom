// Get Category Unique Data
export const uniqueCategory = (products) => {
    var uniqueCategorys = [];
    products.map((product) => {
        if (product.tags.length > 0 && product.tags) {
            product.tags.map((categorys) => {
                if(categorys && categorys.length > 0)
                {
                    if (uniqueCategorys.indexOf(categorys) === -1) {
                        uniqueCategorys.push(categorys);
                    }
                }
            })
        }
    })
    return uniqueCategorys;
}

// Get Size Unique Data
export const uniqueSizes = (products) => {
    var uniqueSizes = [];
    products.map((product) => {
        if (product.size.length > 0 && product.size) {
            product.size.map((sizes) => {
                if(sizes && sizes.length > 0)
                {
                    if (uniqueSizes.indexOf(sizes) === -1) {
                        uniqueSizes.push(sizes);
                    }
                }
            })
        }
    })
    return uniqueSizes;
}


// All Filter Used And Get Final Response
export const getFilterProductsdata = (data, { category, size, color,value, sortOrder,ratings,search}) => {
    
    

    let sizes = size;  

    return data.doctors
    // return data.products.filter(product => {
        
    //     let categoryMatchValue;
    //     if(product.tags)
    //         categoryMatchValue = product.tags.some(tag => category.includes(tag))
    //     else
    //         categoryMatchValue = true;  
   

    //     let sizeMatchValue;
    //     if(product.size)
    //          sizeMatchValue = product.size.some(size => sizes.includes(size))
    //     else
    //          sizeMatchValue = true;

    //     let colorMatchValue;
    //     if(color && product.colors) {
    //         colorMatchValue = product.colors.some(colors => color.includes(colors))
    //     }else{
    //         colorMatchValue = false;
    //     }

    //     let searchMatchValue;
    //     if(product.name) {
    //         if(search == search.toLowerCase())
    //         {
    //             searchMatchValue=product.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    //         }
    //         else
    //         {
    //             searchMatchValue=product.name.toUpperCase().indexOf(search.toUpperCase()) > -1
    //         }
    //     }
    //     else
    //     {
    //         searchMatchValue = false;
    //     }
       
    //     let ratingMatchValue;
    //     if(product.rating == ratings) {
    //         ratingMatchValue = true;
    //     }
    //     else if(ratings == "")
    //     {
    //         ratingMatchValue = true;
    //     }
    //     else{
    //         ratingMatchValue = false;
    //     } 
        
    //     const startPriceMatchValue = typeof value.min !== 'number' || value.min <= product.salePrice;
    //     const endPriceMatchValue = typeof value.max !== 'number' || product.salePrice <= value.max;

    //    // let filtercheck=JSON.parse(localStorage.state).filters;
        
    //     if(category.length > 0 && color.length > 0 && size.length > 0 && ratings.length > 0 )
    //     {
    //         return  categoryMatchValue && colorMatchValue  && sizeMatchValue && ratingMatchValue && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
    //     }
    //     if(category.length > 0 && color.length > 0 && size.length > 0   )
    //     {
    //         return  categoryMatchValue && colorMatchValue  && sizeMatchValue && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(category.length > 0 && size.length > 0 && ratings.length > 0  )
    //     {
    //         return  categoryMatchValue && colorMatchValue  && ratingMatchValue && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
    //     }
    //     if(category.length > 0 && color.length > 0 && ratings.length > 0 )
    //     {
    //         return  categoryMatchValue && colorMatchValue  &&  ratingMatchValue && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
    //     }
    //     if(color.length > 0 && size.length > 0 && ratings.length > 0 )
    //     {
    //         return  colorMatchValue  && sizeMatchValue  && ratingMatchValue && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(category.length > 0 && color.length > 0 )
    //     {
    //         return  categoryMatchValue && colorMatchValue   && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
    //     }
    //     if(category.length > 0 && size.length > 0)
    //     {
    //         return  categoryMatchValue && sizeMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(category.length > 0 && ratings.length > 0)
    //     {
    //         return  categoryMatchValue && ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(color.length > 0 && size.length > 0)
    //     {
    //         return  colorMatchValue && sizeMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(color.length > 0 && ratings.length > 0)
    //     {
    //         return  colorMatchValue && ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(size.length > 0 && ratings.length > 0)
    //     {
    //         return  sizeMatchValue && ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(color.length > 0)
    //     {
    //         return  colorMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(category.length > 0)
    //     {
    //         return  categoryMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(size.length > 0)
    //     {
    //         return  sizeMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     if(ratings.length > 0)
    //     {
    //         return  ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //     }
    //     else
    //     {
    //     return startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
    //    }

    // }).sort((sortpro1, sortpro2) => {
        
    //     if (sortOrder === 'Pricehigh') {
    //         return sortpro2.salePrice < sortpro1.salePrice ? -1 : 1;
    //     } else if (sortOrder === 'Pricelow') {
    //         return sortpro2.salePrice > sortpro1.salePrice ? -1 : 1;
    //     } else if (sortOrder === 'NewProduct') {
    //         return sortpro2.id < sortpro1.id ? -1 : 1;
    //     } else{
    //         return sortpro2.salePrice > sortpro1.salePrice ? -1 : 1;
    //     }
    // });
}

// export const getFilterHospitalsData = (data, { category, size, color,value, sortOrder,ratings,search}) => {
    
    

//     let sizes = size;  

//     // return data.hospitals
//     return data.hospitals.filter(product => {
        
//         let categoryMatchValue;
//         if(product.tags)
//             categoryMatchValue = product.tags.some(tag => category.includes(tag))
//         else
//             categoryMatchValue = true;  
   

//         let sizeMatchValue;
//         if(product.size)
//              sizeMatchValue = product.size.some(size => sizes.includes(size))
//         else
//              sizeMatchValue = true;

//         let colorMatchValue;
//         if(color && product.colors) {
//             colorMatchValue = product.colors.some(colors => color.includes(colors))
//         }else{
//             colorMatchValue = false;
//         }

//         let searchMatchValue;
//         if(product.name) {
//             if(search == search.toLowerCase())
//             {
//                 searchMatchValue=product.name.toLowerCase().indexOf(search.toLowerCase()) > -1
//             }
//             else
//             {
//                 searchMatchValue=product.name.toUpperCase().indexOf(search.toUpperCase()) > -1
//             }
//         }
//         else
//         {
//             searchMatchValue = false;
//         }
       
//         let ratingMatchValue;
//         if(product.rating == ratings) {
//             ratingMatchValue = true;
//         }
//         else if(ratings == "")
//         {
//             ratingMatchValue = true;
//         }
//         else{
//             ratingMatchValue = false;
//         } 
        
//         const startPriceMatchValue = typeof value.min !== 'number' || value.min <= product.salePrice;
//         const endPriceMatchValue = typeof value.max !== 'number' || product.salePrice <= value.max;

//        // let filtercheck=JSON.parse(localStorage.state).filters;
        
//         if(category.length > 0 && color.length > 0 && size.length > 0 && ratings.length > 0 )
//         {
//             return  categoryMatchValue && colorMatchValue  && sizeMatchValue && ratingMatchValue && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
//         }
//         if(category.length > 0 && color.length > 0 && size.length > 0   )
//         {
//             return  categoryMatchValue && colorMatchValue  && sizeMatchValue && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(category.length > 0 && size.length > 0 && ratings.length > 0  )
//         {
//             return  categoryMatchValue && colorMatchValue  && ratingMatchValue && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
//         }
//         if(category.length > 0 && color.length > 0 && ratings.length > 0 )
//         {
//             return  categoryMatchValue && colorMatchValue  &&  ratingMatchValue && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
//         }
//         if(color.length > 0 && size.length > 0 && ratings.length > 0 )
//         {
//             return  colorMatchValue  && sizeMatchValue  && ratingMatchValue && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(category.length > 0 && color.length > 0 )
//         {
//             return  categoryMatchValue && colorMatchValue   && startPriceMatchValue && endPriceMatchValue && searchMatchValue;
//         }
//         if(category.length > 0 && size.length > 0)
//         {
//             return  categoryMatchValue && sizeMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(category.length > 0 && ratings.length > 0)
//         {
//             return  categoryMatchValue && ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(color.length > 0 && size.length > 0)
//         {
//             return  colorMatchValue && sizeMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(color.length > 0 && ratings.length > 0)
//         {
//             return  colorMatchValue && ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(size.length > 0 && ratings.length > 0)
//         {
//             return  sizeMatchValue && ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(color.length > 0)
//         {
//             return  colorMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(category.length > 0)
//         {
//             return  categoryMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(size.length > 0)
//         {
//             return  sizeMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         if(ratings.length > 0)
//         {
//             return  ratingMatchValue   && startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//         }
//         else
//         {
//         return startPriceMatchValue && endPriceMatchValue  && searchMatchValue;
//        }

//     }).sort((sortpro1, sortpro2) => {
        
//         if (sortOrder === 'Pricehigh') {
//             return sortpro2.salePrice < sortpro1.salePrice ? -1 : 1;
//         } else if (sortOrder === 'Pricelow') {
//             return sortpro2.salePrice > sortpro1.salePrice ? -1 : 1;
//         } else if (sortOrder === 'NewProduct') {
//             return sortpro2.id < sortpro1.id ? -1 : 1;
//         } else{
//             return sortpro2.salePrice > sortpro1.salePrice ? -1 : 1;
//         }
//     });
// }


export const getFilterHospitalsData = (data, { category, size, color,service,value, sortOrder,ratings,search}) => {
    
    
    return data.hospitals.filter(product => {
        
       console.log(search)

        let searchMatchValue=true;
        if(search) {
            if((product.HospitalName.toLowerCase().indexOf(search.toLowerCase()) > -1)||(product.HospitalName.toLowerCase().indexOf(search.toLowerCase()) > -1))
            {
                searchMatchValue=true;
            }
            else
            {
                searchMatchValue = false;
            }
            
        }
        

        //////////////////////////
        let SpecMatchValue=true;
        let Specializations=JSON.parse(product.Specialization).map( (prop) => prop.SpecializationName);
   
        if(color.length>0 && Specializations) {
            SpecMatchValue = Specializations.some(Specialization => color.includes(Specialization))
        }
       //////////////////////////
        let RegionMatchValue=true;
        if(category.length>0 )
        {
            if(category.includes(product.RegionName)) {
                RegionMatchValue = true
            }
            else{
                RegionMatchValue = false;
            }
         }
        ////////////////////////
        
         let InsuranceMatchValue=true;
         let Insurances=JSON.parse(product.Insurances).map( (prop) => prop.InsuranceCompany);
    
         if(size.length>0 && Insurances) {
            InsuranceMatchValue = Insurances.some(Insurance => size.includes(Insurance))
         }

         ////////////////////////
        
         let ServiceMatchValue=true;
         let Services=JSON.parse(product.Services).map( (prop) => prop.ServiceName);
    
         if(service.length>0 && Services) {
            ServiceMatchValue = Services.some(Service => service.includes(Service))
         }
        
         return SpecMatchValue && RegionMatchValue && InsuranceMatchValue && ServiceMatchValue&&searchMatchValue;



        
        
        

      

    });
}



export const getFilterDoctorData = (data, { category, size, color,service,value, sortOrder,ratings,search}) => {
    
    
    return data.doctors.filter(product => {
        
       

        let searchMatchValue=true;
        if(search) {
            if((product.DoctorName.toLowerCase().indexOf(search.toLowerCase()) > -1)||(product.DoctorName.toLowerCase().indexOf(search.toLowerCase()) > -1))
            {
                searchMatchValue=true;
            }
            else
            {
                searchMatchValue = false;
            }
            
        }
        

        //////////////////////////
        

       
        //////////////////////////
        let SpecMatchValue=true;
        let Specializations=JSON.parse(product.Specialization).map( (prop) => prop.SpecializationName);
   
        if(color.length>0) {

            
            if(Specializations)
                SpecMatchValue = Specializations.some(Specialization => color.includes(Specialization))

            if(color.includes(product.MainSpecializationName)) {
                
                    SpecMatchValue = true
                }

            
        }
       //////////////////////////
        let RegionMatchValue=true;
        if(category.length>0 )
        {
            if(category.includes(product.RegionName)) {
                RegionMatchValue = true
            }
            else{
                RegionMatchValue = false;
            }
         }
        ////////////////////////
        
         let InsuranceMatchValue=true;
         let Insurances=JSON.parse(product.Insurances).map( (prop) => prop.InsuranceCompany);
    
         if(size.length>0 && Insurances) {
            InsuranceMatchValue = Insurances.some(Insurance => size.includes(Insurance))
         }

         ////////////////////////
        
         let ServiceMatchValue=true;
         let Services=JSON.parse(product.Services).map( (prop) => prop.ServiceName);
    
         if(service.length>0 && Services) {
            ServiceMatchValue = Services.some(Service => service.includes(Service))
         }
        
         return SpecMatchValue && RegionMatchValue && InsuranceMatchValue && ServiceMatchValue && searchMatchValue ;

      

    });
}



// Get Color Unique Data
export const uniqueColors = (products) => {
    var uniqueColors = [];
    products.map((product) => {

        if(product.colors.length > 0 && product.colors) {
            product.colors.map((color) => {
                if(color && color.length > 0)
                {
                    if (uniqueColors.indexOf(color) === -1) {
                        uniqueColors.push(color);
                    }
                }

            })
        }
    })
    return uniqueColors;
}


// Get Color Unique Data
export const uniqueSpecialty = (products) => {
    var uniqueSpecialty = [];
    products&&
    products.map((product) => {

        if (uniqueSpecialty.indexOf(product.MainSpecializationName) === -1) {
            uniqueSpecialty.push(product.MainSpecializationName);
        }

        if(product.Specialization.length > 0 && product.Specialization) {
            JSON.parse(product.Specialization).map((Specialization) => {
                
                if(Specialization)
                {
                    if (uniqueSpecialty.indexOf(Specialization.SpecializationName) === -1) {
                        uniqueSpecialty.push(Specialization.SpecializationName);
                    }
                }

            })
        }
    })
    return uniqueSpecialty;
}

// Get Color Unique Data
export const uniqueInsurance = (products) => {
    var uniqueInsurance = [];
    products&&
    products.map((product) => {

        if(product.Insurances.length > 0 && product.Insurances) {
            JSON.parse(product.Insurances).map((Insurance) => {
                
                if(Insurance)
                {
                    if (uniqueInsurance.indexOf(Insurance.InsuranceCompany) === -1) {
                        uniqueInsurance.push(Insurance.InsuranceCompany);
                    }
                }

            })
        }
    })
    return uniqueInsurance;
}


export const uniqueService = (products) => {
    var uniqueService = [];
    products&&
    products.map((product) => {

        if(product.Services.length > 0 && product.Services) {
            JSON.parse(product.Services).map((Service) => {
                
                if(Service)
                {
                    if (uniqueService.indexOf(Service.ServiceName) === -1) {
                        uniqueService.push(Service.ServiceName);
                    }
                }

            })
        }
    })
    return uniqueService;
}


// Get Color Unique Data
export const uniqueRegion = (products) => {
    var uniqueRegion= [];
    products&&
    products.map((product) => {
       
        if(product.RegionName) {
            // JSON.parse(product.Specialization).map((Specialization) => {
                
                // if(RegionName)
                // {
                    if (uniqueRegion.indexOf(product.RegionName) === -1) {
                        uniqueRegion.push(product.RegionName);
                    }
                // }

            // })
        }
    })
    return uniqueRegion;
}


// Get Min & Max Data in Json
export const uniqueMinMaxPrice = (products) => {
    let minimum = 0, maximum = 1000;
    products.map((product, index) => {
        let v = product.ConsultationFee;
        if(v < minimum)
        {
            minimum=v;
        }
        else
        {
            minimum=minimum;
        }
        if(v > maximum)
        {
            maximum=v;
        }
        else
        {
            maximum=maximum;
        }
    })
    return {'min':minimum, 'max':maximum};
}