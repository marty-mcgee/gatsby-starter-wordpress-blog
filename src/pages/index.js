import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

//import Header from "../components/Header"
//import Menu from "../components/Menu"
//import Footer from "../components/Footer"

//console.log("HEY HEY HEY")

const Home = ({ isHomePage, children, data, location }) => {
  const siteTitle = "Company Juice"; //data.site.siteMetadata.title
  console.log("--------------------------")
  console.log(data.site.siteMetadata.title)
  console.log("--------------------------")

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <h1>{siteTitle}</h1>
      <p>You just hit a route that exists... the light.</p>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`