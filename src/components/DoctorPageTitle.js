
/**
 * Page title component
 */
import React from 'react';
import { Col } from 'reactstrap';
import { Link } from "gatsby"
import { withTranslation, Trans } from "react-i18next";

function DoctorPageTitle(props) {
    const { t ,i18n} =props;
   return (
      <Col>
      <div className="intro-title-inner">
      <h1>{props.title}</h1>
      </div>
      <ul className="TabeebOman_breadcrumbs page-breadcrumb breadcrumbs">
          <li className="home">
              <span style={{marginRight: 15,}}>
              <Link className="bread-link   " to="/">{t("Home")}</Link>
              </span>
          </li>
          <li><span style={{marginRight: 15,}}>{props.title}</span></li>
      </ul>
      </Col>
   )
}

export default withTranslation("translations")(DoctorPageTitle);