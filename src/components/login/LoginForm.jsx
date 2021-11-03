import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export const LoginForm = ({ handleSubmit }) => {
  const initialValues = { email: '', password: '' };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email').required('Email field can not be empty'),
    password: Yup.string().trim().required('Password field can not be empty'),
  });

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <div>
              <label>Email: </label>
              <Field
                label="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div>
              <label>Password: </label>
              <Field
                label="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" data-testid="login-submit-button">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};
