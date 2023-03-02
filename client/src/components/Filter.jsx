import { useEffect, useState } from "react"
import { API_URL_LOCATIONS, API_URL_TAGS } from '../utils/constants';
import axios from 'axios';


const Filter = ({places, setFiltered, activeFilters, setActiveFilters}) => {
    const [tags, setTags] = useState([]);
    const [locations, setLocations] = useState([]);
    
    const getTags = async () => {
        try {
          const allTags = await axios.get(API_URL_TAGS);
          setTags(allTags.data);
        } catch (error) {
          console.log(error);
        }
    }
    const getLocations = async () => {
        try {
          const allLocations = await axios.get(API_URL_LOCATIONS);
          setLocations(allLocations.data);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => { 
        getTags();
        getLocations();
      }, []);

    useEffect(() => {
        if(activeFilters.length === 0){
            setFiltered(places);
            return;
        }
        let checker = (arr, target) => target.every(element => arr.includes(element));
        
        const filtered = places.filter(
            (place) => (
                checker(place.tags.map(tag => tag._id).concat(place.location.map(loc => loc._id)), activeFilters)
            )
        );
        setFiltered(filtered);
    }, [activeFilters, places, setFiltered]);

    const filterHandle = (event) => {
        if(activeFilters.includes(event.target.value)){
            setActiveFilters(activeFilters.filter(id => id !== event.target.value));
            event.target.className = "btn btn-outline-secondary mx-1 mt-2";
        }
        else{
            setActiveFilters((prevFilters) => [...prevFilters, event.target.value]);
            event.target.className = "btn btn-secondary mx-1 mt-2";
        }
    }

  return (
    <>
    <nav className="navbar navbar-light bg-light d-flex row col-lg-6 col-md-8 col-sm-8 mx-auto mb-3 px-1">
        <a className="navbar-brand w-auto text-muted">Couldn't find your spot?!</a>
        <button className="navbar-toggler w-auto mx-2 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#filterToggler" aria-controls="filterToggler" aria-expanded="false">
            <span className="bi-filter fs-2"></span>
        </button>

        <div className="collapse navbar-collapse" id="filterToggler">
            <div className="navbar-nav">
                <div className="container mt-3 nav-item navbar-nav-scroll" style={{"--bs-scroll-height":"40vh"}}>
                    <div className="row">
                        <div className="col-sm">
                            <a className="nav-link">Locations</a>
                            {
                                locations.map((location, i) => {
                                    return (<button key={i} value={location._id} onClick={filterHandle} className="btn btn-outline-secondary mx-1 mt-2" name="filterButton">{location.name}</button>);
                                })
                            }
                        </div>
                        <div className="col-sm">
                            <a className="nav-link">Tags</a>
                            {
                                tags.map((tag, i) => {
                                    return (<button key={i} value={tag._id} onClick={filterHandle} className="btn btn-outline-secondary mx-1 mt-2" name="filterButton">{tag.name}</button>);
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Filter
