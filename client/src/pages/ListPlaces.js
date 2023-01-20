import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceCard from '../components/PlaceCard';
import Filter from '../components/Filter';
import { API_URL_PLACES_GET_POST } from '../utils/constants';

export default function ListPlaces(){
    
    const [places, setPlaces] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const selectedTags = [];
    const [activeTags, setActiveTags] = useState(selectedTags);

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
    
    const clearFilters = (e) => {
        setActiveTags([]);
        const tagButtons = document.getElementsByName('tag');
        tagButtons.forEach((tag) => (tag.className = "btn btn-outline-secondary mx-1 mt-2"));
    }

    return(
        <>
        <Filter places={places} setFiltered={setFiltered} activeTags={activeTags} setActiveTags={setActiveTags}/>
            <div className='row col-lg-8 mx-auto justify-content-center'>
                {filtered.length !=0 ? (
                    filtered.map((place, i) => 
                        <div key={i} >
                            <PlaceCard place={place} />
                        </div>)
                ):
                (
                    <div className="card my-5">
                        <div className="card-body p-5 py-5 text-center">
                            <h5 className="card-title mx-auto">OOPS...</h5>
                            <h6 className="card-subtitle my-2 text-muted">No places found with all those filters!</h6>
                            <button type="button" className="btn btn-outline-primary mx-auto mt-3" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}