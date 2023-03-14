import React from 'react'
import userAvatarIcon from '../media/user-avatar.png';

const ProfileHeader = ({username, places}) => {
    let tagArray = [];
    let locationArray = [];
    places.map((place) => {
        place.tags.map((tag) => tagArray.push(tag.name));
        place.location.map((loc) => locationArray.push(loc.name))
        }
    );

    const getMostFrequent = (arr) => {
        const hashmap = {};
        for(let i = 0; i < arr.length; i++){
            if (arr[i] in hashmap){ hashmap[arr[i]] += 1; }
            else { hashmap[arr[i]] = 1; }
        }
        let vals = Object.values(hashmap);
        let max = Math.max(...vals);
        return Object.keys(hashmap).find(key => hashmap[key] === max);
    }

    const numberOfPlaces = places.length;
    const mostUsedTag = getMostFrequent(tagArray) || "No tags";
    const mostUsedLocation = getMostFrequent(locationArray) || "No locations";

  return (
    <div className="card col-8 col-sm-8 col-md-8 col-lg-8 col-xl-6 mx-auto mb-4 py-3">
        <div className="row g-0">
            <div className="col-md text-center align-self-center">
                <img src={userAvatarIcon} className="border rounded-circle" style={{width: "38%"}}></img>
            </div>
            <div className="col-md align-self-center">
                <div className="card-body text-center text-md-start">
                    <h5 className="card-title">{username}</h5>
                    <h6 className="card-subtitle my-2 text-muted small">Number of places: <span className="fw-bold">{numberOfPlaces}</span></h6>
                    <h6 className="card-subtitle my-2 text-muted small">Most used tag: <span className="fw-bold">{mostUsedTag}</span></h6>
                    <h6 className="card-subtitle my-2 text-muted small">Most used location: <span className="fw-bold">{mostUsedLocation}</span></h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileHeader
