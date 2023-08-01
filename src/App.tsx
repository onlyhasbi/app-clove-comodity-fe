import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth';
import SignUp from './pages/register';
import Dashboard from './pages/dashboard';
import Layout from './element/layout';
import Panen from './pages/harvest';
import Pengeringan from './pages/drying';
import Transaksi from './pages/transaction';
import Profile from './pages/profile';
import Penawaran from './pages/offer';
import Pekerjaan from './pages/work';
import './app.style.css';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/harvest" element={<Panen />} />
        <Route path="/dry" element={<Pengeringan />} />
        <Route path="/transaction" element={<Transaksi />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/offer" element={<Penawaran />} />
        <Route path="/work" element={<Pekerjaan />} />
      </Route>
    </Routes>
  );
}

export default App;
