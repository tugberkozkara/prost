import React from 'react';
import Auth from '../../utils/auth';
import { deletePlace } from '../../pages/DeletePlace';
import { useNavigate } from 'react-router-dom';

import barPubIcon from '../../media/bar-pub.png';
import beerGardenIcon from '../../media/beer-garden.png';
import fineDineIcon from '../../media/fine-dine.png';
import fastFoodIcon from '../../media/fast-food.png';
import coffeeShopIcon from '../../media/coffee-shop.png';
import bakeryIcon from '../../media/bakery.png';
import otherIcon from '../../media/beer.png';

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

    const imageMap = {        
        "Bar & Pub": barPubIcon,
        "Beer Garden": beerGardenIcon,
        "Fine Dine": fineDineIcon,
        "Fast Food": fastFoodIcon,
        "Coffee Shop": coffeeShopIcon,
        "Bakery": bakeryIcon,
    }

  return (
        <div className="col mb-4">
            <div className="card" id="place-card">
            <div className="d-flex justify-content-end">
                {place?.createdBy?.username === parsedJWTPayload?.username ? <button className="btn btn-outline-danger position-absolute border-0" onClick={deleteHandle} id={place?._id}><span id={place?._id} className="bi-x-circle fs-4"></span></button>:<></>}
                {place?.category in imageMap ? <img src={imageMap[place.category]} className="rounded mx-auto d-block card-img-top w-50 my-5"></img>:<img src={otherIcon} className="rounded mx-auto d-block card-img-top w-50 my-5"></img>}
                </div>
                <div className="card-body">
                    <h5 className="row px-3 mb-2 card-title fs-4">{place?.name}</h5>
                    <div className="row px-3 mb-2">
                    {
                        place.location.map((loc, key) => (
                            <p key={key} className="card-text text-muted me-1 my-0 p-0 w-auto" style={{fontSize:"90%"}}>{loc?.name}</p>
                            )
                        )
                    }
                    </div>
                    <div className="row px-3 mb-2">
                    <a href={place?.menu} target="_blank" rel="noreferrer" className="btn btn-outline-primary col ">Menu</a>
                    <p className="card-text small mt-2 text-end col-8">{place?.price}</p>
                    </div>
                    <p className="row px-3 d-inline card-text small mt-2 mb-2">Added by <a className="text-decoration-none p-0" href={place?.createdBy?.username}>{place?.createdBy?.username}</a></p>
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