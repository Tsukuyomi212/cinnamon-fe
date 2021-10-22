import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Homepage } from './components/homepage/Homepage';
import { HOMEPAGE, LOGIN, SIGNUP } from './utils/routes';
import { LoginPage } from './components/login/LoginPage';
import { SignupPage } from './components/signup/SignupPage';
import { AuthContextProvider } from './contexts/AuthContextProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
          <Switch>
            <Route exact path={HOMEPAGE} component={Homepage} />
            <Route exact path={SIGNUP} component={SignupPage} />
            <Route exact path={LOGIN} component={LoginPage} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
