import React from 'react'
import beerLoading from '../../media/beer-loading.gif';

const LoadingSpinner = () => {
  return (
    <>
        <div className="container mb-0 mt-5 text-center">
                <img src={beerLoading} alt="beer-loading" className="col-3 col-md-2"/>
                <p className="mb-0 text-muted">Loading...</p>
        </div>
    </>
  )
}

export default LoadingSpinner