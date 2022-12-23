import axios from 'axios';
import PlaceForm from "../components/PlaceForm";
import { API_URL_PLACES_GET_POST, API_URL_TAGS_GET_POST } from '../utils/constants';



export const postPlace = async (postData) => {
    if(postData.tags?.length === 0){
        postData.tags = [];
    }
    try {
        await axios.post(API_URL_PLACES_GET_POST, postData);
    } catch (error) {
        console.log(error);
    }
}

export const getTags = async () => {
    try {
        const allTags = await axios.get(API_URL_TAGS_GET_POST);
        return allTags.data;
    } catch (error) {
        console.log(error);
    }
}

export const postTag = async (postData) => {
    try {
        await axios.post(API_URL_TAGS_GET_POST, postData)
    } catch (error) {
        console.log(error);
    }
}

export const checkTags = async (tagsString) => {
    const tagStringArray = tagsString.split(',').map(e => e.trim());
    const allTags = await getTags();
    const tagObjectArray = [];

    for (let index = 0; index < tagStringArray.length; index++) {
        const name = tagStringArray[index];

        if(!allTags.some(e => e.name === name)){
            const tag = {name: name};
            const newTag = await axios.post(API_URL_TAGS_GET_POST, tag);
            tagObjectArray.push(newTag.data.tag);
        }
        else{
            const tag = allTags.find(e => e.name === name);
            tagObjectArray.push(tag);
        }
    }
    return tagObjectArray;
}

export default function InsertPlace(){
    return(
        <div>
            <PlaceForm />
        </div>
    )
}