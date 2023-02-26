import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';

const NavBar = ({ token, setToken }) => {
    const [username, setUsername] = useState("");
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    const expireToken = () => {
        localStorage.removeItem("token");
        setToken(null);
    }

    useEffect(() => { 
        if(localStorage.getItem("token") && !token){
            setToken(localStorage.getItem("token"));
            const parsedJWTPayload = Auth.parseJWT(localStorage.getItem("token"));

            setIsTokenExpired(parsedJWTPayload.exp > Date.now());
            if (!isTokenExpired){
                setUsername(parsedJWTPayload.username);
            }else {
                expireToken();
            }
        }
      }, [setToken, token]);
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-5">
            <a className="navbar-brand" href="/">Prost!</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse show" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link active" to="/">Home</NavLink>
                    {token ? (<NavLink className="nav-item nav-link" to="/insert">Insert</NavLink>):(<></>)}
                </div>
            </div>
            {token && !isTokenExpired ? (
                <div className='row'>
                    <NavLink className="col nav-item nav-link px-0" onClick={(e) => { expireToken()
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
                    <h1 className="fw-normal ">Prost!</h1>
                    <p className="lead text-muted">Càfes, pubs etc.</p>
                </div>
            </div>
        </section>

        
     </div>
  )
}

export default NavBar