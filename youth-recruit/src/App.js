import './App.css';
import { AuthProvider } from './Components/context/AuthContext';
import Signup from './Components/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
