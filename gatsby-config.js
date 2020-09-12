module.exports = {
  siteMetadata: {
    title: `TabeebOman - Your medical world in your hands`,
    description: `Tabeeb Oman: Getting a doctor’s appointment will now become as easy Sultanate of Oman The First doctor and booking appointment in the Sultanate of Oman.
    Visitors  can search for a suitable doctor for their health issue by through sections on specialties, Find Doctors in Muscat Oman`,
    author: `Tabeeb Oman @Technology Business Solutions TBS, info@tabeeboman.com`,
    keywords:`tabeeb, oman, Best, A doctor, Book, booking, Your, appointment, With, Sultanate, of, Oman, Search, find, About, doctors,inside, States, Provinces, Muscat, Salalah, Specializations, Services, wilayat, hospital, clinic, Medical, center,Healthcare, Medical`,
    siteUrl:`https://TabeebOman.com/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tabeeb-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
