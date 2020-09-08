/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import i18n from '../lang/i18n'
import {I18nextProvider} from "react-i18next";

import Header from "./Header"
import Footer from "./Footer"



import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
 import 'font-awesome/css/font-awesome.min.css';
//import "../../node_modules/react-table/react-table.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import "../../node_modules/react-table/react-table.css";


import '../assets/css/plugins.css';
import '../assets/css/default.css';
import '../assets/css/new-fashion.css';
import '../assets/css/modern.css';
import '../assets/css/responsive.css';
import '../assets/css/style.css';
import '../assets/css/StyleTab.css';



const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div id="root">
      <I18nextProvider i18n={i18n}>
        {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
        <Header  />
        <main>{children}</main>
       
        <Footer/>
        </I18nextProvider>
      </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
