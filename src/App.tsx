import dayjs from 'dayjs';
import * as locale from 'dayjs/locale/id';
import { Route, Routes } from 'react-router-dom';
import './app.style.css';
import Layout from './layout';
import SignIn from './pages/auth';
import Dashboard from './pages/dashboard';
import DryingPage from './pages/drying';
import HarvestPage from './pages/harvest';
import JobPage from './pages/job';
import NotFound from './pages/notfound';
import OfferPage from './pages/offer';
import ProfilePage from './pages/profile';
import SignUp from './pages/register';
import TransactionPage from './pages/transaction';

function App() {
  dayjs.locale(locale);
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/harvest" element={<HarvestPage />} />
        <Route path="/dry" element={<DryingPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/work" element={<JobPage />} />
      </Route>
    </Routes>
  );
}

export default App;
