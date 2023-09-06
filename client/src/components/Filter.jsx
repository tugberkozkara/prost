import { useEffect, useState } from "react"
import { API_URL_LOCATIONS, API_URL_TAGS } from '../utils/constants';
import Search from "./Search";
import axios from 'axios';


const Filter = ({places, setFiltered, activeTags, setActiveTags, activeLocations, setActiveLocations}) => {
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
        let filtered = places;

        if(activeTags.length === 0 && activeLocations.length === 0){
            setFiltered(filtered);
            return;
        }

        const intersectionChecker = (arr, target) => target.every(element => arr.includes(element));
        const unionChecker = (arr, target) => target.some(element => arr.includes(element));

        let tagFiltered = [];
        if(activeTags.length !== 0){
            tagFiltered = filtered.filter(
                (place) => (
                    intersectionChecker(place.tags.map(tag => tag._id), activeTags)
                )
            );
        }
        let locationFiltered = [];
        if(activeLocations.length !== 0){
            locationFiltered = filtered.filter(
                (place) => (
                    unionChecker(place.location.map(loc => loc._id), activeLocations)
                )
            );
        }
        
        filtered = places.filter(function(place) {
                if(activeTags.length === 0)
                    {return locationFiltered.includes(place);}
                if(activeLocations.length === 0)
                    {return tagFiltered.includes(place);}
                else
                    {return tagFiltered.includes(place) && locationFiltered.includes(place);}
            }
        );
        
        setFiltered(filtered);

    }, [activeTags, activeLocations, places, setFiltered]);

    const tagFilterHandle = (event) => {
        if(activeTags.includes(event.target.value)){
            setActiveTags(activeTags.filter(id => id !== event.target.value));
            event.target.className = "btn btn-outline-secondary mx-1 mt-2";
        }
        else{
            setActiveTags((prevFilters) => [...prevFilters, event.target.value]);
            event.target.className = "btn btn-secondary mx-1 mt-2";
        }
    }

    const locationFilterHandle = (event) => {
        if(activeLocations.includes(event.target.value)){
            setActiveLocations(activeLocations.filter(id => id !== event.target.value));
            event.target.className = "btn btn-outline-secondary mx-1 mt-2";
        }
        else{
            setActiveLocations((prevFilters) => [...prevFilters, event.target.value]);
            event.target.className = "btn btn-secondary mx-1 mt-2";
        }
    }

  return (
    <>
    <nav className="navbar navbar-light bg-light d-flex row col-lg-6 col-md-8 col-sm-8 mx-auto mb-3 px-1">
        <div className="navbar-brand w-auto text-muted">Couldn't find your spot?!</div>
        <button className="navbar-toggler w-auto mx-2 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#filterToggler" aria-controls="filterToggler" aria-expanded="false">
            <span className="bi-filter fs-2"></span>
        </button>

        <div className="collapse navbar-collapse" id="filterToggler">
            <div className="navbar-nav">
                <div className="container mt-3 nav-item navbar-nav-scroll" style={{"--bs-scroll-height":"40vh"}}>
                    <div className="row">
                        <Search places={places} setFiltered={setFiltered} />
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <div className="nav-link">Locations</div>
                            {
                                locations.map((location, i) => {
                                    return (<button key={i} value={location._id} onClick={locationFilterHandle} className="btn btn-outline-secondary mx-1 mt-2" name="filterButton">{location.name}</button>);
                                })
                            }
                        </div>
                        <div className="col-sm">
                            <div className="nav-link">Tags</div>
                            {
                                tags.map((tag, i) => {
                                    return (<button key={i} value={tag._id} onClick={tagFilterHandle} className="btn btn-outline-secondary mx-1 mt-2" name="filterButton">{tag.name}</button>);
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
