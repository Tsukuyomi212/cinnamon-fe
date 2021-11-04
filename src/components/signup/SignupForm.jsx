import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import './signup.css';

export const SignupForm = ({ handleSubmit }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const RegisterSchema = Yup.object().shape({
    username: Yup.string().trim().required('You have to pick a username'),
    email: Yup.string().trim().email('Invalid email').required('Email field can not be empty'),
    password: Yup.string().trim().required('Password field can not be empty'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords need to match',
    ),
  });

  return (
    <div className="register-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <div className="register-input-container">
              <label className="form-label">Username: </label>
              <Field
                label="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                required
                autoFocus
                className="register-field"
              />
              {errors.username && touched.username ? (
                <div className="input-error">{errors.username}</div>
              ) : null}
            </div>
            <div className="register-input-container">
              <label className="form-label">Email: </label>
              <Field
                label="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                className="register-field"
              />
              {errors.email && touched.email ? (
                <div className="input-error">{errors.email}</div>
              ) : null}
            </div>
            <div className="register-input-container">
              <label className="form-label">Password: </label>
              <Field
                label="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
                className="register-field"
              />
              {errors.password && touched.password ? (
                <div className="input-error">{errors.password}</div>
              ) : null}
            </div>
            <div className="register-input-container">
              <label className="form-label">Confirm password: </label>
              <Field
                label="passwordConfirmation"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
                required
                className="register-field"
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div className="input-error">{errors.passwordConfirmation}</div>
              ) : null}
            </div>
            <div className="center-element">
              <button type="submit" className="register-submit-btn">
                Signup
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
};
