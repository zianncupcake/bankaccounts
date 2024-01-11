import DepositComponent from "../components/DepositComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const DepositPage = () => {

    const deposit = async (accountid, formInputs) => {
        const { data } = await axios.put(`http://localhost:8000/Accounts/${accountid}`, {...formInputs});
        return data;
    }  

    const getAccount = async (accountid) => {
        const { data } = await axios.get(`http://localhost:8000/Accounts/${accountid}`);
        return data;
    }  

  
  return <DepositComponent deposit={deposit} getAccount={getAccount}/>;
};

export default DepositPage;

