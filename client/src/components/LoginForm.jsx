import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../pages/Login';

const LoginForm = ({ setUser }) => {

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
        loginUser(postData, setUser);
        clearForm();
        navigate("/");
    }

    const clearForm = () => {
        setUsername('');
        setPassword('');
    }


  return (
    <section className="text-center col-lg-4 mx-auto w-50">
        <form onSubmit={submitHandle}>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={username} onChange={changeHandle} placeholder="Username" name="username" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="password" className="form-control" value={password} onChange={changeHandle} placeholder="Password" name="password" required></input>
            </div>
            <p>
            <button className="btn btn-primary my-2" type='submit'>Login</button>
            </p>
        </form>
    </section>
  )
}

export default LoginForm