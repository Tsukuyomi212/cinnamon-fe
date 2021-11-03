import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './login.css';

export const LoginForm = ({ handleSubmit }) => {
  const initialValues = { email: '', password: '' };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email').required('Email field can not be empty'),
    password: Yup.string().trim().required('Password field can not be empty'),
  });

  return (
    <div className="login-form-container">
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <div className="login-input-container">
              <label className="form-label">Email:</label>
              <Field
                label="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                autoFocus
                className="login-field"
              />
              {errors.email && touched.email ? (
                <div className="input-error">{errors.email}</div>
              ) : null}
            </div>
            <div className="login-input-container">
              <label className="form-label">Password:</label>
              <Field
                label="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
                className="login-field"
              />
              {errors.password && touched.password ? (
                <div className="input-error">{errors.password}</div>
              ) : null}
            </div>
            <div className="center-element">
              <button type="submit" className="login-submit-btn">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};
