import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Buffer } from 'buffer';

const NavBar = ({ token, setToken }) => {
    const [username, setUsername] = useState("");

    useEffect(() => { 
        if(localStorage.getItem("token") && !token){
            setToken(JSON.parse(localStorage.getItem("token")));
            const parsedJWTPayload = JSON.parse(Buffer.from(localStorage.getItem("token").split('.')[1], 'base64').toString());
            setUsername(parsedJWTPayload.username);
        }
      }, [setToken, token]);
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <a className="navbar-brand" href="/">Prost!</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></NavLink>
                    {token ? (<NavLink className="nav-item nav-link" to="/insert">Insert</NavLink>):(<></>)}
                </div>
            </div>
            {token ? (
                <div className='row'>
                    <NavLink className="col nav-item nav-link px-0" onClick={(e) => {
                      localStorage.removeItem("token");
                      setToken(null);
                      } }>Logout</NavLink>
                    <span className="col text-muted my-0 pt-2">{username}</span>
                </div>
            ):(
                <NavLink className="nav-item nav-link px-0" to="/login">Login</NavLink>
                )}
        </nav>
        <section className="py-5 text-center container">
            <div className="row">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Prost!</h1>
                    <p className="lead text-muted">Càfes, pubs etc.</p>
                </div>
            </div>
        </section>

        
     </div>
  )
}

export default NavBar