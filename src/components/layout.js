import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <header className="global-header">
        {isHomePage ? (
          <h1 className="main-heading">
            <Link to="/?ref=header">{parse(title)}</Link>
          </h1>
        ) : (
          <Link className="header-link-home" to="/?ref=header">
            {title}
          </Link>
        )}
      </header>
      
      {/* the main, baby */}
      <main>{children}</main>

      <footer>
        <div className="labs-footer bg-black">
          <a href="/?ref=footer">
            <img src="https://companyjuice.com/static/images/company_juice_logo_v003_210x50_white.svg" height="50" />
          </a>
          <p className="white">Give Your Company A Boost!</p>
          <p className="white">We are React + WordPress experts.</p>
          <p className="white">
            <a href="https://github.com/companyjuice">GitHub</a>
            &nbsp;-||-&nbsp;
            <a href="https://www.linkedin.com/in/martymcgee">LinkedIn</a>
          </p>
          <p className="white">
            © {new Date().getFullYear()} Company Juice, built with
            {` `}
            <a href="https://www.gatsbyjs.com/">Gatsby</a> +
            {` `}
            <a href="https://wordpress.org/">WordPress</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
