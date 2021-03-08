import './App.css';
import { AuthProvider } from './Components/context/AuthContext';
import Signup from './Components/Signup';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Signup />
      </div>
    </AuthProvider>
  );
}

export default App;
