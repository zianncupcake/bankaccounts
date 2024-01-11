import logo from './logo.svg';
import './App.css';
// import HeaderComponent from "./components/HeaderComponent";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUserDetailsPage from './pages/EditUserDetailsPage';
import CreateAccountPage from './pages/CreateAccountPage';
import BalancesPage from './pages/BalancesPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransferPage from './pages/TransferPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/edituserdetails/:id" element={<EditUserDetailsPage />} />
      <Route path="/createaccount/:id" element={<CreateAccountPage />} />
      <Route path="/balances/:id" element={<BalancesPage />} />
      <Route path="/deposit/:id" element={<DepositPage />} />
      <Route path="/withdraw/:id" element={<WithdrawPage />} />
      <Route path="/transfer/:id" element={<TransferPage />} />

        {/* <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/insurances" element={<InsurancesPage />} />
        <Route path="/createclaim" element={<CreateClaimPage />} />
        <Route path="/editclaim/:claimid" element={<EditClaimPage />} />
        <Route path="/admin/admineditclaim/:claimid" element={<AdminEditClaimPage />} />
        <Route path="/admin" element={<AdminPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
