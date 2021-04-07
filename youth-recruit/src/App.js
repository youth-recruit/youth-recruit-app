import './App.css';
import { AuthProvider } from './Components/context/AuthContext';
import SignupSeekers from './Components/SignupSeekers';
import SignupRecruiters from "./Components/SignupRecruiters";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import Profile from 'Components/Profile';
import JobPosting from 'Components/home/JobPosting';
import EditProfile from 'Components/EditProfile';
import JobInfo from 'Components/JobInfo';

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
            <Route exact path="/profile/:userId" component={Profile} />
            <Route path="/new-job" component={JobPosting} />
            <PrivateRoute path="/profile/:userId/edit" component={EditProfile} />
            {/*add appropriate path for jobInfo*/}
            <Route path = "/job-info" component = {JobInfo}/>
             {/*<Route path="/home" component={Home} /> remove when done
            <Route path="/home" component={Landing} />  remove when done */}

          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
