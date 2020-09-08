/**
 *  Contact Detail Page
 */
import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';



function ContactDetail() {

  return (
    <Container>
      <Row>
        <Col sm={12} className="col-sm-12">
          <div className="section-title text-center mb-2">
            <h2 className="title">Get in Touch With Us</h2>
            {/* <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium
                doloremque.</p> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6} lg={4} >
          <div className="TabeebOman_info_box_2 TabeebOman_info_box_2-layout-style_2 TabeebOman_info_box_2-content_alignment-left TabeebOman_info_box_2-with-icon TabeebOman_info_box_2-icon-source-font TabeebOman_info_box_2-icon-style-border TabeebOman_info_box_2-icon-size-lg TabeebOman_info_box_2-icon-shape-round TabeebOman_info_box_2-icon_position-left mb-3 mb-sm-0">
            <div className="TabeebOman_info_box_2-inner clearfix">
              <div className="TabeebOman_info_box_2-icon">
                <div className="TabeebOman_info_box_2-icon-wrap">
                  <div className="TabeebOman_info_box_2-icon-outer">
                    <div className="TabeebOman_info_box_2-icon-inner">
                      <i className="fa fa-map-marker" /> </div>
                  </div>
                </div>
              </div>
              <div className="TabeebOman_info_box_2-content">
                <div className="TabeebOman_info_box_2-content-wrap">
                  <div className="TabeebOman_info_box_2-content-inner">
                    <h6 className="TabeebOman_info_box_2-title inline_hover">Location : </h6>
                    <div className="TabeebOman_info_box_2-content">
                      <p>	67 Al-Maha Street Al-Khwair, Near Al Maya Market. Office 13</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} >
          <div className="TabeebOman_info_box_2 TabeebOman_info_box_2-layout-style_2 TabeebOman_info_box_2-content_alignment-left TabeebOman_info_box_2-with-icon TabeebOman_info_box_2-icon-source-font TabeebOman_info_box_2-icon-style-border TabeebOman_info_box_2-icon-size-lg TabeebOman_info_box_2-icon-shape-round TabeebOman_info_box_2-icon_position-left mb-3 mb-sm-0">
            <div className="TabeebOman_info_box_2-inner clearfix">
              <div className="TabeebOman_info_box_2-icon">
                <div className="TabeebOman_info_box_2-icon-wrap">
                  <div className="TabeebOman_info_box_2-icon-outer">
                    <div className="TabeebOman_info_box_2-icon-inner">
                      <i className="fa fa-phone" /> </div>
                  </div>
                </div>
              </div>
              <div className="TabeebOman_info_box_2-content">
                <div className="TabeebOman_info_box_2-content-wrap">
                  <div className="TabeebOman_info_box_2-content-inner">
                    <h6 className="TabeebOman_info_box_2-title inline_hover">
                      Phone : </h6>
                    <div className="TabeebOman_info_box_2-content">
                      <p>+ 968 711 361 26<br />
                      + 968 970 014 64</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="TabeebOman_info_box_2 TabeebOman_info_box_2-layout-style_2 TabeebOman_info_box_2-content_alignment-left TabeebOman_info_box_2-with-icon TabeebOman_info_box_2-icon-source-font TabeebOman_info_box_2-icon-style-border TabeebOman_info_box_2-icon-size-lg TabeebOman_info_box_2-icon-shape-round TabeebOman_info_box_2-icon_position-left pb-0">
            <div className="TabeebOman_info_box_2-inner clearfix">
              <div className="TabeebOman_info_box_2-icon">
                <div className="TabeebOman_info_box_2-icon-wrap">
                  <div className="TabeebOman_info_box_2-icon-outer">
                    <div className="TabeebOman_info_box_2-icon-inner">
                      <i className="fa fa-envelope-o" /> </div>
                  </div>
                </div>
              </div>
              <div className="TabeebOman_info_box_2-content">
                <div className="TabeebOman_info_box_2-content-wrap">
                  <div className="TabeebOman_info_box_2-content-inner">
                    <h6 className="TabeebOman_info_box_2-title inline_hover">Mail : </h6>
                    <div className="TabeebOman_info_box_2-content">
                      <p>info@TabeebOman.com<br />
                          help@tabeb.om</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

  )

}

export default ContactDetail;

