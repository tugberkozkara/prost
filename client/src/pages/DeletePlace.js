import axios from 'axios';
import { API_URL_PLACES } from '../utils/constants';

export const deletePlace = async (deleteId, token) => {
    try {
        await axios.delete(API_URL_PLACES + "/" + deleteId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error);
    }
}
