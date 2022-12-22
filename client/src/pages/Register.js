import axios from 'axios';
import RegisterForm from "../components/RegisterForm";
import { API_URL_REGISTER } from '../utils/constants';


export const registerUser = async (postData, setUser) => {
    try {
        await axios.post(
            API_URL_REGISTER,
            postData
        ).then((response)=>{
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
        })
    } catch (error) {
        console.log(error);
    }
}



export default function Register({ setUser }){
    return(
        <div>
            <RegisterForm setUser={ setUser }/>
        </div>
    )
}