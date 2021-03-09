import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from 'html-react-parser'
import Menu from '../components/Menu'

const Header = ({ isHomePage, children }) => {
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
    <header className="global-header">
      <nav className="header-nav">
        <Menu menu="header-menu" />
      </nav>
      {/*isHomePage ? (
        <h1 className="main-heading">
          <Link to="/?ref=header">{parse(title)}</Link>
        </h1>
      ) : (
        <Link className="header-link-home" to="/?ref=header">
          {title}
        </Link>
      )*/}
    </header>
  )
}

export default Header
