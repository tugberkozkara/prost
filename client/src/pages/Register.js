import axios from 'axios';
import RegisterForm from "../components/register/RegisterForm";
import { API_URL_REGISTER } from '../utils/constants';


export const registerUser = async (postData, setToken) => {
    try {
        await axios.post(
            API_URL_REGISTER,
            postData
        ).then((response)=>{
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
        })
    } catch (error) {
        console.log(error);
    }
}



export default function Register({ setToken }){
    return(
        <div>
            <RegisterForm setToken={ setToken }/>
        </div>
    )
}