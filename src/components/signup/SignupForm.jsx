import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

export const SignupForm = ({ handleSubmit }) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange }) => (
          <Form>
            <div>
              <label>Username: </label>
              <Field
                label="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div>
              <label>Email: </label>
              <Field
                label="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
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
            <div>
              <label>Password confirmation: </label>
              <Field
                label="passwordConfirmation"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Signup</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
};
