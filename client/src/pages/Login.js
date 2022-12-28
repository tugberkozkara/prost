import axios from 'axios';
import LoginForm from "../components/LoginForm";
import { API_URL_LOGIN } from '../utils/constants';


export const loginUser = async (postData, setToken) => {
    try {
        await axios.post(
            API_URL_LOGIN,
            postData
        ).then((response)=>{
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
        })
    } catch (error) {
        console.log(error);
    }
}



export default function Login({ setToken }){
    return(
        <div>
            <LoginForm setToken={ setToken }/>
        </div>
    )
}