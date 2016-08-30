import React, { Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import loginValidation from './loginValidation';
// import Col from 'react-bootstrap/lib/Col';
// import Form from 'react-bootstrap/lib/Form';
// import FormGroup from 'react-bootstrap/lib/FormGroup';
// import FormControl from 'react-bootstrap/lib/FormControl';
// import Button from 'react-bootstrap/lib/Button';
// import Checkbox from 'react-bootstrap/lib/Checkbox';

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  };

  render() {
    const styles = require('./LoginForm.scss');
    const {
      fields: { email, password },
      handleSubmit,
      error
    } = this.props;

    const renderInput = (field, label, type = 'text') =>
      <div className={`form-group ${field.error && field.touched ? 'has-error' : ''}`}>
        <div htmlFor={field.name} className={`col-sm-3 text-right ${styles.controlLabel}`}>{label}</div>
        <div className={`col-sm-9 right-block ${styles.inputFormContainer}`}>
          <input type={type} className="form-control" name={field.name} {...field} />
          {field.error && field.touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
          {field.error && field.touched &&
            <div className={`text-danger ${styles.textDanger}`}><strong>{field.error}</strong></div>}
        </div>
      </div>;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {renderInput(email, 'Эл. почта')}
        {renderInput(password, 'Пароль', 'password')}
        {error && <p className={`text-danger ${styles.textDanger}`}><strong>{error}</strong></p>}
        <button className="btn btn-success center-block" type="submit">
          <i className="fa fa-sign-in" />{' '}Войти
        </button>
      </form>
    );

    // return (
    //   <Form horizontal onSubmit={handleSubmit}>
    //     <FormGroup controlId="formHorizontalEmail">
    //       <Col className={styles.controlLabel} sm={2}>
    //         Email
    //       </Col>
    //       <Col sm={10}>
    //         <FormControl type="email" placeholder="Email" />
    //       </Col>
    //     </FormGroup>
    //
    //     <FormGroup controlId="formHorizontalPassword">
    //       <Col className={styles.controlLabel} sm={2}>
    //         Password
    //       </Col>
    //       <Col sm={10}>
    //         <FormControl type="password" placeholder="Password" />
    //       </Col>
    //     </FormGroup>
    //
    //     <FormGroup>
    //       <Col smOffset={2} sm={10}>
    //         <Checkbox>Remember me</Checkbox>
    //       </Col>
    //     </FormGroup>
    //
    //     <FormGroup>
    //       <Col smOffset={2} sm={10}>
    //         <Button type="submit">
    //           Sign in
    //         </Button>
    //       </Col>
    //     </FormGroup>
    //   </Form>
    // );
  }
}
