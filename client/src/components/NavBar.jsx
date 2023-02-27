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
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <a className="navbar-brand" href="/">Prost!</a>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
            <span className="bi-three-dots fs-2"></span>
            </button>
            <div className="collapse navbar-collapse show justify-content-end" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link active mx-2" to="/">Home</NavLink>
                    {token && !isTokenExpired ? (<>
                    <NavLink className="nav-item nav-link mx-2" to="/insert">Insert</NavLink>
                    <NavLink className="col nav-item nav-link mx-2 text-muted" onClick={e => expireToken()}>Logout <span className="col text-muted my-0 pt-2">{username}</span></NavLink>
                    </>):(<>
                    <NavLink className="nav-item nav-link px-0 mx-2" to="/login">Login</NavLink>
                    </>)}
                </div>
            </div>
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