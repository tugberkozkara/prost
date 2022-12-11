import axios from 'axios';
import PlaceForm from "../components/PlaceForm";
import { API_URL_PLACES_GET_POST } from '../utils/constants';



export const postPlace = async (postData) => {
    if(postData.tags.length === 0){
        postData.tags = [];
    }
    try {
        await axios.post(
            API_URL_PLACES_GET_POST,
            postData
        ).then((response)=>{
            console.log(response);
        })
    } catch (error) {
        console.log(error);
    }
}



export default function InsertPlace(){
    return(
        <div>
            <PlaceForm />
        </div>
    )
}