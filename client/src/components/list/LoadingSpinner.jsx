import React from 'react'

const LoadingSpinner = () => {
  return (
    <>
        <div className="container mb-0 mt-5 text-center">
                <div className="spinner-border" role="status"></div>
                <p className="mb-0 small text-muted">Loading...</p>
        </div>
    </>
  )
}

export default LoadingSpinner