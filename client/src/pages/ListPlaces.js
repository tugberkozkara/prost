import { useEffect, useState } from 'react';
import PlaceCard from '../components/PlaceCard';
import Filter from '../components/Filter';
import { API_URL_PLACES } from '../utils/constants';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

export default function ListPlaces(){

    const [places, setPlaces] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const selectedFilters = [];
    const [activeFilters, setActiveFilters] = useState(selectedFilters);
    const navigate = useNavigate();
    
    const params = useParams(null);

    const getPlaces = async () => {
        let queryParams = {}
        if(params.username){
            queryParams = {user: params.username}
        }

        try {
            const allPlaces = await axios.get(API_URL_PLACES, {params: queryParams});
            setPlaces(allPlaces.data);
            setFiltered(allPlaces.data);
        } catch (error) {
            if (error.message === "Network Error") {
                navigate("/503");
            }
        }
    }

    useEffect(() => {
        getPlaces();
    }, []);
    
    const clearFilters = () => {
        setActiveFilters([]);
        const filterButtons = document.getElementsByName('filterButton');
        filterButtons.forEach((filterButton) => (filterButton.className = "btn btn-outline-secondary mx-1 mt-2"));
    }

    return(
        <>
        {params?.username ? (
            <blockquote className="blockquote text-center">
                <p className="mb-0">places by {params?.username}</p>
            </blockquote>
        ):(
        <></>)}
        
        <Filter places={places} setFiltered={setFiltered} activeFilters={activeFilters} setActiveFilters={setActiveFilters}/>
            <div className='row col-lg-8 col-xl-8 mx-auto justify-content-center'>
                {filtered.length !== 0 ? (
                    filtered.map((place, i) => 
                        <div key={i} className="w-auto">
                            <PlaceCard place={place} filtered={filtered} setFiltered={setFiltered} />
                        </div>)
                ):
                (
                    <div className="card my-5 px-5">
                        <div className="card-body p-5 text-center">
                            <h5 className="card-title mx-auto">OOPS...</h5>
                            <h6 className="card-subtitle my-2 text-muted">No places found!</h6>
                            <button type="button" className="btn btn-outline-primary mx-auto mt-3" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    </div>
                )}
                <div className="text-center">
                    <p className="text-muted small">Icons made by <a className="text-decoration-none" href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a className="text-decoration-none" href="https://www.flaticon.com">www.flaticon.com</a>.</p>
                </div>
            </div>
        </>
    )
}