import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes';
import './styles/globals.css';
import './styles/tailwind.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
};

export default App;