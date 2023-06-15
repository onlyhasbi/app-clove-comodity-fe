import SignIn from './pages/auth';
import SignUp from './pages/register';
import Dashboard from './pages/dashboard';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const isAuthSuccess = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthSuccess) navigate('/signin');
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuthSuccess ? <Dashboard /> : null} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
