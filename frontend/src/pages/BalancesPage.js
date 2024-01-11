import BalancesComponent from "../components/BalancesComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const BalancesPage = () => {

    const deleteAccount = async (accountid) => {
        const { data } = await axios.delete(`http://localhost:8000/Accounts/${accountid}`);
        return data;
    }  

    const getAccounts = async () => {
        const { data } = await axios.get(`http://localhost:8000/Accounts/`);
        return data;
    }  

  
  return <BalancesComponent deleteAccount={deleteAccount} getAccounts={getAccounts}/>;
};

export default BalancesPage;

