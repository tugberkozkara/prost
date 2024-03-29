import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../../pages/Register';

const RegisterForm = ({ setToken }) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordAlert, setPasswordAlert] = useState(null);
    const navigate = useNavigate();
    
    const changeHandle = (event) => {
        const setState = {
            'email': () => setEmail(event.target.value),
            'username': () => setUsername(event.target.value),
            'password': () => setPassword(event.target.value),
            'passwordConfirm': () => setPasswordConfirm(event.target.value),
        };
        setState[event.target.name]();
        
    }

    const submitHandle = (event) => {
        event.preventDefault();
        if (passwordAlert == null){
            const postData = {
                email,
                username,
                password,
            }
            registerUser(postData, setToken);
            clearForm();
            navigate("/");
        }
    }

    const clearForm = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
    }

    useEffect(() => { 
        if(password !== passwordConfirm){
            setPasswordAlert("Passwords do not match!");
        }else{
            setPasswordAlert(null);
        }
      }, [password, passwordConfirm]);


  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
        <form onSubmit={submitHandle}>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={email} onChange={changeHandle} placeholder="Email" name="email" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={username} onChange={changeHandle} placeholder="Username" name="username" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="password" className="form-control" value={password} onChange={changeHandle} placeholder="Password" name="password" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="password" className="form-control" value={passwordConfirm} onChange={changeHandle} placeholder="Password Again" name="passwordConfirm" required></input>
            </div>
            <span className="col-7 text-danger my-0 pt-2 pe-1">{passwordAlert}</span>
            <p className='mb-0'>
            <button className="btn btn-primary my-2" type='submit' disabled={passwordAlert != null || email === "" || username === ""}>Register</button>
            </p>
        </form>
        <div className='row justify-content-center'>
            <span className="col-6 col-sm-7 col-m-8 col-lg-7 text-muted my-0 pt-2 text-end pe-1">Already have an account?</span>
            <NavLink className="col nav-item nav-link text-start ps-1" to="/login">Login</NavLink>
        </div>
    </section>
  )
}

export default RegisterForm