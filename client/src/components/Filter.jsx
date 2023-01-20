import { useEffect, useState } from "react"
import { API_URL_TAGS_GET_POST } from '../utils/constants';
import axios from 'axios';


const Filter = ({places, setFiltered, activeTags, setActiveTags}) => {
    const [tags, setTags] = useState([]);
    
    
    const getTags = async () => {
        try {
          const allTags = await axios.get(API_URL_TAGS_GET_POST);
          setTags(allTags.data);
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => { 
        getTags();
      }, []);

    useEffect(() => {
        if(activeTags.length === 0){
            setFiltered(places);
            return;
        }
        let checker = (arr, target) => target.every(element => arr.includes(element));
        const filtered = places.filter(place => checker(place.tags.map(tag => tag._id), activeTags));
        setFiltered(filtered);
    }, [activeTags]);

    const tagHandle = (event) => {
        if(activeTags.includes(event.target.value)){
            setActiveTags(activeTags.filter(id => id !== event.target.value));
            event.target.className = "btn btn-outline-secondary mx-1 mt-2";
        }
        else{
            setActiveTags((prevTags) => [...prevTags, event.target.value]);
            event.target.className = "btn btn-secondary mx-1 mt-2";
        }
    }

  return (
    <div className="btn-group d-flex row col-lg-6 mx-auto mb-3 justify-content-center" role="group" aria-label="Basic example">
        {
            tags.map((tag, i) => {
                if(i<10)
                return  (<div key={i} >
                            <button value={tag._id} onClick={tagHandle} className="btn btn-outline-secondary mx-1 mt-2" name="tag">{tag.name}</button>
                        </div>);
                return;
            })
        }
    </div>
  )
}

export default Filter
