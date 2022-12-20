import axios from 'axios';
import LoginForm from "../components/LoginForm";
import { API_URL_LOGIN } from '../utils/constants';


export const loginUser = async (postData, setUser) => {
    try {
        await axios.post(
            API_URL_LOGIN,
            postData
        ).then((response)=>{
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            console.log(user);
        })
    } catch (error) {
        console.log(error);
    }
}



export default function Login({ setUser }){
    return(
        <div>
            <LoginForm setUser={ setUser }/>
        </div>
    )
}