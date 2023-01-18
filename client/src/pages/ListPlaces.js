import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';
import Filter from '../components/Filter';
import { API_URL_PLACES_GET_POST } from '../utils/constants';

export default function ListPlaces(){
    
    const [places, setPlaces] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const getPlaces = async () => {
        try {
          const allPlaces = await axios.get(API_URL_PLACES_GET_POST);
          setPlaces(allPlaces.data);
          setFiltered(allPlaces.data);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        getPlaces();
      }, []);


    return(
        <>
        <Filter places={places} setFiltered={setFiltered} />
            <div className='row col-lg-8 mx-auto justify-content-center'>
                {
                    filtered.map((place, i) => 
                        <div key={i} >
                            <PlaceCard place={place} />
                        </div>)
                }
            </div>
        </>
    )
}