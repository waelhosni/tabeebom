/**
 *  Header Main
 */
import classnames from 'classnames';
import React, { Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from "gatsby"
import { Col, Collapse, Container, DropdownItem, DropdownMenu, Modal, ModalBody, ModalHeader, Nav, Navbar, NavbarToggler, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledDropdown } from 'reactstrap';
import logo from '../assets/images/logo_a.png';
import navLinks from './NavLinks.js';
import { withTranslation } from "react-i18next";
import flat1 from '../assets/images/flag.jpg'
import flat2 from '../assets/images/flag2.jpg'
import axios from 'axios'




class Header extends React.Component {
    constructor(props) {

        super(props);
        this.ReadCartItems = this.ReadCartItems.bind(this);
        this.ReadWishListItems = this.ReadWishListItems.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            timeout: true,
            modal: false,
            activeTab: '1',
            isOpen: false,
            collapsed: true,
            CartHide:true,
            classset:'',
            redirectLogin:false,
            UsernameCrypto:'',
            PasswordCrypto:'',
            LoginError:false,
            PhoneEmail:'',
            errorMessagePhoneEmail:'',
            Password:'',
            errorMessagePassword:'',

           

        }
       
        this.toggle = this.toggle.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.ShowCart = this.ShowCart.bind(this);

        this.PhoneEmailChangeHandler = this.PhoneEmailChangeHandler.bind(this);
        this.PasswordChangeHandler= this.PasswordChangeHandler.bind(this);
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }

    logintoggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    ReadCartItems() {
        return JSON.parse(localStorage.getItem("LocalCartItems"));
    }
    removeFromCart = (Index) => {
        var UpdatedCart = JSON.parse(localStorage.getItem("LocalCartItems"));
        UpdatedCart = UpdatedCart.slice(0, Index).concat(UpdatedCart.slice(Index + 1, UpdatedCart.length));
        localStorage.removeItem("LocalCartItems");
        localStorage.setItem("LocalCartItems", JSON.stringify(UpdatedCart));
    }

    ReadWishListItems() {
        return JSON.parse(localStorage.getItem("LocalWishListItems"));
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

      componentDidMount() {
        window.addEventListener('scroll', this.handleScroll); 
      }
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }

      handleScroll(event) {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;

        if(scrollTop > 100)
        {
            document.getElementById("site-header").setAttribute("class","site-header header-style-menu-center is-sticky");
            if(document.getElementById("tab-search"))
                {
                    
                    document.getElementById("tab-search").setAttribute("class","products-header100");
                }
                if(document.getElementById("headerIcon"))
                {
                    window.innerWidth <= 575 &&
                    document.getElementById("headerIcon").setAttribute("class","row justify-content-end icon-header1 ");
                }

            


        } else {
            document.getElementById("site-header").setAttribute("class","site-header header-style-menu-center");
                if(document.getElementById("tab-search"))
                {
                    
                    document.getElementById("tab-search").setAttribute("class","products-header1");
                }
                if(document.getElementById("headerIcon"))
                {
                    window.innerWidth <= 575 &&
                    document.getElementById("headerIcon").setAttribute("class","row justify-content-end icon-header");
                }
            
        }
      }

      ShowCart() {
          if(this.state.CartHide == true)
          {
            var elm = document.getElementById("DivCartContent");
            if(elm != null)
            {
            document.getElementById("DivCartContent").setAttribute("style","display:block");
            this.state.CartHide = false;
            }
          }
      }

      HideCart()
      {
           var elm = document.getElementById("DivCartContent");
           if(elm != null)
           {
           document.getElementById("DivCartContent").setAttribute("style","display:none");
           this.state.CartHide = true;
           }
      }

      closeNavbar() {
            if (this.state.collapsed !== true) {
            this.toggleNavbar();
            }
        }
    onClickClassAdd(pages){
        if(this.state.classset != pages)
        {
                this.setState({
                    ...this.state,
                    classset:pages
                })
        }
        else
        {
            if(Object.keys(this.state.classset).length == 0){
                this.setState({
                    ...this.state,
                    classset:pages
                })
            }
            else
            {
                this.setState({
                    ...this.state,
                    classset:''
                })
            }
        }
        
    }
  

    OpenSubmenuOpen(id) {
        var elm = document.getElementById(id);
        if(elm != null)
        {
            document.getElementById(id).setAttribute("class","dropdown-menu dropdown-menu-right show")
        }
    }

    OpenSubmenuClose(id) {
        var elm = document.getElementById(id);
        if(elm != null)
        {
            document.getElementById(id).setAttribute("class","dropdown-menu dropdown-menu-right")
        }
    }

    PhoneEmailChangeHandler(event){
 
        let PhoneEmail=event.target.value;
        this.setState({PhoneEmail:PhoneEmail});
    
        if (PhoneEmail.trim().length == 0) {
    
          this.setState({errorMessagePhoneEmail:'Mobile No or Email is required'});
        }
       
        else{
    
          this.setState({errorMessagePhoneEmail:''});
        }
        
    
      };

     PasswordChangeHandler(event){
 
        let Password=event.target.value;
        this.setState({Password:Password});
    
        if (Password.trim().length == 0) {
    
          this.setState({errorMessagePassword:'Password is required'});
        }
       
        else{
    
          this.setState({errorMessagePassword:''});
        }
        
    
      };

    login()
    {
        if (this.state.PhoneEmail.trim().length == 0) {
    
            this.setState({errorMessagePhoneEmail:'Mobile No or Email is required'});
            return;
          }
         
          else{
      
            this.setState({errorMessagePhoneEmail:''});
            
            
          }
        //////////////////////////////////

        if (this.state.Password.trim().length == 0) {
    
            this.setState({errorMessagePassword:'Password is required'});
            return;
          }
         
          else{
      
            this.setState({errorMessagePassword:''});
            
            
          }
        //////////////////////////////////

        this.DoctorLoginAction()

    }
    DoctorLoginAction  () 
    {
      axios.post(
            'https://api.tabeeboman.com/TabebApi/DoctorNew/LoginHospital_or_Doctor?Username='+this.state.PhoneEmail.trim()+'&Password='+this.state.Password.trim())
                .then(resp => 
                    {
                        if (resp.data.StatusMessage=='OK') {
                            if(resp.data.Login.DoctorId)
                             {this.setState({
                                UsernameCrypto:resp.data.Login.Username,
                                PasswordCrypto:resp.data.Login.Password,
                                LoginError:false,
                                redirectLogin: true})}
                            else{
                                {
                                    this.setState({
                                    LoginError:true,
                                    redirectLogin: false})}

                            }
                        }
                        else {
                            this.setState({
                                LoginError:true,
                                redirectLogin: false})
                        
                            
                        }
                    }
            
            )
          .catch(error => {console.log('General error: '+error)});
      }


    render() {
       
       
        let pageName = '/';
        var searchName='/';
        
        if (this.state.timeout == true) {
            setTimeout(function () {
                this.setState({ timeout: false });
            }.bind(this), 2000);  // wait 5 seconds, then reset to false
        }


        const { t, i18n } = this.props;
        const classStyle=(i18n.language==='ar'?'ar':'en')
        const classStyleHeader=(i18n.language==='ar'?'ara-dir':'eng-dir')

        const changeLanguage = lng => {
      
            i18n.changeLanguage(lng);
            // if(lng=="ar")
            // this.setState({navLinkTitle:NavLinksAr})
            // else
            // this.setState({navLinkTitle:NavLinks})
            // this.refreshPage();
          };
        //   const classNavLink=i18n.language.toString()==='ar'?NavLinksAr:NavLinks
        //   if(i18n.language.toString()==='ar')
        //   this.setState({navLinkTitle:NavLinksAr})
        //   else
        //   this.setState({navLinkTitle:NavLinks})

          if (this.state.redirectLogin) {
            window.location.href= 'https://admin.tabeeboman.com/Default.aspx?us='+this.state.UsernameCrypto+'&pa='+this.state.PasswordCrypto;
          }

        return (

            
            <header className="site-header header-style-menu-center" id="site-header">
                {this.state.timeout == false ?
                    <div>
                        <div className="topbar topbar-bg-color-default topbar-desktop-on topbar-mobile-off">
                            <div className="container-fluid">
                                <Row>
                                    <Col lg={6} sm={12}>
                                        <div className="topbar-left text-left">
                                            <div className="topbar-link">
                                                <ul>

                                                    <li className="topbar_item topbar_item_type-email">
                                                        <Link to="/Contactus"><i className="fa fa-envelope-o">&nbsp;</i>info@TabeebOman.com</Link>
                                                    </li>
                                                    <li className="topbar_item topbar_item_type-phone_number">
                                                        <Link to="/Contactus"><i className="fa fa-phone">&nbsp;</i>+968 9700 1464</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} sm={12}>
                                        <div className="topbar-right text-right">
                                            <div className="topbar-link">
                                                <ul>
                                                    <li className="topbar_item topbar_item_type-topbar_menu">
                                                        <div className="menu-top-bar-menu-container">
                                                            <ul className="top-menu list-inline">
                                                                {/* <li className="menu-item">
                                                                    <Link to="/Account/AccountProfile">My account</Link>
                                                                </li> */}
                                                                {/* <li>
                                                                    <a to="#" onClick={this.toggle} data-toggle="modal" data-target="#"><i className="fa fa-sign-in">&nbsp;</i> {t("Log_in")}</a>
                                                                </li> */}
                                                                <li>
                                                                   
                                                                <ul className="header-bar-language">
                                                                    <li>
                                                                    
                                                                        <a className="d-flex"><img src={t("LanguageImag")} alt="flag" />{t("Language")} </a>

                                                                        <ul> 
                                                                    <li><a onClick={() => changeLanguage("en")}  className="d-flex"><img src={flat1} alt="English" />English</a></li>
                                                                    <li><a onClick={() => changeLanguage("ar")}  className="d-flex"><img src={flat2} alt="Arabic" /> عربي</a></li>
                                                                    
                                                                </ul>
                                                                    </li>
                                                                </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li className="topbar_item topbar_item_type-social_profiles">
                                                        <div className="topbar-social_profiles-wrapper">
                                                            <ul className="topbar-social_profiles">
                                                                <li className="topbar-social_profile">
                                                                    <a href={'https://www.facebook.com/TabeebOman'} target="_blank" >
                                                                        <i className="fa fa-facebook" />
                                                                    </a>
                                                                </li>
                                                                <li className="topbar-social_profile" >
                                                                    <a href={'https://twitter.com/TabeebOm/'} target="_blank">
                                                                        <i className="fa fa-twitter" />
                                                                    </a>
                                                                </li>
                                                                <li className="topbar-social_profile" >
                                                                    <a href={'https://www.instagram.com/tabeeb.oman/'} target="_blank">
                                                                        <i className="fa fa-instagram" />
                                                                    </a>
                                                                </li>
                                                                <li className="topbar-social_profile" >
                                                                    <a href={'https://www.youtube.com/channel/UCtDNfY5am1qx3AtvMSVTRsQ'} target="_blank">
                                                                        <i className="fa fa-youtube" />
                                                                    </a>
                                                                </li>
                                                                <li className="topbar-social_profile" >
                                                                    <a href={'https://api.whatsapp.com/send?phone=96897001464&text=&source=&data=&app_absent='} target="_blank">
                                                                        <i className="fa fa-whatsapp" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>

                                                
                                                
                                </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="header-main header-main-bg-color-default">
                            <div className="container-fluid">
                                <Row>
                                    <Col lg={12}>
                                        <div className="row align-items-center justify-content-md-center">
                                            <Col xl={2} lg={2} className="col-6">
                                                <div className="logo-wrapper">
                                                    <Link to="/">
                                                        <img className="img-fluid" src={logo} alt="logo" />
                                                    </Link>
                                                </div>
                                                <div className="clearfix" />
                                            </Col>
                                            <div className={`col ${classStyleHeader}`}  id="mainMenu">
                                                <div className="header-nav header-nav-bg-color-default">
                                                    <div className="header-nav-wrapper">
                                                        <Container>
                                                            <Row>
                                                                <div className="col-12">
                                                                    <div className="primary-nav">
                                                                        <div className="primary-nav-wrapper">
                                                                            <nav className="mega-menu">
                                                                                <div className="menu-list-items">
                                                                                     <Navbar light expand="md" className="front_menu" >
                                                                                        <NavbarToggler onClick={this.toggle} />
                                                                                        <Collapse isOpen={this.state.isOpen} navbar>
                                                                                            {navLinks.map((navLink, index) => (
                                                                                                <Nav className="ml-auto" navbar>
                                                                                                    {(navLink.type && navLink.type === 'subMenu') ?
                                                                                                        <Fragment>
                                                                                                            <UncontrolledDropdown id={`subitem${index}`} nav inNavbar onMouseEnter={()=>this.OpenSubmenuOpen(`submenu_${index}`)} onMouseLeave={()=>this.OpenSubmenuClose(`submenu_${index}`)}>
                                                                                                                <Link id={`link${index}`} aria-haspopup="true" to={navLink.path} className="dropdown-toggle nav-link" aria-expanded="true"> {i18n.language.toString()==='ar'?navLink.menu_titleAr:navLink.menu_title}</Link>
                                                                                                                <DropdownMenu right id={`submenu_${index}`}>

                                                                                                                    {navLink.child_routes && navLink.child_routes.map((subNavLink, index) => (
                                                                                                                        <DropdownItem id={`DDitem${index}`} tag={Link}  className={`nav-item  ${(pageName == subNavLink.path || (subNavLink.path == "/Doctors/clothing/29" && pageName == "/29")) ? 'active' : '' }`} to={subNavLink.path}>{i18n.language.toString()==='ar'?subNavLink.menu_titleAr:subNavLink.menu_title}</DropdownItem>
                                                                                                                    ))}
                                                                                                                </DropdownMenu>
                                                                                                            </UncontrolledDropdown>
                                                                                                    </Fragment>
                                                                                                    :
                                                                                                    <Fragment>
                                                                                                        <NavItem>
                                                                                                            <NavLink href={navLink.path}>{navLink.menu_title}</NavLink>
                                                                                                        </NavItem>

                                                                                                    </Fragment>
                                                                                                    }
                                                                                                </Nav>
                                                                                             ))}
                                                                                        </Collapse>
                                                                                    </Navbar>
                                                                                </div>
                                                                            </nav>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                </div>
                                            </div>
                                            <Col xl={2} lg={2} className="col-6">
                                                <div className="header-nav-right-wrapper">
                                                    <div className="ciya-tools">
                                                        <div className="ciya-tools-wrapper">
                                                            <ul className="ciya-tools-actions">
                                                                {/* <li className="ciya-tools-action ciya-tools-cart">
                                                                    {
                                                                        (this.ReadCartItems() == null || this.ReadCartItems().length == 0) ?
                                                                        <Link className="cart-link" to="#" onClick={() => this.ShowCart()} >
                                                                            <span className="cart-icon"><i className="glyph-icon pgsicon-ecommerce-empty-shopping-cart" /></span>
                                                                            <span className="cart-count count">  {this.ReadCartItems() == null ? 0 : this.ReadCartItems().length}  </span>
                                                                        </Link>

                                                                        :

                                                                        <Link className="cart-link" to="/ShopingCart" onClick={() => this.ShowCart()} >
                                                                            <span className="cart-icon"><i className="glyph-icon pgsicon-ecommerce-empty-shopping-cart" /></span>
                                                                            <span className="cart-count count">  {this.ReadCartItems() == null ? 0 : this.ReadCartItems().length}  </span>
                                                                        </Link>

                                                                    }


                                                                    {(this.ReadCartItems() != null && this.ReadCartItems().length > 0) ?

                                                                        <div className="cart-contents" id="DivCartContent">
                                                                            <div className="widget TabeebOman widget-shopping-cart">
                                                                                <div className="widget-shopping-cart-content">
                                                                                    <div className="pgs-product-list-widget-container has-scrollbar">
                                                                                        <ul className="TabeebOman-mini-cart cart-list">



                                                                                            {this.ReadCartItems().map((CartItem, index) => (

                                                                                                <li className="ciya-mini-cart-item"   >
                                                                                                    <Link onClick={() => this.removeFromCart(index)} id={`Product_${CartItem.ProductID}`} className="remove remove_from_cart_button">×</Link>
                                                                                                    <div className="media">
                                                                                                        <Link to="#"><img width={60} height={76} src={require(`../../assets/images/${CartItem.ProductImage}`)} className="img-fluid" alt /></Link>
                                                                                                        <div className="media-body">
                                                                                                            <Link to="#" className="product-title">{CartItem.ProductName}</Link>
                                                                                                            <span className="quantity">{CartItem.Qty} × <span className="woocs-special_price_code"><span className="ciya-Price-amount amount"><span className="ciya-Price-currencySymbol">$</span>{CartItem.Rate.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span></span></span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </li>
                                                                                            ))}

                                                                                        </ul>
                                                                                    </div>
                                                                                    <p className="TabeebOman-mini-cart__total total"><strong>Subtotal:</strong> <span className="woocs_special_price_code"><span className="TabeebOman-Price-amount amount"><span className="TabeebOman-Price-currencySymbol">$</span> {this.ReadCartItems().reduce((fr, CartItem) => fr + (CartItem.Qty * CartItem.Rate), 0).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span></span></p>
                                                                                    <p className="TabeebOman-mini-cart__buttons buttons">
                                                                                        <Link onClick={() => this.HideCart()} to="/ShopingCart" className="button wc-forward">View cart</Link>
                                                                                        <Link onClick={() => this.HideCart()}  to="/CheckOut" className="button checkout wc-forward">Checkout</Link>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        :
                                                                        <div className="cart-contents" id="DivCartContent">
                                                                            <div className="widget TabeebOman widget-shopping-cart">
                                                                                <div className="widget-shopping-cart-content">
                                                                                    <p className="TabeebOman-mini-cart__total total">
                                                                                    <img src={require(`../../assets/images/empty-cart.png`)} className="img-fluid mr-3" />
                                                                                    <strong>Your cart is currently empty.</strong> <span className="woocs_special_price_code"><span className="TabeebOman-Price-amount amount"><span className="TabeebOman-Price-currencySymbol"></span> </span></span></p>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </li>
                                                                 */}
                                                                
                                                                 {/* <li className="ciya-tools-action ciya-tools-wishlist"> <Link to="/wishlist"><i className="glyph-icon pgsicon-ecommerce-like" /> <span className="wishlist TabeebOman-wishlist-count"> {this.ReadWishListItems() == null ? 0 : this.ReadWishListItems().length} </span> </Link></li> */}
                                                                 <li className="ciya-tools-action ciya-tools-search"><Link to={searchName} ><i className="glyph-icon pgsicon-ecommerce-magnifying-glass"  /></Link></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Navbar color="faded" light >

                                                                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                                                                <Collapse isOpen={!this.state.collapsed} navbar>
                                                                <Nav className="ml-auto" navbar>
                                                                {navLinks.map((navLink, index) => (
                                                                                         <li className={`nav-item ${(this.state.classset == navLink.menu_title) ? 'show' : '' }`}>
                                                                                            {(navLink.type && navLink.type === 'subMenu') ?
                                                                                                <Fragment>
                                                                                                            {navLink.child_routes.length>0?
                                                                                                            <Link id={`link${index}`} to="#" className="nav-link" onClick={()=>this.onClickClassAdd(navLink.menu_title)}>{navLink.menu_title}</Link>
                                                                                                            :<Link id={`linkSub${index}`} to={navLink.path} onClick={() => this.closeNavbar()} className="nav-link" >{navLink.menu_title}</Link>}
                                                                                                            <ul id={`ul${index}`} className={(this.state.classset == navLink.menu_title) ? 'showcollapsed' : 'submenu' }>
                                                                                                                {navLink.child_routes && navLink.child_routes.map((subNavLink, index) => (
                                                                                                                    <li id={`li${index}`} className={`nav-item  ${(pageName == subNavLink.path) ? 'active' : '' }`}    >
                                                                                                                        <a id={`a${index}`} className="nav-link"  onClick={() => this.closeNavbar()} to={subNavLink.path}>{subNavLink.menu_title}</a>
                                                                                                                    </li>
                                                                                                               ))}
                                                                                                            </ul>
                                                                                                </Fragment>
                                                                                                :
                                                                                                <Fragment>
                                                                                                     <NavItem>
                                                                                                        <Link to={navLink.path} className="nav-admin-link" >{navLink.menu_title}</Link>
                                                                                                     </NavItem>

                                                                                                </Fragment>
                                                                                                }
                                                                                            </li> 
                                                                                            ))}
                                                                                    </Nav>
                                                                   </Collapse>
                                                            </Navbar>
                                        </div>
                                    </Col>

                                </Row>
                                <Row >
                                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={"modal-login modal-dialog-centered "+classStyle }>
                                        <ModalHeader toggle={this.toggle}>
                                            <h4 className="mb-0">{t("Sign_in")} </h4>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab === '1' })}
                                                        onClick={() => { this.logintoggle('1'); }}
                                                    >
                                                        {t("SignIn_Hospital_Doctor")}
                                                    </NavLink>
                                                </NavItem>
                                                {/* <NavItem>
                                                    <NavLink
                                                        className={classnames({ active: this.state.activeTab === '2' })}
                                                        onClick={() => { this.logintoggle('2'); }}
                                                    >
                                                        Register
                                                    </NavLink>
                                                </NavItem> */}
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab} className="tab-content1">
                                                <TabPane tabId="1">
                                                    
                                                        <div className="form-group" style={{textAlign:"initial"}}>
                                                            <label>{t("Email_address_Mobile_Number")}  <sup style={{color:'red'}}>* {this.state.errorMessagePhoneEmail}</sup></label>
                                                            <input type="text" className="form-control" placeholder={t("Enter_Email_address_Mobile_Number")} value={this.state.PhoneEmail} onChange={this.PhoneEmailChangeHandler}></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{t("Password")} <sup style={{color:'red'}}>* {this.state.errorMessagePassword}</sup></label>
                                                            <input type="password"className="form-control" placeholder={t("Password")} value={this.state.Password} onChange={this.PasswordChangeHandler}></input>
                                                            {this.state.LoginError&&<label style={{color:'red'}}>{t("errorLogin")} </label>}
                                                        </div>

                                                        <div className="form-group">
                                                            <a className="btn btn-primary mt-1" onClick={() => { this.login(); }}>{t("Log_in")}</a>
                                                            <a className="btn btn-secondary ml-2 mt-1" style={{marginRight:10}} onClick={() => { this.toggle(); }} >{t("Cancel")}</a>
                                                        </div>
                                                        {/* <p className="mb-0">Don't have account? <Link to="#" className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.logintoggle('2'); }} > Register </Link>here</p> */}
                                                    
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <form>
                                                        <div className="form-group">
                                                            <label>{t("NameLogin")}</label>
                                                            <input type="text" className="form-control" placeholder={t("NameLogin")}></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{t("Email_address")}</label>
                                                            <input type="text" className="form-control" placeholder={t("Enter_Email")}></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{t("Password")} </label>
                                                            <input type="password" className="form-control" placeholder={t("Password")}></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>{t("ConfirmPassword")} </label>
                                                            <input type="password" className="form-control" placeholder={t("ConfirmPassword")}></input>
                                                        </div>
                                                        <div className="form-group">
                                                            <a className="btn btn-primary" >{t("Register")}</a>
                                                            <a className="btn btn-secondary ml-2" onClick={this.toggle} >Cancel</a>

                                                        </div>
                                                        <p className="mb-0">{t("Already_have_account")} <Link to="#" className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.logintoggle('1'); }} > {t("Sign_in")} </Link> {t("here")} </p>
                                                    </form>
                                                </TabPane>
                                            </TabContent>
                                        </ModalBody>
                                    </Modal>
                                    <div className="col-12">
                                        <div className="mobile-menu" id="mobileMenu" />
                                     </div>
                                </Row>
                            </div>
                        </div>
                    </div>

                :

                    <div id="preloader">
                        <Loader
                            type="Puff"
                            color="#d89044"
                            height="100"
                            width="100"
                        />
                    </div>
                }
            </header>

        )
    }
};
// export default Header;

export default withTranslation("translations")(Header);
