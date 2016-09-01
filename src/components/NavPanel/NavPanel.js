import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';
import config from 'config';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  }),
  { logout, pushState: push })
export default class NavPanel extends Component {
  static propTypes = {
    mix: PropTypes.string
  };

  static defaultProps = {
    mix: ''
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { user, mix } = this.props;

    debugger;

    return (
      <Navbar className={mix} inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}>
              <div className={mix.brand} />
              <span>{config.app.title}</span>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse eventKey={0}>
          <Nav navbar pullRight>
            {user && <LinkContainer to="/chat">
              <NavItem eventKey={1}>Chat</NavItem>
            </LinkContainer>}

            <LinkContainer to="/widgets">
              <NavItem eventKey={2}>Widgets</NavItem>
            </LinkContainer>
            <LinkContainer to="/survey">
              <NavItem eventKey={3}>Survey</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={4}>About Us</NavItem>
            </LinkContainer>
            {!user && <LinkContainer to="/login">
              <NavItem eventKey={5}>Войти</NavItem>
            </LinkContainer>}
            {user && <LinkContainer to="/logout">
              <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
                Выйти
              </NavItem>
            </LinkContainer>}
          </Nav>
          {user && <p className={`${mix.loggedInMessage} navbar-text`}>
            Logged in as <strong>{user.email}</strong>.
          </p>}
          {/*
           <Nav navbar pullRight></Nav>
           */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
