/**
 *  Contact Us Page
 */
import { GoogleApiWrapper, Map } from 'google-maps-react';
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Layout from "../components/layout"

import Businessschedule from '../components/Businessschedule';
import ContactDetail from '../components/ContactDetail';
import ContactForm from '../components/ContactForm';
import PageTitle from '../components/PageTitle';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Contactus extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
    return(
      <Layout>
        <div className="site-content">
            <div className="inner-intro header_intro header_intro_bg-image header_intro_opacity header_intro_opacity-custom">
            <Container>
                <Row className="intro-title align-items-center intro-section-center">
                    <PageTitle title="Contact Us"/>
                </Row>
              </Container>
            </div>
          <div className="content-wrapper">
          <div className="section-wrapper section-pt pb-6">
                <ContactDetail />
          </div>
          <div className="section-wrapper">
            <Row className="row-equal-height no-gutters">
              <Col md={6}>
                    <ContactForm />
              </Col>
              <Col md={6} className="google-map">
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                    lat: 23.5838,
                    lng: 58.4238
                    }}
                  />
              </Col>
            </Row>
          </div>
          <div className="section-wrapper section-ptb">
            <Container>
                    <Businessschedule />
            </Container>
          </div>
        </div>
        </div>
        </Layout>
        )
    }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCT0K_7ni2olq9a_0tn5QXDklgXakBE7Mw'
})(Contactus);
