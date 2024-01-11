import WithdrawComponent from "../components/WithdrawComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const WithdrawPage = () => {

    const withdraw = async (accountid, formInputs) => {
        const { data } = await axios.put(`http://localhost:8000/Accounts/${accountid}`, {...formInputs});
        return data;
    }  

    const getAccount = async (accountid) => {
        const { data } = await axios.get(`http://localhost:8000/Accounts/${accountid}`);
        return data;
    }  

  
  return <WithdrawComponent withdraw={withdraw} getAccount={getAccount}/>;
};

export default WithdrawPage;

