import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../components/apple-touch-icon.png';

const PlaceCard = ({ place }) => {

  return (
        <div className="col mb-4">
            <div className="card" id="place-card">
                <img src={logo} ></img>
                <div className="card-body">
                    <h5 className="card-title">{place?.name}</h5>
                    <p className="card-text">{place?.location}</p>
                    <a href={place?.menu} target="_blank" className="btn btn-primary">Menu</a>
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