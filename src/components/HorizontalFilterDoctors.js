/**
 * Shop Page Side Bar Filter
 */
import "antd/dist/antd.css";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { categoryValue, colorValue, priceValue, sizeValue,serviceValue,searchValue } from '../Store/actions/filter';
import { uniqueSpecialty,uniqueRegion, uniqueInsurance,uniqueService } from '../Store/services';
import '../assets/css/styles-filter.css';
import { FiPhoneCall } from 'react-icons/fi';
import { BsFillChatDotsFill,BsFillHeartFill } from 'react-icons/bs';
import { FaCalendarAlt,FaHeart,FaHeartbeat,FaMedkit,FaFileMedicalAlt } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { withTranslation, Trans } from "react-i18next";


var removecate = [], removecategorylist = [], removesizelist = [], removeservicelist = [];
class HorizontalFilterDoctors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
           
            colorfilter: true,
            categoryfilter: true,
            sizefilter: true,
            servicefilter: true,
            colordrop: false,
            categorydrop: false,
            sizedrop: false,
            servicedrop: false,
            sidedrop:false,
            width:window.innerWidth,
            SearchValue: '',
        }
       
        this.colordrop = this.colordrop.bind(this);
        this.categorydrop = this.categorydrop.bind(this);
        this.sizedrop = this.sizedrop.bind(this);
        this.servicedrop = this.servicedrop.bind(this);

        this.showfilter = this.showfilter.bind(this);
        this.closefilter = this.closefilter.bind(this);

      
        this.setColorRef = this.setColorRef.bind(this);
        this.setCategoryRef = this.setCategoryRef.bind(this);
        this.setSizeRef = this.setSizeRef.bind(this);
        this.setServiceRef = this.setServiceRef.bind(this);


        this.handleClickOutsideColor = this.handleClickOutsideColor.bind(this);
        this.handleClickOutsideCategory = this.handleClickOutsideCategory.bind(this);
        this.handleClickOutsidesize = this.handleClickOutsidesize.bind(this);
        this.handleClickOutsideservice = this.handleClickOutsideservice.bind(this);
    }
    
    componentDidMount() {
       
        document.addEventListener('mousedown', this.handleClickOutsideColor);
        document.addEventListener('mousedown', this.handleClickOutsideCategory);
        document.addEventListener('mousedown', this.handleClickOutsidesize);
        document.addEventListener('mousedown', this.handleClickOutsideservice);
        window.addEventListener('resize', this.handleWindowSizeChange);
        window.addEventListener('scroll', this.handleScroll); 
        this.setState({
            SearchValue: ''
        })
        this.props.searchValue('');
        //this.nameInput.focus();
        
       
    }

    componentWillUnmount() {
       
        document.removeEventListener('mousedown', this.handleClickOutsideColor);
        document.removeEventListener('mousedown', this.handleClickOutsideCategory);
        document.removeEventListener('mousedown', this.handleClickOutsidesize);
        document.removeEventListener('mousedown', this.handleClickOutsideservice);
        window.removeEventListener('resize', this.handleWindowSizeChange);
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    handleScroll(event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
        if(scrollTop > 490){
            document.getElementById("sticky-filter").setAttribute("class","sticky-filter is-sticky");

        }else{
            document.getElementById("sticky-filter").setAttribute("class","sticky-filter ");
        }
      }
    
    showfilter(){
        this.setState(prevState => ({
            sidedrop: !prevState.sidedrop
        }));        
    }
    closefilter(){
        this.setState({
            sidedrop: false
        });
    }
    convertValue = (labelValue) => {
        return labelValue.toLocaleString("en", {   
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
        
    }
 
    

    // Color Filter 
    
    
    setColorRef(node) {
        this.ColorRef = node;
    }

    handleClickOutsideColor(event) {
        if (this.ColorRef && !this.ColorRef.contains(event.target)) {
            this.setState({
                colordrop: false
            });
        }
    }

    colordrop() {
        this.setState(prevState => ({
            colordrop: !prevState.colordrop
        }));
    }

    onClickColorFilter = (event, colors) => {
        var index = colors.indexOf(event.target.value);
        if (event.target.checked) {
            colors.push(event.target.value);
        }
        else {
            colors.splice(index, 1);
        }

        if (colors.length > 0) {
            this.setState({
                removecolorlist: colors,
                colorfilter: false
            })
        }
        else {
            this.setState({
                colorfilter: true
            })
        }
        this.props.colorValue(colors)
    }

    closecolor() {
        this.setState({
            ...this.state,
            colordrop: false
        })
    }
    clearcolor() {
        var colors = [];
        this.setState({
            removecolorlist: colors,
            colorfilter: true
        })
        this.props.colorValue(colors);
    }

    // Category Filter 
    setCategoryRef(node) {
        this.CategoryRef = node;
    }

    handleClickOutsideCategory(event) {
        if (this.CategoryRef && !this.CategoryRef.contains(event.target)) {
            this.setState({
                categorydrop: false
            });
        }
    }

    categorydrop() {
        this.setState(prevState => ({
            categorydrop: !prevState.categorydrop
        }));
    }


    onClickCategoryFilter(event, categorys) {

        var index = categorys.indexOf(event.target.value);
        if (event.target.checked) {
            categorys.push(event.target.value);
        }
        else {
            categorys.splice(index, 1);
        }
        if (categorys.length > 0) {
            this.setState({
                removecategorylist: categorys,
                categoryfilter: false
            })
        }
        else {
            this.setState({
                categoryfilter: true
            })
        }
        this.props.categoryValue(categorys);
    }

    closecategory() {
        this.setState({
            ...this.state,
            categorydrop: false
        })
    }
    clearcategory() {
        var categorys = [];
        this.setState({
            removecategorylist: categorys,
            categoryfilter: true
        })
        this.props.categoryValue(categorys);
    }





    //Size Filter
    setSizeRef(node) {
        this.sizeRef = node;
    }

    handleClickOutsidesize(event) {
        if (this.sizeRef && !this.sizeRef.contains(event.target)) {
            this.setState({
                sizedrop: false
            });
        }
    }

    sizedrop() {
        this.setState(prevState => ({
            sizedrop: !prevState.sizedrop
        }));
    }

    onClickSizeFilter(event, sizes) {
        var index = sizes.indexOf(event.target.value);
        if (event.target.checked) {
            sizes.push(event.target.value);
        }
        else {
            sizes.splice(index, 1);
        }
        if (sizes.length > 0) {
            this.setState({
                removesizelist: sizes,
                sizefilter: false
            })
        }
        else {
            this.setState({
                sizefilter: true
            })
        }
        this.props.sizeValue(sizes);
    }

    closesize() {
        this.setState({
            ...this.state,
            sizedrop: false
        })
    }
    clearsize() {
        var sizes = [];
        this.setState({
            removesizelist: sizes,
            sizefilter: true
        })
        this.props.sizeValue(sizes);
    }

   


    //service Filter
setServiceRef(node) {
    this.serviceRef = node;
}

handleClickOutsideservice(event) {
    if (this.serviceRef && !this.serviceRef.contains(event.target)) {
        this.setState({
            servicedrop: false
        });
    }
}

servicedrop() {
    this.setState(prevState => ({
        servicedrop: !prevState.servicedrop
    }));
}

onClickServiceFilter(event, services) {
    var index = services.indexOf(event.target.value);
    if (event.target.checked) {
        services.push(event.target.value);
    }
    else {
        services.splice(index, 1);
    }
    if (services.length > 0) {
        this.setState({
            removeservicelist: services,
            servicefilter: false
        })
    }
    else {
        this.setState({
            servicefilter: true
        })
    }
    this.props.serviceValue(services);
}

closeservice() {
    this.setState({
        ...this.state,
        servicedrop: false
    })
}
clearservice() {
    var services = [];
    this.setState({
        removeservicelist: services,
        servicefilter: true
    })
    this.props.serviceValue(services);
}


SearchTextchange(SearchText) {
    this.setState({
        ...this.state,
        SearchValue: SearchText.target.value
    })
    this.props.searchValue(SearchText.target.value);
}


Capitalize(str) {

    var i = 0;
    for (i; i < str.length; i++) {
        str = str.replace('-', ' ');
        str = str.replace(/\d+/g, '');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}




    clearallfilter(){

       
        var colors = [];
        this.setState({
            removecolorlist: colors,
            colorfilter: true
        })
        this.props.colorValue(colors);
  
        var categorys = [];
        this.setState({
            removecategorylist: categorys,
            categoryfilter: true
        })
        this.props.categoryValue(categorys);

        var size = [];
        this.setState({
            removesizelist: size,
            sizefilter: true
        })
        this.props.sizeValue(size);


        var service = [];
        this.setState({
            removeservicelist: service,
            servicefilter: true
        })
        this.props.serviceValue(service);

    }

    render() {
        const { pricecapfilter,width,colorfilter, colordrop, removecolorlist, categoryfilter, categorydrop, removecategorylist, sizefilter, sizedrop, removesizelist, servicefilter, servicedrop, removeservicelist,sidedrop } = this.state;

        const isMobile = width <= 767;

        const sizeFilterValues = this.props.filters.size;
        const categoryFilterValues = this.props.filters.category;
        const colorsFilterValues = this.props.filters.color;
        const serviceFilterValues = this.props.filters.service;
        
        const { t ,i18n} = this.props;
        const classStyle=(i18n.language.toString()==='ar'?'ar':'en')
        const closeStyle =(i18n.language.toString()==='ar'?'btn-closeAr':'btn-close')
        

        if (removecategorylist && removecategorylist.length > 0) {
            var totalremovecategory = removecategorylist.length;
        }
        if (removecolorlist && removecolorlist.length > 0) {
            var totalremovecolor = removecolorlist.length;
        }
        if (removesizelist && removesizelist.length > 0) {
            var totalremovesize = removesizelist.length;
        }
        if (removeservicelist && removeservicelist.length > 0) {
            var totalremoveservice = removeservicelist.length;
        }
        return (
            <div className="filters-wrapper">
                 {(!isMobile) ?
                    <div className={"d-flex align-items-center "+classStyle }>
                        <p className="mb-0 filter-title filter-by" style={{textAlign:'initial',marginLeft:10}}><i className="fa fa-filter"></i> {t("Filter")}</p>
                        
                        

                        <div className=" horizontal-filter-dropdown horizontal-filter-dropdown1" ref={this.setColorRef}>
                            {(colorfilter) ?
                                <Button  className="btn-white dropdown-toggle" onClick={this.colordrop} style={{textAlign:'initial'}}>
                                    <span className="mb-0"><FaHeartbeat style={{fontSize:22,color:'#002D4B',marginLeft:8,marginRight:5}}/> {t("Specialty")} </span>
                                </Button>
                                :
                                <p><Button  className="btn-white bg-highlight" onClick={this.colordrop}><b>{(removecolorlist.length === 1) ? this.Capitalize(removecolorlist[0]) : this.Capitalize(removecolorlist[0]) + '+' + (totalremovecolor - 1)}</b></Button><a  className="filter-close" onClick={() => this.clearcolor()} to=""></a></p>
                            }
                            {(colordrop) ?
                                <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav zoomIn animated">
                                    <div className="widget-title-header" style={{textAlign:'initial'}}>
                                        <h4 className="widget-title">{t("Center_specialty")} <a  className={closeStyle} onClick={() => this.closecolor()}></a></h4>
                                    </div>
                                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px',textAlign:'initial' }}>
                                        <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{ right: '-17px' }}>
                                            {this.props.colors.map((color, index) => {
                                                return (
                                                    <div className="form-check pgs-filter-checkbox" key={index}>
                                                        <input type="checkbox" onClick={(e) => this.onClickColorFilter(e, colorsFilterValues)} value={color} defaultChecked={colorsFilterValues.includes(color) ? true : false} className="form-check-input" id={color} />
                                                        <label className="form-check-label"
                                                            htmlFor={color}>{color}</label>
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                : null}
                        </div>

                        <div className="horizontal-filter-dropdown horizontal-filter-dropdown1" ref={this.setServiceRef}>
                            {(servicefilter) ?
                                <Button  className="btn-white dropdown-toggle" onClick={this.servicedrop} style={{textAlign:'initial'}}>
                                    <span className="mb-0"><FaFileMedicalAlt style={{fontSize:22,color:'#002D4B',marginLeft:8,marginRight:5}}/>  {t("ServicesTreatments")}</span>
                                </Button>
                                :
                                <p><Button  className="btn-white bg-highlight" onClick={this.servicedrop}> <b>{(removeservicelist.length === 1) ? this.Capitalize(removeservicelist[0]) : this.Capitalize(removeservicelist[0]) + '+' + (totalremoveservice - 1)}</b></Button><a  className="filter-close" onClick={() => this.clearservice()} ></a></p>
                            }
                            {(servicedrop) ?
                                <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav zoomIn animated">
                                    <div className="widget-title-header" style={{textAlign:'initial'}}>
                                        <h4 className="widget-title">{t("ServicesTreatments")}<a  className={closeStyle} onClick={() => this.closeservice()}></a></h4>
                                    </div>
                                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px' ,textAlign:'initial'}}>
                                        {this.props.services.map((service, index) => {
                                            return (

                                                <div className="form-check pgs-filter-checkbox">
                                                    <input type="checkbox" onClick={(e) => this.onClickServiceFilter(e, serviceFilterValues)} value={service} defaultChecked={serviceFilterValues.includes(service) ? true : false} className="form-check-input" id={service} />
                                                    <label className="form-check-label" htmlFor={service}>{service}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                : null}
                        </div>

                        <div className="horizontal-filter-dropdown horizontal-filter-dropdown1" ref={this.setCategoryRef}>
                            {(categoryfilter) ?
                                <Button  className="btn-white dropdown-toggle" onClick={this.categorydrop} style={{textAlign:'initial'}}>
                                    <span className="mb-0"><MdLocationOn style={{fontSize:22,color:'#002D4B',marginLeft:8,marginRight:5}}/> {t("Walayat")}</span>
                                </Button>
                                :
                                <p><Button  className="btn-white bg-highlight" onClick={this.categorydrop}> <b>{(removecategorylist.length === 1) ? this.Capitalize(removecategorylist[0]) : this.Capitalize(removecategorylist[0]) + '+' + (totalremovecategory - 1)}</b></Button><a  className="filter-close" onClick={() => this.clearcategory()} to=""></a></p>
                            }
                            {(categorydrop) ?
                                <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav zoomIn animated">
                                    <div className="widget-title-header" style={{textAlign:'initial'}}>
                                        <h4 className="widget-title">{t("Walayat")}<a  className={closeStyle} onClick={() => this.closecategory()}></a></h4>
                                    </div>
                                <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px',textAlign:'initial' }}>
                                        {this.props.categorys.map((category, index) => {
                                            return (
                                                <div className="form-check pgs-filter-checkbox" key={index}>
                                                    <input type="checkbox" onClick={(e) => this.onClickCategoryFilter(e, categoryFilterValues)} value={category} defaultChecked={categoryFilterValues.includes(category) ? true : false} className="form-check-input" id={category} />
                                                    <label className="form-check-label"
                                                        htmlFor={category}>{category}</label>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                                : null}
                        </div>
                        <div className="horizontal-filter-dropdown horizontal-filter-dropdown1" ref={this.setSizeRef}>
                            {(sizefilter) ?
                                <Button  className="btn-white dropdown-toggle" onClick={this.sizedrop} style={{textAlign:'initial'}}>
                                    <span className="mb-0"><FaMedkit style={{fontSize:22,color:'#002D4B',marginLeft:8,marginRight:5}}/>  {t("HealthInsurance")}</span>
                                </Button>
                                :
                                <p><Button  className="btn-white bg-highlight" onClick={this.sizedrop}><b>{(removesizelist.length === 1) ? this.Capitalize(removesizelist[0]) : this.Capitalize(removesizelist[0]) + '+' + (totalremovesize - 1)}</b></Button><a  className="filter-close" onClick={() => this.clearsize()} ></a></p>
                            }
                            {(sizedrop) ?
                                <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav zoomIn animated">
                                    <div className="widget-title-header" style={{textAlign:'initial'}}>
                                        <h4 className="widget-title">{t("HealthInsurance")}<a  className={closeStyle} onClick={() => this.closesize()}></a></h4>
                                    </div>
                                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px' ,textAlign:'initial'}}>
                                        {this.props.sizes.map((size, index) => {
                                            return (

                                                <div className="form-check pgs-filter-checkbox">
                                                    <input type="checkbox" onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)} value={size} defaultChecked={sizeFilterValues.includes(size) ? true : false} className="form-check-input" id={size} />
                                                    <label className="form-check-label" htmlFor={size}>{size}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                : null}
                        </div>


                        <div className="horizontal-filter-dropdown horizontal-filter-dropdown1" >
                           
                           <div className="btn-white dropdown-toggle  btn-secondary" >
                               <input type="text" id="btn-search" ref={(input) => { this.nameInput = input; }} 
                               className="" value={this.state.SearchValue}  style={{border:0,color: '#009bde',fontWeight: 600,textAlign:'initial'}}
                               onChange={this.SearchTextchange.bind(this)} placeholder={t("SearchByName")} />
                             </div>
                       </div>



                        <div className="site-header-row" id="site-header-row"></div>
                        {( (!colorfilter) || (!categoryfilter) || (!sizefilter)|| (!servicefilter)) ? 
                        <div>
                            <button className="clear-all-btn" onClick={()=>this.clearallfilter()} >{t("Clear_All")}</button>
                        </div>
                        : null}
                    </div>
                :
                    <div>
                        <Button onClick={this.showfilter} className="btn-filter" style={{textAlign:'initial'}}>
                            <i className="fa fa-filter"> </i> {t("Filter")}
                        </Button>
                        <div className={"off-canvas-filter horizontal-mobile-filter"+ (sidedrop ? " filter-open" : " ")}   id="off-canvas-filter">
                            <div className="sidebar-widget-heading">
                            <button className="apply-filter-btn" onClick={this.closefilter} style={{textAlign:'initial'}}>{t("Apply_Filter")}</button>
                            <a  onClick={this.closefilter} className="close-sidebar-widget"></a>
                        </div>
                           <div className="horizontal-filter-dropdown" >
                        
                                <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                                    <div className="widget-title-header" style={{textAlign:'initial'}}>
                                        <h4 className="widget-title">{t("FilterbySpec")} </h4>
                                    </div>
                                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px' ,textAlign:'initial'}}>
                                        <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{ right: '-17px' }}>
                                            {this.props.colors.map((color, index) => {
                                                return (
                                                    <div className="form-check pgs-filter-checkbox" key={index}>
                                                        <input type="checkbox" onClick={(e) => this.onClickColorFilter(e, colorsFilterValues)} value={color} defaultChecked={colorsFilterValues.includes(color) ? true : false} className="form-check-input" id={color} />
                                                        <label className="form-check-label"
                                                            htmlFor={color}>{color}</label>
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                        </div>
                            <div className="horizontal-filter-dropdown" >
                                <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                                    <div className="widget-title-header" style={{textAlign:'initial'}}>
                                        <h4 className="widget-title">{t("ServicesTreatments")}</h4>
                                    </div>
                                <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px',textAlign:'initial' }}>
                                        {this.props.categorys.map((category, index) => {
                                            return (
                                                <div className="form-check pgs-filter-checkbox" key={index}>
                                                    <input type="checkbox" onClick={(e) => this.onClickCategoryFilter(e, categoryFilterValues)} value={category} defaultChecked={categoryFilterValues.includes(category) ? true : false} className="form-check-input" id={category} />
                                                    <label className="form-check-label"
                                                        htmlFor={category}>{category}</label>
                                                </div>)
                                        })}
                                    </div>
                                </div>
                                
                        </div>
                            <div className="horizontal-filter-dropdown">
                            <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                                <div className="widget-title-header" style={{textAlign:'initial'}}>
                                    <h4 className="widget-title">{t("FilterbyInsurance")}</h4>
                                </div>
                                <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px' ,textAlign:'initial'}}>
                                    {this.props.sizes.map((size, index) => {
                                        return (

                                            <div className="form-check pgs-filter-checkbox">
                                                <input type="checkbox" onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)} value={size} defaultChecked={sizeFilterValues.includes(size) ? true : false} className="form-check-input" id={size} />
                                                <label className="form-check-label" htmlFor={size}>{size}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                 }
            </div>

        )
    }
}

const mapDispatchToProps = state => ({

    colors: uniqueSpecialty(state.doctors.doctors),//Specialty
    categorys: uniqueRegion(state.doctors.doctors), //Region
    sizes: uniqueInsurance(state.doctors.doctors),//Insurance
    services:uniqueService(state.doctors.doctors),//services
    
    filters: state.filters
})

export default connect(
    mapDispatchToProps,
    { categoryValue, sizeValue, colorValue, serviceValue,searchValue }
)(withTranslation("translations")(HorizontalFilterDoctors));