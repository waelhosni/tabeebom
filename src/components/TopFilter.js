/**
 * Shop Page Top Filter
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "gatsby"
import { Col, Form, Row } from 'reactstrap';
import { ratingValue, sortValue } from '../Store/actions/filter';
import { withTranslation, Trans } from "react-i18next";

class TopFilter extends Component {

        componentDidMount()
        {
        }
       
     
      render() {
          const doctorLength=this.props.doctorLength;
          const { t ,i18n} = this.props;
          const classStyle=(i18n.language.toString()==='ar'?'ar':'en')
          return (
                  <Row>
                    <Col>
                        {doctorLength > 0 ? 
                                <p className="result-count">
                                {t("Showing")} 1–{doctorLength} {t("resultsOf")} {this.props.AllDoctors.length}
                            </p>
                        : 
                            <p className="result-count">
                                {t("Showing")} 0 {t("resultsOf")} {this.props.AllDoctors.length}
                            </p>
                            }
                        <div className="gridlist-toggle-wrap">
                            <div className="gridlist-button-wrap">
                            <div className="gridlist-toggle">
                                <Link to="#" title="List view" className="gridlist-button gridlist-toggle-list active"  >
                                <em>{t("List_view")}</em>
                                </Link> 
                            </div>
                            </div>
                        </div>
                        <Form className="ordering">
                            <select name="orderby" defaultValue="5" className="orderby select2" onChange={(e) => this.props.ratingValue(e.target.value)} tabIndex={-1} aria-hidden="true">
                                <option value="" selected="selected">{t("Any_Rating")}</option>
                                <option value="5">{t("5_Star")}</option>
                                <option value="4">{t("4_Star")}</option>
                                <option value="3">{t("3_Star")}</option>
                                <option value="2">{t("2_Star")}</option>
                                <option value="1">{t("1_Star")}</option>
                            </select>
                        </Form>
                        <Form className="ordering">
                            <select name="orderby" defaultValue="NewProduct"  className="orderby select2" onChange={(e) => this.props.sortValue(e.target.value)} tabIndex={-1} aria-hidden="true">
                            <option value=" " selected="selected">{t("Default_sorting")}</option>
                                <option value="NewProduct">{t("Newest_Items")}</option>
                                <option value="Pricehigh">{t("High_to_Low")}</option>
                                <option value="Pricelow">{t("Low_to_High")}</option>
                            </select>
                        </Form>
                    </Col>
                </Row>
        )
    }
}

const mapDispatchToProps  = (state) => ({
    filters: state.filters,
    AllDoctors:state.doctors.doctors,
})

export default connect(mapDispatchToProps, {sortValue,ratingValue})(withTranslation("translations")((TopFilter)));


