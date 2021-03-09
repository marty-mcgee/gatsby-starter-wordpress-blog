/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
//import Link from 'next/link';
//import Router from 'next/router';
import { Link, Router, graphql } from "gatsby"
import Config from '/config';
//import { ReactComponent as Logo } from '/static/images/company_juice_logo_v003_210x50_white.svg';
//import SearchIcon from '/static/images/search.svg';

/**
 * GraphQL menu query
 * Gets the labels, types (internal or external) and URLs
 */
const MENU_QUERY = graphql`
  query MenuQuery {
    wpMenu(slug: { eq: "header-menu" })
  }
`;

const Logo = () => (
  <img src="/images/company_juice_logo_v003_210x50_white.svg" height="50" width="210" alt="Our Logo" />
)

const SearchIcon = () => (
  <img src="/images/search.svg" height="20" width="20" alt="Search Our Site" />
)

const getSlug = url => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

class Menu extends Component {
  state = {
    token: null,
    username: null,
    menus: [],
  };

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    const username = localStorage.getItem(Config.USERNAME);
    this.setState({ token, username });
    this.executeMenu();
  }

  /**
   * Execute the menu query, parse the result and set the state
   */
  executeMenu = async () => {
    const { client } = this.props;
    const result = await client.query({
      query: MENU_QUERY,
    });
    console.log("----");
    console.log(result);
    console.log("----");
    const menus = result.data.headerMenu;
    this.setState({ menus });
  };

  render() {
    const { token, username } = this.state;

    //const authToken = localStorage.getItem(AUTH_TOKEN);
    const { menus } = this.state;
    const { history } = this.props;

    const handleSelectChange = (e) => {
      //location.href = e.target.value;
    }

    return (
      <div className="menu bb">
        <div className="flex justify-between w-90-l center-l">
          <div className="brand bb flex justify-center items-center w-100 justify-between-l bn-l">
            <Link to="/?ref=header" className="starter-kit-logo">
                <Logo />
                <div className="pl2" style={{display: 'none'}}>
                  Give Your Company A Boost!
                </div>
            </Link>
          </div>
          <div className="links dn flex-l justify-between items-center">
            {menus.map(item => {
              if (item.object === 'custom') {
                return (
                  <a href={item.url} key={item.ID}>{item.title}</a>
                );
              }
              const slug = getSlug(item.url);
              const actualPage = item.object === 'category' ? 'category' : 'post';
              return (
                <Link
                  to={`/${item.object}/${slug}`}
                  href={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                  key={item.ID}
                >
                  {item.title}
                </Link>
              );
            })}

            <Link to="/search">
              <SearchIcon />
            </Link>

            {token ? (
              <a
                className="pointer round-btn ba bw1 pv2 ph3"
                onClick={() => {
                  localStorage.removeItem(Config.AUTH_TOKEN);
                  Router.push('/login');
                }}
              >
                Log Out {username}
              </a>
            ) : (
              <Link to="/login" className="round-btn ba bw1 pv2 ph3">
                Log In
              </Link>
            )}
          </div>
        </div>
        <div className="dropdown bb flex justify-center items-center dn-l">
          <select
            onChange={handleSelectChange}
          >
            <option value={false}>Menu</option>
            {menus.map(item => {
              if (item.object === 'custom') {
                return (
                  <option
                    value={item.url}
                    key={item.ID}
                  >
                    {item.title}
                  </option>
                );
              }
              const slug = getSlug(item.url);
              const actualPage = item.object === 'category' ? 'category' : 'post';
              return (
                <option
                  value={`/${actualPage}?slug=${slug}&apiRoute=${item.object}`}
                  key={item.ID}
                >
                  {item.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}
export default Menu;
