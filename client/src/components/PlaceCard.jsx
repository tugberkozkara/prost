import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/apple-touch-icon.png';

const PlaceCard = ({ place }) => {

  return (
        <div className="col mb-4">
            <div className="card" id="place-card">
                <img src={logo} ></img>
                <div className="card-body">
                    <h5 className="card-title">{place.name}</h5>
                        <p className="card-text">{place.location}</p>
                    <Link to="#" className="btn btn-primary">{place.price}</Link>
                </div>
            </div>
        </div>
  )
}

export default PlaceCard