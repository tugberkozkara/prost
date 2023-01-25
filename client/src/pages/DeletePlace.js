import axios from 'axios';
import { API_URL_PLACES_GET_POST } from '../utils/constants';

export const deletePlace = async (deleteId, token) => {
    try {
        await axios.delete(API_URL_PLACES_GET_POST + "/" + deleteId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }
}
