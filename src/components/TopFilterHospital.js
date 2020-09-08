/**
 * Shop Page Top Filter
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "gatsby"
import { Col, Form, Row } from 'reactstrap';
import { ratingValue, sortValue } from '../Store/actions/filter';
import { getFilterProductsdata } from '../Store/services';
import { withTranslation, Trans } from "react-i18next";

class TopFilterHospital extends Component {

        componentDidMount()
        {
        }
      
      render() {
          const hospitalLength=this.props.hospitalLength;
          const { t ,i18n} = this.props;
          const classStyle=(i18n.language.toString()==='ar'?'ar':'en')
          return (
                  <Row>
                    <Col>
                        {hospitalLength > 0 ? 
                                <p className="result-count">
                                     {t("Showing")} 1–{hospitalLength} {t("resultsOf")} {this.props.AllHospitals.length}
                                </p>
                            : 
                                <p className="result-count">
                                     {t("Showing")} 0 {t("resultsOf")} {this.props.AllHospitals.length}
                                </p>
                            }
                        <div className="gridlist-toggle-wrap">
                            <div className="gridlist-button-wrap">
                            <div className="gridlist-toggle">
                                
                                <Link to="#" title="List view" className="gridlist-button gridlist-toggle-list active"  >
                               
                                </Link> 
                            </div>
                            </div>
                        </div>
                        {/* <Form className="ordering">
                            <select name="orderby" className="orderby select2" onChange={(e) => this.props.ratingValue(e.target.value)} tabIndex={-1} aria-hidden="true">
                                <option value="" selected="selected">Any Rating</option>
                                <option value="5">5 Star</option>
                                <option value="4">4 Star</option>
                                <option value="3">3 Star</option>
                                <option value="2">2 Star</option>
                                <option value="1">1 Star</option>
                            </select>
                        </Form>
                        <Form className="ordering">
                            <select name="orderby" className="orderby select2" onChange={(e) => this.props.sortValue(e.target.value)} tabIndex={-1} aria-hidden="true">
                                <option value=" " selected="selected">Default sorting</option>
                                <option value="NewProduct">Newest Items</option>
                                <option value="Pricehigh">Price: High to Low</option>
                                <option value="Pricelow">Price: Low to High</option>
                            </select>
                        </Form> */}
                    </Col>
                </Row>
        )
    }
}

const mapDispatchToProps  = (state) => ({
    AllHospitals:state.hospitals.hospitals,
    filters: state.filters
})

export default connect(mapDispatchToProps, {sortValue,ratingValue})(withTranslation("translations")((TopFilterHospital)));


