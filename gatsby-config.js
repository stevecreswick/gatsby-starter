/**
 * Configuration options for a Gatsby Site
 * 
 * Gatsby Config Properties
 * @see {@link https://www.gatsbyjs.org/docs/gatsby-config}
 * ----------------------------------------
 * @property {object} siteMetadata - Sets Sites Metadata
 * @property {array} plugins  - Custom APIs
 * @property {string} pathPrefix - Apply a prefix i.e. all routes begin with /blogs
 * @property {boolean} polyfill  - se a custom polyfill Promise library
 * @property {object} mapping - Join local datasources as you might with database tables
 * @property {object} proxy - Route unknown endpoints elsewhere
 * @property {function} developMiddleware - Implement express middleware
 * 
 */

module.exports = {
  /**
   * @property {object} siteMetadata
   * Metadata to be used across the site.
   * @see {@link https://www.gatsbyjs.org/docs/gatsby-config/#sitemetadata}
   */
  siteMetadata: {
    title: `Gatsby Filesystem Starter`,
    description: `Starter for populating a page through the filesystem.`,
    author: `@stevecreswick`,
  },

  /**
   * @property {array<object>} plugins
   * Plugins are Node.js packages that implement Gatsby APIs. The config file accepts an array of plugins. 
   * Some plugins may need only to be listed by name, while others may take options.
   * @see {@link https://www.gatsbyjs.org/docs/gatsby-config/#plugins}
   */
  plugins: [
    /**
     * The React Helmet plugin allows us to change the HEAD
     * Useful for updating the title, description, and metadata in the <HEAD>
     * @see {@link https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head}
     */
    `gatsby-plugin-react-helmet`,

    /**
     * The Catch Links plugin implements the history pushState API for non-react created pages
     * This preserves the single-page app feel for HTML generated from other source.
     * e.g. A markdown file with relative links, an a tag that has been created by a CMS WYSIWYG editor
     * @See {@link https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/History_API}
     */
    `gatsby-plugin-catch-links`,


    /**
     * The Gatsby Source Filesystem plugin creates File nodes
     * "Transformer" plugins can then be used to transform File nodes into other types of data.
     * You can have multiple instances of the plugin to read from diffent locations
     * 
     * @property {object} plugin
     * @property {string} plugin.resolve - name of the plugin
     * @property {object} plugin.options
     * @property {string} plugin.options.name - name to associate with the path
     * @property {string} plugin.options.path - path of the directory to read
     * @property {array} plugin.options.ignore - an array of regex file patterns to ignore
     * 
     * @see {@link https://www.gatsbyjs.org/packages/gatsby-source-filesystem/}
     */

    //  Load images from the image folder
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    /**
     * NEW
     * We are going to add a library folder that will have
     * subfolders.  We will not use library in the path,
     * we will use the sub folders in the path.
     */


    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `library`,
        path: `${__dirname}/library/`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },

    /**
     * Parses Markdown files using Remark.
     * @see {@link https://www.gatsbyjs.org/packages/gatsby-transformer-remark/}
     */
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ['gatsby-remark-copy-linked-files', 'gatsby-remark-images', 'gatsby-remark-prismjs'],
      },
    },

    /**
     * Gatsby Sharp
     * These plugins aim to provide excellent out-of-the box settings for processing common web image formats.
     * @see {@link https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/}
     * @see {@link https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/}
     */

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    /**
     * Gatsby Plugin Manifest
     * Adds support for shipping a manifest.webmanifest with your site. 
     * The web application manifest is a JSON file that lets users 
     * (on Chrome, Edge, Firefox, Safari Mobile, and Opera — support in Safari Desktop is under development) 
     * save your web application to their smartphone home screen so it behaves similar to native apps.
     * 
     * @see {@link https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-manifest}
     * @see {@link https://developers.google.com/web/fundamentals/web-app-manifest/}
     */
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],

  /**
   * @property {string} pathPrefix
   * It’s common for sites to be hosted somewhere other than the root of their domain. 
   * Say we have a Gatsby site at example.com/blog/.
   * @see {@link https://www.gatsbyjs.org/docs/gatsby-config/#pathprefix}
   */
  // pathPrefix: '/blog',

  /**
   * @property {boolean} polyfill
   * Gatsby uses the ES6 Promise API. 
   * Because some browsers don’t support this, Gatsby includes a Promise polyfill by default.
   * If you’d like to provide your own Promise polyfill, you can set polyfill to false.
   * @see {@link https://www.gatsbyjs.org/docs/gatsby-config/#polyfill}
   */
  // polyfill: false,

  /**
   * @property {object} mapping
   * Gatsby includes an advanced feature that lets you create “mappings” between node types. 
   * For instance, imagine you have a multi-author markdown blog where you want to “link” 
   * from each blog post to the author information stored in a yaml file named author.yaml.
   * You can map between the author field in frontmatter to the id in the author.yaml objects 
   * by adding to your gatsby-config.js.
   * 
   * 
   * Front matter is included at the begging of .md files in this format:
   * ---
   * path: "/blog/my-first-post"
   * date: "2017-11-07"
   * title: "My first blog post"
   * ---
   * Gatsby uses this mapping when creating the GraphQL schema to enable you to query data from both sources.
   * 
   * @see {@link https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types}
   */
  // mapping: {
  //    1. Map field in front matter to a key in .yml
  //    ------------------------------------------
  //   "MarkdownRemark.frontmatter.author": `AuthorYaml`,
  //    
  //    2. Map .json field to key in another .json file
  //    ------------------------------------------------
  //    Mapping can be used to map an array of ids to any other collection of data. 
  //    For example, if you have two JSON files author.json and stories.json as follows:
  //    in author.json  "stories": ["mobyDick"]
  //    in stories.json { id: 'mobyDick', "story": [...] }
  //   'AuthorJSON.items.stories': `StoriesJson`
  // },

  /**
   * @property {object} proxy
   * Setting the proxy config option will tell the develop server to proxy any unknown requests to your specified server.
   */
  // proxy: {
  //   prefix: "/api",
  //   url: "http://examplesite.com/api/",
  // },

  /**
   * @property {function} developMiddleware
   * Gatsby exposes the Express.js development server to your site’s gatsby-config.js, 
   * where you can add Express middleware as needed.
   * const proxy = require("http-proxy-middleware")
   * @see{@link https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying}
   */
  // developMiddleware: app => {
  //   app.use(
  //     "/.netlify/functions/",
  //     proxy({
  //       target: "http://localhost:9000",
  //       pathRewrite: {
  //         "/.netlify/functions/": "",
  //       },
  //     })
  //   )
  // },
}
