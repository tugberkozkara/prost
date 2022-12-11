import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';
import { API_URL_PLACES_GET_POST } from '../utils/constants';

export default function ListPlaces(){
    
    const [places, setPlaces] = useState([]);

    const getPlaces = async () => {
        try {
          const allPlaces = await axios.get(API_URL_PLACES_GET_POST);
          setPlaces(allPlaces.data);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => { 
        getPlaces();
      }, []);


    return(
        <div className='row col-lg-8 mx-auto justify-content-center'>
            {
                places.map((place, i) => 
                    <div key={i} >
                        <PlaceCard place={place} />
                    </div>)
            }
        </div>
    )
}