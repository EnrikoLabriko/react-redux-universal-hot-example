import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { LoginForm } from 'components';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

@connect(
  state => ({ user: state.auth.user }),
  { ...notifActions, ...authActions })
export default class CustomLogin extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    notifSend: PropTypes.func
  };

  login = data => this.props.login(data)
    .then(result => {
      this.props.notifSend({
        message: 'You\'r logged !',
        kind: 'success',
        dismissAfter: 2000
      });
      return result;
    });

  render() {
    const styles = require('./Login.scss');
    const { user, logout } = this.props;
    return (
      <div className={`${styles.loginContainer} col-sm-4 col-sm-offset-4 container`}>
        <Helmet title="CustomLogin" />
        <h1 className="text-center">Авторизация</h1>
        {!user && <div>
          <LoginForm onSubmit={this.login} />
          <br />
        </div>
        }
        {user && <div>
          <p>You are currently logged in as {user.email}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out" />{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}