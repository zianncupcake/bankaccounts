import TransactionsComponent from "../components/TransactionsComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const TransactionsPage = () => {

    const getTransactions = async () => {
        const { data } = await axios.get(`http://localhost:8000/Transactions/`);
        return data;
    }  

    const getAccounts = async () => {
        const { data } = await axios.get(`http://localhost:8000/Accounts/`);
        return data;
    }  

  
  return <TransactionsComponent getTransactions={getTransactions} getAccounts={getAccounts}/>;
};

export default TransactionsPage;

