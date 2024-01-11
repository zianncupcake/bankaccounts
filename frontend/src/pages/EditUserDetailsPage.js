import axios from "axios";
import { useParams } from 'react-router-dom';
import EditUserDetailsComponent from "../components/EditUserDetailsComponent";



const EditUserDetailsPage = () => {


    const editUser = async (id,formInputs) => {
        const { data } = await axios.put(`http://localhost:8000/Users/${id}`, { ...formInputs });
        return data;
    }  
    const getUser = async (id) => {
      const { data } = await axios.get(`http://localhost:8000/Users/${id}`);
      return data;
  }  

  
  return <EditUserDetailsComponent editUser={editUser} getUser={getUser}/>;
};

export default EditUserDetailsPage;

