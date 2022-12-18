import axios from 'axios';
import LoginForm from "../components/LoginForm";
import { API_URL_LOGIN } from '../utils/constants';


export const loginUser = async (postData) => {
    try {
        await axios.post(
            API_URL_LOGIN,
            postData
        ).then((response)=>{
            console.log(response);
        })
    } catch (error) {
        console.log(error);
    }
}



export default function Login(){
    return(
        <div>
            <LoginForm />
        </div>
    )
}