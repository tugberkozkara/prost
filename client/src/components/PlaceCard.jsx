import React from 'react';
import logo from '../media/apple-touch-icon.png';
import Auth from '../utils/auth';
import { deletePlace } from '../pages/DeletePlace';
import { useNavigate } from 'react-router-dom';

const PlaceCard = ({ place, filtered, setFiltered }) => {
    
    let parsedJWTPayload = null;
    const navigate = useNavigate();
    
    if(localStorage.getItem("token") !== null){
        parsedJWTPayload = Auth.parseJWT(localStorage.getItem("token"));
    }

    const deletePlaceWithToken = async(placeId) => {
        let token = null;
        if (localStorage.getItem("token")){
            token = localStorage.getItem("token");
        }
        await deletePlace(placeId, token);
    }

    const deleteHandle = async (event) => {
        event.preventDefault();
        const placeId = event.target.id;
        await deletePlaceWithToken(placeId);
        setFiltered(filtered.filter((place) => place._id !== placeId));
        navigate(0);
    }


  return (
        <div className="col mb-4">
            <div className="card" id="place-card">
            <div className="d-flex justify-content-end">
                {place?.createdBy?.username === parsedJWTPayload?.username ? <button className="btn btn-outline-danger position-absolute" onClick={deleteHandle} id={place?._id}><span id={place?._id} className="bi-trash-fill"></span></button>:<></>}
                <img src={logo} className="rounded mx-auto d-block card-img-top"></img>
            </div>
                <div className="card-body">
                    <h5 className="card-title fs-4">{place?.name}</h5>
                    <div className='row px-3 mb-2'>
                    {
                        place.location.map((loc, key) => (
                            <p key={key} className="card-text m-0 p-0 w-auto" style={{fontSize:"90%"}}>@{loc?.name}</p>
                            )
                        )
                    }
                    </div>
                    <a href={place?.menu} target="_blank" rel="noreferrer" className="btn btn-primary">Menu</a>
                    <p className="card-text small mt-2">Added by <a className="text-decoration-none" href={place?.createdBy?.username}>{place?.createdBy?.username}</a></p>
                    <div className='row px-3'>
                    {
                        place.tags.map((tag, key) => (
                            <p key={key} className="card-text m-0 p-0 w-auto text-muted" style={{fontSize:"80%"}}>#{tag.name}</p>
                            )
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PlaceCard