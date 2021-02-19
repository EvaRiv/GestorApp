/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { css } from "@emotion/react"
import { useStaticQuery, graphql,Link } from "gatsby"
import { rhythm } from "../utils/typography"
import Header from "./header"
import "../components/customize.css"

export default function Layout({ children }) {
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
    <div class = "pageContainer">
      
        <Header siteTitle = {data.site.siteMetadata.title}/>
      
      
      {children}
    </div>
  )
}
