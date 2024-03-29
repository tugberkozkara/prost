import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser } from '../../pages/Login';

const LoginForm = ({ setToken }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const changeHandle = (event) => {
        const setState = {
            'username': () => setUsername(event.target.value),
            'password': () => setPassword(event.target.value)
        };
        setState[event.target.name]();
    }

    const submitHandle = (event) => {
        event.preventDefault();
        const postData = {
            username,
            password,
        }
        loginUser(postData, setToken);
        clearForm();
        navigate("/");
    }

    const clearForm = () => {
        setUsername('');
        setPassword('');
    }


  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
        <form onSubmit={submitHandle}>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={username} onChange={changeHandle} placeholder="Username" name="username" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="password" className="form-control" value={password} onChange={changeHandle} placeholder="Password" name="password" required></input>
            </div>
            <p className='mb-0'>
            <button className="btn btn-primary my-2" type='submit' disabled={username === "" || password === ""}>Login</button>
            </p>
        </form>
        <div className='row justify-content-center'>
            <span className="col-6 col-sm-7 col-m-8 col-lg-7 text-muted my-0 pt-2 text-end pe-1">You don't have an account?</span>
            <NavLink className="col nav-item nav-link text-start ps-1" to="/register">Register</NavLink>
        </div>
    </section>
  )
}

export default LoginForm