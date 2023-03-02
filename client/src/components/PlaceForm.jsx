import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postPlace } from '../pages/InsertPlace';

const PlaceForm = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [menu, setMenu] = useState('');
    const [tags, setTags] = useState([]);
    const [fillRequired, setFillRequired] = useState(Boolean(name) && Boolean(category) && Boolean(location) && Boolean(price));
    const navigate = useNavigate();
    
    const changeHandle = (event) => {
        const setState = {
            'name': () => setName(event.target.value),
            'category': () => setCategory(event.target.value),
            'location': () => setLocation(event.target.value),
            'price': () => setPrice("$".repeat(event.target.value)),
            'menu': () => setMenu(event.target.value),
            'tags': () => setTags(event.target.value)
        };
        setState[event.target.name]();
        setFillRequired(Boolean(name) && Boolean(category) && Boolean(location) && Boolean(price));
    }

    const postPlaceWithToken = async() => {
        let token = null;
        if (localStorage.getItem("token")){
            token = localStorage.getItem("token");
        }
        const place = {
            name,
            category,
            location,
            price,
            menu,
            tags
        }
        await postPlace(place, token);
    }

    const submitHandle = async (event) => {
        event.preventDefault();
        
        await postPlaceWithToken();
        clearForm();
        navigate("/");
    }

    const clearForm = () => {
        setName('');
        setCategory('');
        setLocation('');
        setPrice('');
        setMenu('');
        setTags('');
    }


  return (
    <section className="text-center col col-lg-3 col-md-4 col-sm-6 col-6 mx-auto">
        <form onSubmit={submitHandle}>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={name} onChange={changeHandle} placeholder="Name" name="name" required></input>
            </div>
            <div className="input-group mb-3">
            <select className="form-select" value={category} onChange={changeHandle} name="category" required>
                <option value="" disabled hidden className="text-muted fs-2">Category</option>
                <option value="Bar & Pub">Bar & Pub</option>
                <option value="Beer Garden">Beer Garden</option>
                <option value="Fine Dine">Fine Dine</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Coffee Shop">Coffee Shop</option>
                <option value="Bakery">Bakery</option>
            </select>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={location} onChange={changeHandle} placeholder="Location" name="location" required></input>
            </div>
            <div className="input-group mb-3">
            <label htmlFor="customRange3" className="form-label text-muted">Price {price}</label>
            <input type="range"  className="form-range" min="1" max="5" defaultValue={1} onChange={changeHandle} name="price" required></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={menu} onChange={changeHandle} placeholder="Menu URL" name="menu"></input>
            </div>
            <div className="input-group mb-3">
            <input type="text" className="form-control" value={tags} onChange={changeHandle} placeholder="Tags (e.g, outdoor, alcohol, burger)" name="tags"></input>
            </div>
            <p>
            <button className="btn btn-primary my-2" type='submit' disabled={!fillRequired}>SUBMIT</button>
            </p>
        </form>
    </section>
  )
}

export default PlaceForm