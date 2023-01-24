import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/apple-touch-icon.png';
import Auth from '../utils/auth';

const PlaceCard = ({ place }) => {
    
    let parsedJWTPayload = null;
    
    if(localStorage.getItem("token") !== null){
        parsedJWTPayload = Auth.parseJWT(localStorage.getItem("token"));
    }

  return (
        <div className="col mb-4">
            <div className="card" id="place-card">
            <div className="d-flex justify-content-end">
                {place?.createdBy?.username === parsedJWTPayload?.username ? <button className="btn btn-outline-danger position-absolute">Delete</button>:<></>}
                <img src={logo} className="rounded mx-auto d-block card-img-top"></img>
            </div>
                <div className="card-body">
                    <h5 className="card-title">{place?.name}</h5>
                    <p className="card-text">{place?.location}</p>
                    <a href={place?.menu} target="_blank" rel="noreferrer" className="btn btn-primary">Menu</a>
                    <p className="card-text small">Added by <Link to={place?.createdBy?.username}>{place?.createdBy?.username}</Link></p>
                    <div className='row'>
                    {
                        place.tags.map((tag, key) => (
                            <Link to={tag.name} key={key} className="card-text col-md-auto m-0 p-0 text-muted small">#{tag.name}</Link>
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