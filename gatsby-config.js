 module.exports = {
  siteMetadata: {
    title: `Learnscape`,
    description: `Generate a video course on anything in just one click.`,
    author: `@Stojacode`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
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
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/icons/favicon-32x32.png`, // This path is relative to the root of the site.
        
      },
    },
    `gatsby-plugin-styled-components`, 
  ],
}
