/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta,keywords, title,pathname }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
            
          }
        }
      }
    `
  )

  //
  //const metaDescription = description || site.siteMetadata.description
  const metaDescription =description? description : site.siteMetadata.description 

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
  
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
       title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }

      
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // {
        //   name:  `keywords`,
        //   content: site.siteMetadata.keywords,
        // },

        {
          name: `copyright` ,
          content:`Technology Business Solutions TBS (Tabeeb Oman)` ,
        },
        {
          name:`topic`,
          content: `Booking doctors, find a doctor, search doctors`,
        },
        {
          name:`summary`,
          content: `Tabeeb Oman Getting a doctor’s appointment will now become as easy, Sultanate of Oman The First doctor and booking appointment in the Sultanate of Oman,Visitors  can search for a suitable doctor for their health issue by through sections on specialities, Find Doctors in Muscat Oman"`,
        },
        {
          name: `Classification`,
          content: `Doctor services`,
        },
        {
          name:`owner`,
          content: `Technology Business Solutions Wael Mohamed Hosni`,
        },
        {
          name: `category`,
          content: `Business service, Medical company, Medical and health, Health &amp; wellness website`,
        },
        
        {
          name: `coverage`,
          content: `Worldwide, Oman, Sultanate of Oman`,
        },




        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:site_name`,
          content: `Tabeeb Oman`,
        },

        {
          name: `geo.position`,
          content: `23.583151; 58.423856`,
        },
        {
          name: `geo.placename`,
          content: `Oman Muscat Al khuwair`,
        },
        {
          name: `geo.region`,
          content: `OM-AR`,
        },


        {
          name: `twitter:card`,
          content: `summary`,
        },
        
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        }
        ,
        {
          name: `twitter:site`,
          content: `@TabeebOm`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        }
        ,
        {
          name: 'google-site-verification',
          content: 'h009lmgOtUDAFH9PdTKE2My0lQlnUHeWfzT48f5rwPE'
        }
        
      ]
      .concat(
            {
              name: `keywords`,
              content:`${keywords}`
              // content:`${site.siteMetadata.keywords} , ${keywords.length > 0 && keywords.join(`, `)}`  
            }
        
      )
      .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  pathname: PropTypes.string,
}

export default SEO
