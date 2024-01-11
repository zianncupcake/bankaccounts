import TransferComponent from "../components/TransferComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const TransferPage = () => {

    const transfer = async (accountid, formInputs) => {
        const { data } = await axios.put(`http://localhost:8000/Accounts/${accountid}`, {...formInputs});
        return data;
    }  

    const getAccounts = async (accountid) => {
        const { data } = await axios.get(`http://localhost:8000/Accounts/`);
        return data;
    }  

    const getAccount = async (accountid) => {
        const { data } = await axios.get(`http://localhost:8000/Accounts/${accountid}`);
        return data;
    }  

    const createTransaction = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8000/Transactions`, { ...formInputs });
        return data;
    }  

  
  return <TransferComponent transfer={transfer} getAccounts={getAccounts} getAccount={getAccount} createTransaction={createTransaction}/>;
};

export default TransferPage;

