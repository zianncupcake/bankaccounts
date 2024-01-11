import CreateAccountComponent from "../components/CreateAccountComponent";
import axios from "axios";
// import {useAuth} from '../context/UserContext'
import { useState, useEffect } from "react";


const CreateAccountPage = () => {

    const createAccount = async (formInputs) => {
        const { data } = await axios.post(`http://localhost:8000/Accounts`, { ...formInputs });
        return data;
    }  
  
  return <CreateAccountComponent createAccount={createAccount}/>;
};

export default CreateAccountPage;

