import { Formik, Form, Field } from 'formik';

export const LoginForm = ({ handleSubmit }) => {
  const initialValues = { email: '', password: '' };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
