/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
  
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
   
    if (page.path.match(/^\/TestProps/)) {
      page.matchPath = `/TestProps/:id`
      page.matchPathIsBackup = true;
  
      // Update the page.
      createPage(page)
    }
    // else if (page.path.match(/^\/app/)) {
    //   page.matchPath = `/app/*`
  
    //   // Update the page.
    //   createPage(page)
    // }
  }