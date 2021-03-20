import './App.css';
import { AuthProvider } from './Components/context/AuthContext';
import SignupSeekers from './Components/SignupSeekers';
import SignupRecruiters from "./Components/SignupRecruiters";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import Landing from './views/examples/Landing';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup/seekers" component={SignupSeekers} />
            <Route path="/signup/recruiters" component={SignupRecruiters} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/home" component={Home} />  {/*remove when done*/}
            <Route path="/home" component={Landing} />  {/*remove when done*/}

          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
