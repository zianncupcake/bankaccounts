import logo from './logo.svg';
import './App.css';
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUserDetailsPage from './pages/EditUserDetailsPage';
import CreateAccountPage from './pages/CreateAccountPage';
import BalancesPage from './pages/BalancesPage';
import DepositPage from './pages/DepositPage';
import WithdrawPage from './pages/WithdrawPage';
import TransferPage from './pages/TransferPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/LoginPage';
import HeaderComponent from './components/HeaderComponent';



function App() {
  return (
    <BrowserRouter>
    <HeaderComponent />
      <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/edituserdetails/:id" element={<EditUserDetailsPage />} />
      <Route path="/createaccount/:id" element={<CreateAccountPage />} />
      <Route path="/balances/:id" element={<BalancesPage />} />
      <Route path="/deposit/:id" element={<DepositPage />} />
      <Route path="/withdraw/:id" element={<WithdrawPage />} />
      <Route path="/transfer/:id" element={<TransferPage />} />
      <Route path="/transactions/:id" element={<TransactionsPage />} />
      <Route path="/" element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
