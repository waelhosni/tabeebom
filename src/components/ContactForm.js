/**
 * Contact Form
 */
import React , {Component} from 'react';
import { Row, Col } from 'reactstrap';
import { Form,  Input } from 'reactstrap';
import axios from 'axios'




class ContactForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sendSuccess:false,
        sendMessage:'',
        fieldvalue:{},
        errors: {}

      };
    }
      ContactNumberHandler = (event) => {
        this.setState({ContactNumber: event.target.value});
      }

      ContactNameHandler = (event) => {
        this.setState({ContactName: event.target.value});
      }

      ContactMessageandler = (event) => {
        this.setState({ContactMessage: event.target.value});
      }


    insert_ContactUs (fieldvalue){

        axios.post('https://api.tabeeboman.com/TabebApi/Appointment/insert_ContactUs',
        {
        
              ContactNumber:fieldvalue.phoneNo,
              ContactName:fieldvalue.Name,
              ContactMessage:fieldvalue.message
            
          }
          )
          .then(resp => this.setState({sendSuccess:true}))
          .catch(error => this.setState({sendSuccess:false,sendMessage:error}));
    
         
    
    }
    handleValidation()
  {
        let fieldvalue=this.state.fieldvalue;
        let errors = {};
        let formIsValid = true;

        //First Name
        if (!fieldvalue["Name"]) {
            formIsValid = false;
            errors["Name"] = "Please Enter Name";
        }

        if (typeof fieldvalue["Name"] !== "undefined") {
            if (!fieldvalue["Name"].match(/^[a-zA-Z]+$/)) {
              formIsValid = false;
              errors["Name"] = "Please Enter Only Letter";
            }
        }

       



      //phone no
      if (!fieldvalue["phoneNo"]) {
          formIsValid = false;
          errors["phoneNo"] = "Please Enter Phone NO";
      }

      if (typeof fieldvalue["phoneNo"] !== "undefined") {
          if (!fieldvalue["phoneNo"].match(/^[97]\d{7}$/)) {
            formIsValid = false;
            errors["phoneNo"] = "Please Enter Valid Phone No";
          }
      }

          //Message
      if (!fieldvalue["message"]) {
        formIsValid = false;
        errors["message"] = "Please Enter Your Massage";
      }


    //   //Email ID
    //   if (!fieldvalue["emailid"]) {
    //     formIsValid = false;
    //     errors["emailid"] = "Please Enter Email ID";
    //   }

    //   if (typeof fieldvalue["emailid"] !== "undefined") {
    //       if (!fieldvalue["emailid"].match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$/)) {
    //         formIsValid = false;
    //         errors["emailid"] = "Please Enter Valid Email Address";
    //       }
    //   }

    

      this.setState({ errors: errors });
      
      return formIsValid;

  }

  onProfileFormSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
        this.insert_ContactUs(this.state.fieldvalue)
       return true;
    }
    else
    {
       // alert('Please Enter Valid Data.');
    }
  }
  handleChange(field, e){
    let fieldvalue=this.state.fieldvalue;
    fieldvalue[field] = e.target.value;
    this.setState({fieldvalue});
  }
    ContactForm() {
        
    
        return (
            <div className="contact-wrapper bg-gray w-100">
                <div className="section-title">
                    <h2 className="title text-left">Send Us Message</h2>
                    <p>Feel free to contact us with any questions, inquiries or comments by filling out this form. Alternatively,
                         if you have a medical question, please make an appointment with a doctor.</p>
                    </div>
                        <Form onSubmit={this.onProfileFormSubmit.bind(this)}>
                        <Row>
                            <Col lg={4}>
                            <div className="form-group">
                                {/* <Input type="text" className="form-control" placeholder="Name" required onChange={this.ContactNameHandler}  value={this.state.ContactName}/> */}
                                <input type="text" class="form-control" value={this.state.fieldvalue.Name}  onChange={this.handleChange.bind(this, "Name")} placeholder="Name" />
                                <span className="error">{this.state.errors["Name"]}</span>
                            </div>
                            </Col>
                            <Col lg={4}>
                            <div className="form-group">
                                <Input type="text" className="form-control" placeholder="Phone Number" value={this.state.fieldvalue.phoneNo} onChange={this.handleChange.bind(this, "phoneNo")}/>
                                <span className="error">{this.state.errors["phoneNo"]}</span>
                            </div>
                            </Col>
                            {/* <Col lg={4}>
                            <div className="form-group">
                                <Input type="text" className="form-control" placeholder="Subject" />
                            </div>
                            </Col> */}
                            <Col md={12}>
                            <div className="form-group">
                                <textarea name="your-message" cols={30} rows={4} className="form-control" value={this.state.fieldvalue.message} onChange={this.handleChange.bind(this, "message")} placeholder="Please Write Your Text Here" defaultValue={""} />
                                <span className="error">{this.state.errors["message"]}</span>
                            </div>
                            </Col>
                            <Col md={12} >
                            <Input type="submit" defaultValue="Send Message" className="btn btn-default" />
                            </Col>
                        </Row>
                    </Form>
                </div>
               )
    
    }

    render(){
        return(
            this.ContactForm()
        )
    }
}
export default ContactForm;
