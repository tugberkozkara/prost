import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user, setUser }) => {
    useEffect(() => { 
        if(localStorage.getItem("user") && !user){
            setUser(JSON.parse(localStorage.getItem("user")));
        }
      }, [user]);
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
                    {user ? (<NavLink className="nav-item nav-link" to="/insert">Insert</NavLink>):(<></>)}
                </div>
            </div>
            {user ? (
                <div className='row'>
                    <NavLink className="col nav-item nav-link px-0" onClick={(e) => {
                      localStorage.removeItem("user");
                      setUser(null);
                      } }>Logout</NavLink>
                    <span className="col text-muted my-0 pt-2">{user?.username}</span>
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