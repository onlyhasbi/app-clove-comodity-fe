import SignIn from './pages/auth';
import SignUp from './pages/register';
import Dashboard from './pages/dashboard';
import { Routes, Route } from 'react-router-dom';
import Layout from './element/layout';
import Panen from './pages/panen';
import Pengeringan from './pages/pengeringan';
import Transaksi from './pages/transaksi';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/panen" element={<Panen />} />
        <Route path="/pengeringan" element={<Pengeringan />} />
        <Route path="/transaksi" element={<Transaksi />} />
      </Route>
    </Routes>
  );
}

export default App;
